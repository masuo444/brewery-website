// Encrypted API Configuration
// This approach uses base64 encoding + simple obfuscation (NOT secure for production)
document.addEventListener('DOMContentLoaded', () => {
    if (window.sakuraAI) {
        // Encrypted API key (base64 + simple XOR)
        // To generate: btoa(xorEncrypt('your-api-key', 'masumasu-sake-2024'))
        const ENCRYPTED_KEY = 'YOUR_ENCRYPTED_KEY_HERE';
        const ENCRYPTION_SALT = 'masumasu-sake-2024';
        
        if (ENCRYPTED_KEY && ENCRYPTED_KEY !== 'YOUR_ENCRYPTED_KEY_HERE') {
            try {
                const decryptedKey = xorDecrypt(atob(ENCRYPTED_KEY), ENCRYPTION_SALT);
                window.sakuraAI.setApiKey(decryptedKey);
                console.log('✅ Encrypted API key loaded successfully');
            } catch (error) {
                console.error('❌ Failed to decrypt API key');
            }
        } else {
            console.log('⚠️ Running in demo mode - Encrypted key not set');
        }
    }
});

// Simple XOR encryption/decryption (NOT secure for production!)
function xorEncrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

function xorDecrypt(encryptedText, key) {
    return xorEncrypt(encryptedText, key); // XOR is symmetric
}

// Helper function to encrypt a new API key
function encryptApiKey(apiKey) {
    const salt = 'masumasu-sake-2024';
    const encrypted = xorEncrypt(apiKey, salt);
    return btoa(encrypted);
}

// Usage: encryptApiKey('sk-your-api-key-here')
// Copy the result and paste it as ENCRYPTED_KEY above