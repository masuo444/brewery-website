# 益々酒造 AI チャットボット - API設定ガイド

## 概要
このチャットボットは OpenAI GPT と DeepL API を統合しており、実際のAPIキーを設定することで高度なAI応答と翻訳機能が利用できます。

## APIキーの設定方法

### 方法1: ブラウザのコンソールで設定（推奨）

1. ウェブサイトを開く
2. F12キー（Chrome）または Command+Option+I（Mac Chrome）でデベロッパーツールを開く
3. コンソールタブを選択
4. 以下のコマンドを実行：

```javascript
// 両方のAPIキーを設定
setApiKeys("sk-your-openai-api-key-here", "your-deepl-api-key-here");

// OpenAIのみ設定
setApiKeys("sk-your-openai-api-key-here", null);

// DeepLのみ設定  
setApiKeys(null, "your-deepl-api-key-here");
```

### 方法2: 環境変数ファイル（.env）で設定

1. プロジェクトルートの `.env` ファイルを編集
2. 以下のように設定：

```bash
# OpenAI API Configuration
OPENAI_API_KEY=sk-your-actual-openai-key-here
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=500
OPENAI_TEMPERATURE=0.7

# DeepL API Configuration  
DEEPL_API_KEY=your-actual-deepl-key-here
DEEPL_ENDPOINT=https://api-free.deepl.com/v2/translate
```

## API設定の確認

チャットボットで以下のメッセージを送信して設定状況を確認：
```
API設定を確認
```

または

```
APIキーの状況は？
```

## 機能テスト

### GPT機能のテスト
```
GPTで詳しく教えて：日本酒の歴史について
```

### DeepL翻訳機能のテスト  
```
日本酒は米から作られる伝統的な日本のお酒です を英語に翻訳して
```

## トラブルシューティング

### APIキーが認識されない場合
1. APIキーの形式を確認
   - OpenAI: `sk-` で始まる文字列
   - DeepL: 英数字の組み合わせ

2. ブラウザをリロード（Command+Shift+R）

3. コンソールでエラーメッセージを確認

### API呼び出しエラーの場合
- APIキーの有効性を確認
- API利用制限・残高を確認  
- ネットワーク接続を確認

## セキュリティ注意事項

⚠️ **重要**: APIキーは秘密情報です
- 公開リポジトリにコミットしない
- 他人と共有しない
- 定期的にローテーションする
- `.env` ファイルは `.gitignore` に含まれています

## サポート

問題が発生した場合は、ブラウザのコンソールログを確認して、エラーメッセージを参考にしてください。

---

© 2024 益々酒造 - AI Sakura Chat System