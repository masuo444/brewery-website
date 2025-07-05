// Test function for AI Sakura Chat
window.testAIChat = function() {
    console.log('Testing AI Chat functionality...');
    
    // Test 1: Check if mobile-enhancements.js is loaded
    if (typeof window.openAIChat === 'function') {
        console.log('✓ openAIChat function is available');
    } else {
        console.error('✗ openAIChat function not found');
        return;
    }
    
    // Test 2: Check if ai-sakura-chat.js is loaded
    if (typeof window.openSakuraChat === 'function') {
        console.log('✓ openSakuraChat function is available');
    } else {
        console.log('! openSakuraChat function not loaded yet, will be loaded dynamically');
    }
    
    // Test 3: Check if chat container exists
    const chatContainer = document.getElementById('ai-sakura-chat');
    if (chatContainer) {
        console.log('✓ Chat container found');
    } else {
        console.log('! Chat container not found, will be created dynamically');
    }
    
    // Test 4: Try to open chat
    console.log('Attempting to open chat...');
    window.openAIChat();
};

// Add test button for debugging
document.addEventListener('DOMContentLoaded', function() {
    // Add test button only in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const testButton = document.createElement('button');
        testButton.textContent = 'Test AI Chat';
        testButton.style.position = 'fixed';
        testButton.style.top = '10px';
        testButton.style.left = '10px';
        testButton.style.zIndex = '9999';
        testButton.style.background = '#ff6b6b';
        testButton.style.color = 'white';
        testButton.style.border = 'none';
        testButton.style.padding = '10px';
        testButton.style.borderRadius = '5px';
        testButton.onclick = window.testAIChat;
        document.body.appendChild(testButton);
    }
});