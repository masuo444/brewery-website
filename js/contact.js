// Contact page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    const languageSelect = document.getElementById('languageSelect');
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'ja';
    
    languageSelect.value = currentLanguage;
    
    languageSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('selectedLanguage', currentLanguage);
        updatePageLanguage(currentLanguage);
    });
    
    // Contact type change handler
    const contactType = document.getElementById('contactType');
    const tourOptions = document.getElementById('tourOptions');
    
    contactType.addEventListener('change', function() {
        if (this.value === 'tour') {
            tourOptions.style.display = 'block';
            // Make tour fields required
            document.getElementById('tourType').required = true;
            document.getElementById('tourDate').required = true;
            document.getElementById('tourTime').required = true;
            document.getElementById('participants').required = true;
        } else {
            tourOptions.style.display = 'none';
            // Remove required from tour fields
            document.getElementById('tourType').required = false;
            document.getElementById('tourDate').required = false;
            document.getElementById('tourTime').required = false;
            document.getElementById('participants').required = false;
        }
    });
    
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Simulate form submission
            setTimeout(() => {
                showSuccessModal();
                contactForm.reset();
                tourOptions.style.display = 'none';
            }, 1000);
        }
    });
    
    // Success modal handlers
    const modalClose = document.querySelector('.modal-close');
    const modalBtn = document.querySelector('.modal-btn');
    
    modalClose.addEventListener('click', hideSuccessModal);
    modalBtn.addEventListener('click', hideSuccessModal);
    
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });
    
    function showSuccessModal() {
        successModal.classList.add('active');
        successModal.style.display = 'flex';
    }
    
    function hideSuccessModal() {
        successModal.classList.remove('active');
        successModal.style.display = 'none';
    }
    
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                field.style.borderColor = var('--color-gray-200');
            }
        });
        
        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            email.style.borderColor = '#ef4444';
            isValid = false;
        }
        
        // Phone validation (basic)
        const phone = document.getElementById('phone');
        const phoneRegex = /^[\d\-\+\(\)\s]+$/;
        if (phone.value && !phoneRegex.test(phone.value)) {
            phone.style.borderColor = '#ef4444';
            isValid = false;
        }
        
        if (!isValid) {
            alert('入力内容をご確認ください。');
        }
        
        return isValid;
    }
    
    // Real-time field validation
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
        
        field.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = '';
            }
        });
    });
    
    // Date restriction (today onwards)
    const tourDate = document.getElementById('tourDate');
    const today = new Date().toISOString().split('T')[0];
    tourDate.min = today;
    
    // Update page language
    function updatePageLanguage(lang) {
        const translations = {
            ja: {
                pageTitle: 'お問い合わせ',
                pageSubtitle: 'ご予約・ご質問はこちらから',
                formTitle: 'お問い合わせフォーム',
                contactInfo: 'お問い合わせ先',
                faqTitle: 'よくあるご質問',
                contactTypeLabel: 'お問い合わせ種類',
                submitBtn: '送信する',
                resetBtn: 'リセット',
                successTitle: '送信完了',
                successMessage: 'お問い合わせありがとうございます。<br>内容を確認の上、担当者よりご連絡させていただきます。'
            },
            en: {
                pageTitle: 'Contact',
                pageSubtitle: 'Reservations & Inquiries',
                formTitle: 'Contact Form',
                contactInfo: 'Contact Information',
                faqTitle: 'Frequently Asked Questions',
                contactTypeLabel: 'Inquiry Type',
                submitBtn: 'Submit',
                resetBtn: 'Reset',
                successTitle: 'Submission Complete',
                successMessage: 'Thank you for your inquiry.<br>We will contact you after reviewing your request.'
            },
            fr: {
                pageTitle: 'Contact',
                pageSubtitle: 'Réservations et Demandes',
                formTitle: 'Formulaire de Contact',
                contactInfo: 'Informations de Contact',
                faqTitle: 'Questions Fréquemment Posées',
                contactTypeLabel: 'Type de Demande',
                submitBtn: 'Envoyer',
                resetBtn: 'Réinitialiser',
                successTitle: 'Envoi Terminé',
                successMessage: 'Merci pour votre demande.<br>Nous vous contacterons après examen.'
            },
            zh: {
                pageTitle: '联系我们',
                pageSubtitle: '预约及咨询',
                formTitle: '联系表单',
                contactInfo: '联系信息',
                faqTitle: '常见问题',
                contactTypeLabel: '咨询类型',
                submitBtn: '发送',
                resetBtn: '重置',
                successTitle: '发送完成',
                successMessage: '感谢您的咨询。<br>我们将在确认内容后与您联系。'
            }
        };
        
        const trans = translations[lang] || translations.ja;
        
        // Update page content
        document.querySelector('.page-title').textContent = trans.pageTitle;
        document.querySelector('.page-subtitle').textContent = trans.pageSubtitle;
        
        // Update section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        if (sectionTitles[0]) sectionTitles[0].textContent = trans.formTitle;
        if (sectionTitles[1]) sectionTitles[1].textContent = trans.faqTitle;
        
        // Update contact info title
        const contactInfoTitle = document.querySelector('.contact-info h3');
        if (contactInfoTitle) contactInfoTitle.textContent = trans.contactInfo;
        
        // Update buttons
        const submitBtn = document.querySelector('.submit-btn');
        const resetBtn = document.querySelector('.reset-btn');
        if (submitBtn) submitBtn.textContent = trans.submitBtn;
        if (resetBtn) resetBtn.textContent = trans.resetBtn;
        
        // Update modal content
        const modalTitle = document.querySelector('.modal-body h2');
        const modalMessage = document.querySelector('.modal-body p');
        if (modalTitle) modalTitle.textContent = trans.successTitle;
        if (modalMessage) modalMessage.innerHTML = trans.successMessage;
    }
    
    // Initialize with current language
    updatePageLanguage(currentLanguage);
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe form groups
    document.querySelectorAll('.form-group').forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `all 0.6s ease ${index * 0.05}s`;
        observer.observe(group);
    });
    
    // Observe FAQ cards
    document.querySelectorAll('.faq-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
});