const express = require("express");
const app = express();
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const uploadRoute = require("./routes/upload")
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();


//データベース接続
mongoose.connect(process.env.MONGOURL)
.then(() => {
   console.log("DBと接続中・・・");
})
.catch((err) => {
    console.log(err);
});

//CORS設定（フロントエンドからのリクエストを許可）
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
  : ["http://localhost:3000"];

app.use(cors({
  origin: function (origin, callback) {
    // originがない（同一オリジン・curl等）は許可
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS policy violation: " + origin));
  },
  credentials: true,
}));

//ミドルウェア
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/upload", uploadRoute)


app.get("/", (req, res) => {
    res.send("hello express");
});

// app.get("/users", (req, res) => {
//     res.send("users express");
// });

app.listen(PORT, () => console.log("サーバが移動しました"));

