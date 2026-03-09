const router = require("express").Router();
const multer = require("multer");
const path = require("path");

// アップロード先の設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    // フロントから送られてくる name フィールドをファイル名として使用
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

// 画像アップロード
router.post("/", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({ message: "ファイルのアップロードに成功しました" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
