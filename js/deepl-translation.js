/**
 * DeepL Translation API Integration
 * High-quality translation system for Masumasu Sake website
 */

class DeepLTranslation {
    constructor() {
        this.apiUrl = '/api/translate'; // Server-side proxy endpoint
        this.cache = new Map(); // Translation cache
        this.supportedLanguages = {
            'ja': 'JA',
            'en': 'EN-US',
            'fr': 'FR',
            'zh': 'ZH',
            'ko': 'KO',
            'it': 'IT',
            'es': 'ES',
            'vi': 'VI'
        };
        this.loadCache();
    }

    /**
     * Translate text using DeepL API
     * @param {string} text - Text to translate
     * @param {string} targetLang - Target language code
     * @param {string} sourceLang - Source language code (default: 'ja')
     * @returns {Promise<string>} Translated text
     */
    async translateText(text, targetLang, sourceLang = 'ja') {
        // Return original text if same language
        if (sourceLang === targetLang) {
            return text;
        }

        // Check cache first
        const cacheKey = `${sourceLang}-${targetLang}-${this.hashString(text)}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    target_lang: this.supportedLanguages[targetLang] || targetLang.toUpperCase(),
                    source_lang: this.supportedLanguages[sourceLang] || sourceLang.toUpperCase()
                })
            });

            if (!response.ok) {
                throw new Error(`Translation failed: ${response.status}`);
            }

            const data = await response.json();
            const translatedText = data.translations[0].text;

            // Cache the translation
            this.cache.set(cacheKey, translatedText);
            this.saveCache();

            return translatedText;
        } catch (error) {
            console.error('DeepL Translation Error:', error);
            // Fallback to original text on error
            return text;
        }
    }

    /**
     * Translate object with nested translations
     * @param {Object} obj - Object to translate
     * @param {string} targetLang - Target language
     * @param {string} sourceLang - Source language
     * @returns {Promise<Object>} Translated object
     */
    async translateObject(obj, targetLang, sourceLang = 'ja') {
        if (typeof obj === 'string') {
            return await this.translateText(obj, targetLang, sourceLang);
        }

        if (Array.isArray(obj)) {
            const translations = await Promise.all(
                obj.map(item => this.translateObject(item, targetLang, sourceLang))
            );
            return translations;
        }

        if (typeof obj === 'object' && obj !== null) {
            const translated = {};
            for (const [key, value] of Object.entries(obj)) {
                translated[key] = await this.translateObject(value, targetLang, sourceLang);
            }
            return translated;
        }

        return obj;
    }

    /**
     * Translate product data
     * @param {Object} product - Product object
     * @param {string} targetLang - Target language
     * @returns {Promise<Object>} Translated product
     */
    async translateProduct(product, targetLang) {
        if (targetLang === 'ja' || !product) {
            return product;
        }

        const fieldsToTranslate = [
            'name', 'brewery', 'type', 'riceType', 'description', 
            'tastingNotes', 'servingTemp', 'pairing', 'labelDescription', 
            'yeast', 'region'
        ];

        const translatedProduct = { ...product };

        for (const field of fieldsToTranslate) {
            if (product[field] && typeof product[field] === 'object' && product[field].ja) {
                translatedProduct[field] = await this.translateText(product[field].ja, targetLang);
            }
        }

        return translatedProduct;
    }

    /**
     * Translate page content
     * @param {string} targetLang - Target language
     */
    async translatePage(targetLang) {
        if (targetLang === 'ja') {
            return;
        }

        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        
        for (const element of elementsToTranslate) {
            const originalText = element.getAttribute('data-original') || element.textContent;
            element.setAttribute('data-original', originalText);
            
            try {
                const translatedText = await this.translateText(originalText, targetLang);
                element.textContent = translatedText;
            } catch (error) {
                console.error('Error translating element:', error);
            }
        }
    }

    /**
     * Get available languages
     * @returns {Object} Supported languages
     */
    getSupportedLanguages() {
        return {
            'ja': '日本語',
            'en': 'English',
            'fr': 'Français',
            'zh': '中文',
            'ko': '한국어',
            'it': 'Italiano',
            'es': 'Español',
            'vi': 'Tiếng Việt'
        };
    }

    /**
     * Check if language is supported
     * @param {string} langCode - Language code
     * @returns {boolean} Is supported
     */
    isLanguageSupported(langCode) {
        return langCode in this.supportedLanguages;
    }

    /**
     * Generate hash for cache key
     * @param {string} str - String to hash
     * @returns {string} Hash
     */
    hashString(str) {
        let hash = 0;
        if (str.length === 0) return hash.toString();
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString();
    }

    /**
     * Load translation cache from localStorage
     */
    loadCache() {
        try {
            const cached = localStorage.getItem('deepl_translation_cache');
            if (cached) {
                const data = JSON.parse(cached);
                this.cache = new Map(data);
            }
        } catch (error) {
            console.error('Error loading translation cache:', error);
        }
    }

    /**
     * Save translation cache to localStorage
     */
    saveCache() {
        try {
            const data = Array.from(this.cache.entries());
            localStorage.setItem('deepl_translation_cache', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving translation cache:', error);
        }
    }

    /**
     * Clear translation cache
     */
    clearCache() {
        this.cache.clear();
        localStorage.removeItem('deepl_translation_cache');
    }
}

// Initialize global DeepL translation instance
window.deepLTranslation = new DeepLTranslation();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DeepLTranslation;
}