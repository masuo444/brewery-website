# 🔑 API Keys Activation Guide

## Quick Setup (1 minute)

### Step 1: Open Browser Console
- **Chrome/Edge**: Press `F12` or `Cmd+Option+I` (Mac)
- **Firefox**: Press `F12` or `Cmd+Option+K` (Mac)
- **Safari**: Press `Cmd+Option+I` (Mac)

### Step 2: Go to Console Tab
Click on the "Console" tab in Developer Tools

### Step 3: Run Setup Command
Use the setApiKeys function with your provided keys:

```javascript
// Replace with your actual API keys
setApiKeys("your-openai-key-here", "your-deepl-key-here");
```

### Step 4: Verify Setup
Check the status:
```javascript
hasRealApiKeys()
```

Should return: `{openai: true, deepl: true}`

## Test the Features

After setup, test these in the chat:

### GPT Features
```
GPTで詳しく教えて：日本酒の種類について
```

### Translation Features  
```
純米吟醸は香り高い日本酒です を英語に翻訳して
```

### Status Check
```
API設定を確認
```

## Alternative Method

You can also check current API status in the chat by typing:
```
APIキーの状況は？
```

## Troubleshooting

- **"setApiKeys is not a function"**: Reload the page and try again
- **Keys not working**: Verify the API keys are correct and valid
- **API errors**: Check browser console for detailed error messages

## Security Notes

⚠️ **Important**: 
- API keys are stored locally in your browser
- They are not transmitted to our servers
- Clear browser data will remove the keys
- Never share your API keys publicly

---

Ready to use production AI features! 🚀