const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { compileCode } = require("./serverCompilerApi");


const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

// expressオブジェクトの生成
const app = express();

// ルートリクエストでReactアプリを提供
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// 静的ファイルを提供するミドルウェア
app.use(express.static(path.join(__dirname, "build")));

const bodyParser = require("body-parser");
// urlencodedとjsonは別々に初期化する
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.post("/write-gameObject", (req, res) => {
  const data = JSON.stringify(req.body);
  console.log("データの把握:", req.body);
  fs.writeFile("gameObject.json", data, (err) => {
    if (err) {
      res.status(500).send("Error writing file");
    } else {
      res.send("File written successfully");
    }
  });
});

app.get("/read-gameObject", (req, res) => {
  fs.readFile("gameObject.json", "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .send("ゲームオブジェクトの読み取りエラーが発生しました");
    } else {
      return res.status(200).json(JSON.parse(data));
    }
  });
});

/*-------------------------------------------------------------------------------------------------------*/
//データベースまわりのAPI
const serviceAccount = require("./coding-jinroh-03e900b22f00.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

//データの追加・アップデート
app.post("/set-data", async (req, res) => {
  try {
    const docRef = db
      .collection(req.body.collectionId)
      .doc(req.body.documentId);
    await docRef.set(req.body.object);
    res.send("Data added successfully");
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).send("Error setting data");
  }
});

//データの読み取り
app.get("/read-data", async (req, res) => {
  const snapshot = await db.collection(req.body.collectionId).get();
  const data=snapshot[0];
  return res.status(200).json(JSON.parse(data));
});

/*-------------------------------------------------------------------------------*/

// Reactルーターのためのフォールバック
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// コンパイルリクエストを処理するためのPOSTエンドポイント
app.post("/compile", async (req, res) => {
  const { language, sourceCode } = req.body;

  try {
    const result = await compileCode(language, sourceCode);
    res.json({ stdout: result.stdout, buildStderr: result.build_stderr });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// サーバの設定
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
