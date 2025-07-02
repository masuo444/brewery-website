// Analytics Tracking System for Masumasu Brewery
class MasumasuAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.events = [];
        this.userInfo = this.getUserInfo();
        this.init();
    }

    init() {
        this.trackPageView();
        this.setupEventListeners();
        this.startHeartbeat();
    }

    generateSessionId() {
        return 'masumasu_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getUserInfo() {
        return {
            language: navigator.language || 'ja',
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            referrer: document.referrer || 'direct',
            timestamp: new Date().toISOString()
        };
    }

    trackPageView() {
        this.trackEvent('page_view', {
            page: window.location.pathname,
            title: document.title,
            url: window.location.href
        });
    }

    trackEvent(eventType, data = {}) {
        const event = {
            sessionId: this.sessionId,
            eventType: eventType,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            userLanguage: localStorage.getItem('selectedLanguage') || 'ja',
            data: data,
            userInfo: this.userInfo
        };

        this.events.push(event);
        this.saveToLocalStorage(event);
        
        // リアルタイムでアナリティクスダッシュボードを更新
        this.updateAnalyticsDashboard(event);
    }

    setupEventListeners() {
        // 言語変更の追跡
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.trackEvent('language_change', {
                    from: this.userInfo.language,
                    to: e.target.value
                });
            });
        }

        // 商品クリックの追跡
        document.addEventListener('click', (e) => {
            // 商品カードのクリック
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = productCard.dataset.id;
                this.trackEvent('product_click', {
                    productId: productId,
                    clickType: 'card'
                });
            }

            // 商品詳細ページへのナビゲーション
            if (e.target.closest('[onclick*="product.html"]')) {
                const productMatch = e.target.getAttribute('onclick')?.match(/id=(\d+)/);
                if (productMatch) {
                    this.trackEvent('product_detail_view', {
                        productId: productMatch[1]
                    });
                }
            }

            // カート追加の追跡
            if (e.target.matches('.btn-primary') && e.target.textContent.includes('カート')) {
                this.trackEvent('add_to_cart', {
                    productId: e.target.closest('.product-card')?.dataset.id || 'unknown'
                });
            }

            // AI杜氏の利用追跡
            if (e.target.matches('#aiSommelierBtn, #aiChatStartBtn')) {
                this.trackEvent('ai_chat_open', {});
            }

            // QRスキャナーの利用追跡
            if (e.target.matches('#qrScanBtn')) {
                this.trackEvent('qr_scanner_open', {});
            }

            // インタラクティブ要素の追跡
            if (e.target.closest('.process-step-interactive')) {
                const step = e.target.closest('.process-step-interactive').dataset.step;
                this.trackEvent('brewing_process_click', {
                    step: step
                });
            }

            if (e.target.closest('.interactive-rice')) {
                const rice = e.target.closest('.interactive-rice').dataset.rice;
                this.trackEvent('rice_type_click', {
                    riceType: rice
                });
            }

            // 国旗クリック（輸出先）
            if (e.target.closest('.country-item')) {
                const country = e.target.closest('.country-item').dataset.country;
                this.trackEvent('country_click', {
                    country: country
                });
            }
        });

        // フォーム送信の追跡
        document.addEventListener('submit', (e) => {
            this.trackEvent('form_submit', {
                formId: e.target.id || 'unknown',
                formAction: e.target.action || 'unknown'
            });
        });

        // スクロール深度の追跡
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll > 0 && maxScroll % 25 === 0) {
                    this.trackEvent('scroll_depth', {
                        percentage: maxScroll
                    });
                }
            }
        });

        // ページ離脱時の追跡
        window.addEventListener('beforeunload', () => {
            this.trackEvent('page_exit', {
                timeOnPage: Date.now() - this.startTime,
                maxScrollDepth: maxScroll
            });
        });
    }

    startHeartbeat() {
        // 30秒ごとにハートビートを送信（アクティブユーザーの追跡）
        setInterval(() => {
            this.trackEvent('heartbeat', {
                timeOnSite: Date.now() - this.startTime
            });
        }, 30000);
    }

    saveToLocalStorage(event) {
        try {
            let analyticsData = JSON.parse(localStorage.getItem('masumasuAnalyticsData')) || [];
            analyticsData.push(event);
            
            // 最新の1000件のみ保持
            if (analyticsData.length > 1000) {
                analyticsData = analyticsData.slice(-1000);
            }
            
            localStorage.setItem('masumasuAnalyticsData', JSON.stringify(analyticsData));
        } catch (error) {
            console.warn('Analytics data could not be saved:', error);
        }
    }

    updateAnalyticsDashboard(event) {
        try {
            let dashboardData = JSON.parse(localStorage.getItem('masumasuAnalytics')) || this.getDefaultDashboardData();
            
            // イベントタイプに応じてダッシュボードデータを更新
            switch (event.eventType) {
                case 'page_view':
                    dashboardData.totalVisitors += 1;
                    this.updateLanguageStats(dashboardData, event.userLanguage);
                    this.updateCountryStats(dashboardData, event.userInfo.timezone);
                    break;
                    
                case 'product_click':
                case 'product_detail_view':
                    this.updateProductStats(dashboardData, event.data.productId);
                    break;
                    
                case 'ai_chat_open':
                    dashboardData.aiInteractions += 1;
                    break;
                    
                case 'add_to_cart':
                    this.updateProductStats(dashboardData, event.data.productId, 'cart');
                    break;
            }
            
            dashboardData.lastUpdated = new Date().toISOString();
            localStorage.setItem('masumasuAnalytics', JSON.stringify(dashboardData));
            
        } catch (error) {
            console.warn('Dashboard data could not be updated:', error);
        }
    }

    getDefaultDashboardData() {
        return {
            totalVisitors: 0,
            aiInteractions: 0,
            internationalVisitors: 0,
            languages: { ja: 0, en: 0, zh: 0, fr: 0 },
            products: {},
            timeSlots: { morning: 0, afternoon: 0, evening: 0 },
            countries: {},
            lastUpdated: new Date().toISOString()
        };
    }

    updateLanguageStats(dashboardData, language) {
        const langMap = {
            'ja': 'ja',
            'ja-JP': 'ja',
            'en': 'en',
            'en-US': 'en',
            'en-GB': 'en',
            'zh': 'zh',
            'zh-CN': 'zh',
            'zh-TW': 'zh',
            'fr': 'fr',
            'fr-FR': 'fr'
        };
        
        const mappedLang = langMap[language] || 'en';
        if (dashboardData.languages[mappedLang] !== undefined) {
            dashboardData.languages[mappedLang] += 1;
        }
    }

    updateProductStats(dashboardData, productId, type = 'view') {
        if (!productId || productId === 'unknown') return;
        
        const productMap = {
            '1': 'junmai-ginjo',
            '2': 'honjozo',
            '3': 'sparkling',
            '4': 'vintage',
            '5': 'plum'
        };
        
        const productKey = productMap[productId] || productId;
        if (!dashboardData.products[productKey]) {
            dashboardData.products[productKey] = 0;
        }
        dashboardData.products[productKey] += 1;
    }

    updateCountryStats(dashboardData, timezone) {
        // タイムゾーンから国を推測（簡易版）
        const timezoneCountryMap = {
            'America/New_York': 'US',
            'America/Los_Angeles': 'US',
            'America/Chicago': 'US',
            'Europe/London': 'UK',
            'Europe/Paris': 'FR',
            'Asia/Shanghai': 'CN',
            'Asia/Tokyo': 'JP',
            'Australia/Sydney': 'AU',
            'Asia/Singapore': 'SG'
        };
        
        const country = timezoneCountryMap[timezone];
        if (country && country !== 'JP') {
            dashboardData.internationalVisitors += 1;
            if (!dashboardData.countries[country]) {
                dashboardData.countries[country] = 0;
            }
            dashboardData.countries[country] += 1;
        }
    }

    // AI杜氏のメッセージ送信を追跡
    trackAIMessage(message, response) {
        this.trackEvent('ai_message', {
            messageLength: message.length,
            responseLength: response.length,
            language: localStorage.getItem('selectedLanguage') || 'ja'
        });
    }

    // 検索の追跡
    trackSearch(query, results) {
        this.trackEvent('search', {
            query: query,
            resultCount: results,
            language: localStorage.getItem('selectedLanguage') || 'ja'
        });
    }

    // デジタルサイネージモードの追跡
    trackSignageMode(action) {
        this.trackEvent('signage_mode', {
            action: action, // 'enter' or 'exit'
            timestamp: new Date().toISOString()
        });
    }

    // エラーの追跡
    trackError(error, context) {
        this.trackEvent('error', {
            message: error.message,
            stack: error.stack,
            context: context
        });
    }

    // パフォーマンスの追跡
    trackPerformance() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            this.trackEvent('performance', {
                loadTime: timing.loadEventEnd - timing.navigationStart,
                domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
                firstPaint: timing.responseStart - timing.navigationStart
            });
        }
    }

    // 分析データの取得（管理者用）
    getAnalyticsData() {
        return {
            events: this.events,
            sessionInfo: {
                sessionId: this.sessionId,
                startTime: this.startTime,
                currentTime: Date.now(),
                duration: Date.now() - this.startTime
            },
            userInfo: this.userInfo
        };
    }

    // データのエクスポート（管理者用）
    exportData(format = 'json') {
        const data = this.getAnalyticsData();
        
        if (format === 'csv') {
            return this.convertToCSV(data.events);
        }
        
        return JSON.stringify(data, null, 2);
    }

    convertToCSV(events) {
        if (events.length === 0) return '';
        
        const headers = ['timestamp', 'eventType', 'page', 'userLanguage', 'data'];
        let csv = headers.join(',') + '\n';
        
        events.forEach(event => {
            const row = [
                event.timestamp,
                event.eventType,
                event.page,
                event.userLanguage,
                JSON.stringify(event.data).replace(/"/g, '""')
            ];
            csv += row.map(field => `"${field}"`).join(',') + '\n';
        });
        
        return csv;
    }
}

