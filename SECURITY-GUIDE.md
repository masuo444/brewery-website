# 🔐 API セキュリティガイド

## 概要
GitHub公開時のOpenAI APIキー漏洩を防ぐための3つの安全な方法を提供します。

## 🚀 方法1: サーバーサイドプロキシ（最推奨）

### 特徴
- ✅ APIキーが完全に隠蔽される
- ✅ レート制限とアクセス制御が可能
- ✅ 本番環境に最適

### セットアップ
```bash
# 1. 依存関係をインストール
npm install

# 2. 環境変数でAPIキーを設定
export OPENAI_API_KEY="sk-your-api-key-here"

# 3. サーバーを起動
npm start
```

### HTML更新
```html
<!-- ai-chat-gpt.js を ai-chat-secure.js に変更 -->
<script src="js/ai-chat-secure.js"></script>
<!-- config/api-config.js は不要 -->
```

### デプロイ方法

#### Vercel
```bash
# vercel.json
{
  "builds": [
    { "src": "server/api-proxy.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/api-proxy.js" },
    { "src": "/(.*)", "dest": "/$1" }
  ],
  "env": {
    "OPENAI_API_KEY": "@openai_api_key"
  }
}
```

#### Netlify
```bash
# netlify.toml
[build]
  command = "npm run build"
  functions = "functions"

[build.environment]
  OPENAI_API_KEY = "process.env.OPENAI_API_KEY"
```

#### Railway
```bash
# 環境変数タブでOPENAI_API_KEYを設定
railway login
railway link
railway up
```

---

## 🔒 方法2: フロントエンド暗号化（中程度）

### 特徴
- ⚠️ 軽度の難読化のみ
- ⚠️ 技術者には解読可能
- ✅ 簡単な実装

### セットアップ
```javascript
// 1. APIキーを暗号化
const encrypted = encryptApiKey('sk-your-api-key-here');
console.log(encrypted); // この値をコピー

// 2. config/api-config.encrypted.js に設定
const ENCRYPTED_KEY = 'コピーした暗号化キー';
```

### HTML更新
```html
<script src="config/api-config.encrypted.js"></script>
```

---

## 🎯 方法3: GitHub Actions + Secrets（推奨）

### 特徴
- ✅ GitHubで完全に管理
- ✅ デプロイ時に自動設定
- ✅ チーム開発に最適

### セットアップ

#### 1. GitHub Secretsを設定
1. GitHub Repository → Settings → Secrets and variables → Actions
2. **New repository secret**
3. Name: `OPENAI_API_KEY`
4. Value: `sk-your-api-key-here`

#### 2. GitHub Pages設定
1. Settings → Pages
2. Source: **GitHub Actions**
3. Workflow: `deploy.yml` が自動実行

#### 3. 自動デプロイ
- `main`ブランチにpushで自動デプロイ
- APIキーは安全に注入される

---

## 📋 セキュリティ比較表

| 方法 | セキュリティ | 実装難易度 | 本番適用 | コスト |
|------|-------------|------------|----------|--------|
| **サーバープロキシ** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ✅ | 💰💰 |
| **フロントエンド暗号化** | ⭐⭐ | ⭐ | ❌ | 💰 |
| **GitHub Actions** | ⭐⭐⭐⭐ | ⭐⭐ | ✅ | 💰 |

## 🛡️ 追加のセキュリティ対策

### .gitignore 必須項目
```bash
# API Keys
config/api-config.js
.env
.env.local

# Server secrets
server/.env
```

### API使用量制限
```javascript
// OpenAI Dashboard で設定
// Usage limits → Monthly budget → $20 (recommended)
```

### ドメイン制限
```javascript
// 本番環境では許可ドメインを制限
const ALLOWED_DOMAINS = ['your-domain.com', 'localhost'];
```

## 🚨 絶対にやってはいけないこと

❌ **config/api-config.js をコミット**
❌ **APIキーをハードコード**
❌ **プレーンテキストでの保存**
❌ **クライアントサイドに生のAPIキー**

## ✅ 推奨事項

1. **開発**: 方法1（サーバープロキシ）
2. **GitHub Pages**: 方法3（GitHub Actions）
3. **本番環境**: 方法1（サーバープロキシ）+ 独自ドメイン

## 🔍 セキュリティテスト

```bash
# APIキーが漏洩していないかチェック
git log --all --full-history -- config/api-config.js
grep -r "sk-" . --exclude-dir=node_modules
```

---

**🌸 安全なAIソムリエ運用のために、適切なセキュリティ対策を選択してください**