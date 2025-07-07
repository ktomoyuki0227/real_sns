# real_sns (noseチェック済み！)

SNS機能を持つ Web アプリケーション開発プロジェクトです。  
React によるフロントエンドと、Node.js + Express によるバックエンド、MongoDB を用いた構成で構築しています。

---

## 🛠 技術スタック

- **フロントエンド**：React, JavaScript
- **バックエンド**：Node.js, Express
- **データベース**：MongoDB
- **その他ライブラリ**：dotenv, cors, mongoose

---

## 🚀 環境構築手順

このプロジェクトをローカルで動かすための手順です。

### 1. リポジトリをクローン(ssh通信)

```bash
git clone git@github.com:ktomoyuki0227/real_sns.git
cd real_sns/real-sns
```

### 2. フロントエンドのセットアップ

```bash
cd frontend
npm install
npm start
```

- アプリ起動URL：[http://localhost:3000](http://localhost:3000)

### 3. バックエンドのセットアップ（別ターミナルで）

```bash
cd backend
npm install
npm run dev
```

- API起動URL：[http://localhost:5000](http://localhost:5000)

---

## 📁 ディレクトリ構成（抜粋）

```bash
real-sns/
├── frontend/         # React アプリケーション
├── backend/          # Express API サーバ
└── README.md         # このドキュメント
```

---

## 👥 レビュー対象者

このブランチは `feat/addReadme` です。  
レビュー担当者は「ナギ」または「ノセヤマ」を想定しています。

---

## 📝 ライセンス

このプロジェクトは個人学習・研究用途を目的としています。
