// Clean URL redirect script for GitHub Pages
// This script redirects URLs from .html to clean URLs

(function() {
    // Check if current URL has .html extension
    const currentPath = window.location.pathname;
    const hasHtmlExtension = currentPath.endsWith('.html');
    
    if (hasHtmlExtension) {
        // Remove .html extension from URL
        const cleanPath = currentPath.replace('.html', '');
        const newUrl = window.location.origin + cleanPath + window.location.search + window.location.hash;
        
        // Replace current URL in history without reload
        window.history.replaceState({}, '', newUrl);
    }
    
    // Handle navigation to clean URLs
    document.addEventListener('DOMContentLoaded', function() {
        // Update all internal links to use clean URLs
        const links = document.querySelectorAll('a[href*=".html"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('.html') && !href.startsWith('http')) {
                // Remove .html from internal links
                const cleanHref = href.replace('.html', '');
                link.setAttribute('href', cleanHref);
            }
        });
    });
    
    // Handle 404 errors by trying to load the .html version
    function handleNotFound() {
        if (!window.location.pathname.endsWith('.html')) {
            // Try to load the .html version
            window.location.href = window.location.pathname + '.html' + window.location.search + window.location.hash;
        }
    }
    
    // Export for use in other scripts
    window.cleanUrlHandler = {
        handleNotFound: handleNotFound
    };
})();