// グローバルエラーハンドリング
window.addEventListener('error', (event) => {
    if (window.masumasuAnalytics) {
        window.masumasuAnalytics.trackError(event.error, 'global_error');
    }
});

// パフォーマンス測定
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.masumasuAnalytics) {
            window.masumasuAnalytics.trackPerformance();
        }
    }, 100);
});

// AIチャットメッセージの追跡用ヘルパー関数
function trackAIMessage(message, response) {
    if (window.masumasuAnalytics) {
        window.masumasuAnalytics.trackAIMessage(message, response);
    }
}

// サイネージモード追跡用ヘルパー関数
function trackSignageMode(action) {
    if (window.masumasuAnalytics) {
        window.masumasuAnalytics.trackSignageMode(action);
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    // アナリティクスシステムを初期化
    window.masumasuAnalytics = new MasumasuAnalytics();
    
    console.log('🔍 益々酒造 アナリティクスシステム開始');
    
    // デバッグ用：分析データを確認するためのコンソールコマンド
    window.getAnalyticsData = () => window.masumasuAnalytics.getAnalyticsData();
    window.exportAnalyticsCSV = () => {
        const csv = window.masumasuAnalytics.exportData('csv');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'masumasu-analytics.csv';
        a.click();
        URL.revokeObjectURL(url);
    };
});