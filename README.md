# Real SNS

SNS 機能を持つフルスタック Web アプリケーションです。  
投稿・いいね・フォロー・プロフィール・画像アップロードなどの機能を実装しています。

---

## デモ

| サービス | URL |
|---|---|
| フロントエンド (Vercel) | デプロイ後に記載 |
| バックエンド API (Render) | デプロイ後に記載 |

---

## 技術スタック

### フロントエンド
- **React 19** (Create React App)
- **React Router DOM** — ページ遷移
- **Axios** — API 通信
- **MUI (Material UI)** — アイコン
- **styled-components** — スタイリング
- **timeago.js** — 相対時刻表示

### バックエンド
- **Node.js / Express 5**
- **Mongoose** — MongoDB ODM
- **bcrypt** — パスワードハッシュ化
- **multer** — 画像アップロード
- **cors** — クロスオリジン制御
- **helmet** — セキュリティヘッダー
- **dotenv** — 環境変数管理

### インフラ
- **MongoDB Atlas** — クラウドデータベース
- **Render** — バックエンドホスティング
- **Vercel** — フロントエンドホスティング

---

## 機能一覧

- ユーザー登録 / ログイン（パスワードハッシュ化）
- タイムライン投稿（テキスト・画像）
- 投稿へのいいね
- フォロー / アンフォロー
- プロフィールページ
- 画像アップロード（アバター・カバー・投稿）

---

## ディレクトリ構成

```
real-sns/
├── frontend/                  # React アプリケーション
│   ├── public/
│   ├── src/
│   │   ├── api.js             # Axios インスタンス
│   │   ├── components/        # 再利用コンポーネント
│   │   ├── pages/             # ページ (Home / Login / Register / Profile)
│   │   └── state/             # Context API (認証状態管理)
│   ├── .env                   # ローカル環境変数 (Git 管理外)
│   └── vercel.json            # Vercel デプロイ設定
│
├── backend/                   # Express API サーバー
│   ├── models/                # Mongoose モデル (User / Post)
│   ├── routes/                # API ルート (auth / users / posts / upload)
│   ├── public/images/         # アップロード画像の保存先
│   ├── server.js              # エントリーポイント
│   └── .env                  # ローカル環境変数 (Git 管理外)
│
├── render.yaml                # Render デプロイ設定
└── README.md
```

---

## ローカル環境構築手順

### 1. リポジトリをクローン

```bash
git clone git@github.com:ktomoyuki0227/real_sns.git
cd real_sns
```

### 2. バックエンドのセットアップ

```bash
cd backend
npm install
```

`.env.example` を参考に `backend/.env` を作成：

```env
MONGOURL=mongodb+srv://<ユーザー名>:<パスワード>@cluster0.xxxxx.mongodb.net/real-sns
FRONTEND_URL=http://localhost:3000
PORT=5000
```

```bash
npm start
```

API 起動確認：[http://localhost:5000](http://localhost:5000) → `hello express` と表示されれば OK

### 3. フロントエンドのセットアップ（別ターミナルで）

```bash
cd frontend
npm install
npm start
```

アプリ起動：[http://localhost:3000](http://localhost:3000)

> **注意**: `frontend/.env` が存在しない場合は以下の内容で作成してください。
> ```env
> REACT_APP_API_URL=http://localhost:5000
> REACT_APP_PUBLIC_FOLDER=http://localhost:5000/images
> ```

---

## デプロイ手順

### バックエンド → Render

1. [render.com](https://render.com) でアカウント作成・GitHub 連携
2. `New → Web Service` → このリポジトリを選択
3. 設定：
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Environment Variables に `MONGOURL` / `FRONTEND_URL` / `NODE_ENV=production` を設定
5. デプロイ後の URL をメモ

### フロントエンド → Vercel

1. [vercel.com](https://vercel.com) でアカウント作成・GitHub 連携
2. `Add New → Project` → このリポジトリを選択
3. 設定：
   - Root Directory: `frontend`
   - Framework Preset: `Create React App`
4. Environment Variables に `REACT_APP_API_URL=<RenderのURL>` を設定
5. デプロイ後、Render の `FRONTEND_URL` を Vercel の URL に更新

---

## API エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| POST | `/api/auth/register` | 新規登録 |
| POST | `/api/auth/login` | ログイン |
| GET | `/api/users?userId=` | ユーザー取得 |
| GET | `/api/users?username=` | ユーザー取得 |
| POST | `/api/posts` | 投稿作成 |
| GET | `/api/posts/timeline/:userId` | タイムライン取得 |
| GET | `/api/posts/profile/:username` | プロフィール投稿取得 |
| PUT | `/api/posts/:id/like` | いいね / 取消 |
| POST | `/api/upload` | 画像アップロード |

---

## ライセンス

このプロジェクトは個人学習・研究用途を目的としています。

---

## 感想

初めてのフルスタック開発だったので、わからないことが非常に多かったですが、フルスタック開発の雰囲気や流れなどをなんとなくつかめた気がします。全体的な流れとしては、小さい機能・要素を少しずつ大きくしながら接続していく、印象を持ちました。個人的には、目で確かめながら進められるフロントエンドの方が進行が容易でした。バックエンドでは、フォロー機能の情報管理に苦労しました。ただただフォローした・されたではなく、誰が誰をフォローしているのかが大切なため、扱うデータの形式・要素を工夫する必要がありました。  
また、README を書く際には、使用した技術スタックや環境構築の手順を第三者向けに言語化するのは想像以上に難しかったです。開発に対する理解度が如実に現れるため、まだまだ伸びしろだらけなことを自覚できました。  
ツール利用においては、GitHub の操作を通して、CUI での作業にも少しずつ慣れてきたと感じています。エンジニアにとって必須のツールなので、積極的に利用していきます！