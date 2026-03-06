import axios from "axios";

// 本番環境では REACT_APP_API_URL にバックエンドURLを設定する
// 例: https://your-backend.onrender.com
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

export default API;
