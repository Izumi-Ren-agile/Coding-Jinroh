const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs").promises; // `fs.promises` を使用して非同期APIを使用
const { compileCode } = require("./serverCompilerApi");

const {
  initializeApp,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ゲームオブジェクトを書き込むエンドポイント
app.post("/write-gameObject", async (req, res) => {
  const data = JSON.stringify(req.body, null, 2); // インデントを追加して整形
  try {
    await fs.writeFile("gameObject.json", data);
    res.send("File written successfully");
  } catch (err) {
    res.status(500).send("Error writing file");
  }
});

// ゲームオブジェクトを読み込むエンドポイント
app.get("/read-gameObject", async (req, res) => {
  try {
    const data = await fs.readFile("gameObject.json", "utf8");
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    res.status(500).send("ゲームオブジェクトの読み取りエラーが発生しました");
  }
});

// Firebaseの初期化
const serviceAccount = require("./coding-jinroh-f06366860c17.json");
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// データの追加・アップデートのAPI
app.post("/set-data", async (req, res) => {
  try {
    const docRef = db.collection(req.body.collectionId).doc(req.body.documentId);
    await docRef.set(req.body.object);
    res.send("Data added successfully");
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).send("Error setting data");
  }
});

// データの読み取り
app.post("/read-data", async (req, res) => {
  try {
    const snapshot = await db.collection(req.body.collectionId).get();
    const data = snapshot.docs
      .filter((doc) => doc.id === req.body.documentId)
      .map((doc) => doc.data());
    res.status(200).json(data);
  } catch (error) {
    console.error("Error reading data: ", error);
    res.status(500).send("Error reading data");
  }
});

// ゲームオブジェクトの作成
const createGameObject = async (Players) => {
  // 詳細なゲームオブジェクト作成処理（省略）
  // ...
};

// ゲームオブジェクト作成API
app.post("/create-gameObject", async (req, res) => {
  try {
    const players = req.body.players;
    const gameObject = await createGameObject(players);
    res.status(200).json(gameObject);
  } catch (error) {
    console.error("Error creating game object: ", error);
    res.status(500).send("Error creating game object");
  }
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

// Reactルーターのためのフォールバック
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// サーバの設定
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
