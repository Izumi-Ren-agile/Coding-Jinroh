const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs").promises; // `fs.promises` を使用して非同期APIを使用
const { compileCode } = require("./serverCompilerApi");

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

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
  // const data = JSON.stringify(req.body, null, 2); // インデントを追加して整形
  // try {
  //   await fs.writeFile("gameObject.json", data);
  //   res.send("File written successfully");
  // } catch (err) {
  //   res.status(500).send("Error writing file");
  // }
  await setData("GAMEOBJECT", "gameObject", req.body);
  res.send("File written successfully");
});

// ゲームオブジェクトを読み込むエンドポイント
app.get("/read-gameObject", async (req, res) => {
  // try {
  //   const data = await fs.readFile("gameObject.json", "utf8");
  //   res.status(200).json(JSON.parse(data));
  // } catch (err) {
  //   res.status(500).send("ゲームオブジェクトの読み取りエラーが発生しました");
  // }
  const data = await readData2("GAMEOBJECT", "gameObject");
  return res.status(200).json(data);
});

/*-------------------------------------------------------------------------------------------------------*/
//データベースまわりのAPI
const serviceAccount = require("./coding-jinroh-f06366860c17.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

//データの追加・アップデートのAPI
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
  console.log("データの追加が行われました");
});

//データ追加・アップデートメソッド
const setData = async (collectionId, documentId, object) => {
  const docRef = db.collection(collectionId).doc(documentId);
  await docRef.set(object);
  console.log("データの追加が行われました");
};

//データの読み取り
app.post("/read-data", async (req, res) => {
  const snapshot = await db.collection(req.body.collectionId).get();
  const data = snapshot.docs
    .filter((doc) => doc.id === req.body.documentId)
    .map((doc) => doc.data());
  console.log("データの読み取りが行われました1");
  return res.status(200).json(data);
});

//データの読み取り,フィールド単位
const readData = async (collectionId, documentId, field) => {
  // const snapshot = await db.collection(collectionId).get();
  // const data = snapshot.docs
  //   .filter((doc) => doc.id === documentId)
  //   .map((doc) => doc.data());
  const docRef = db.collection(collectionId).doc(documentId);
  const doc = await docRef.get();
  const data = doc.exists ? doc.data() : null;
  // const f = data.map((col, index) => {
  //   return col[field];
  // });
  console.log("データの読み取りが行われました2");
  return data[field];
};

//データの読み取り,ドキュメント単位
const readData2 = async (collectionId, documentId) => {
  // const snapshot = await db.collection(collectionId).get();
  // const data = snapshot.docs
  //   .filter((doc) => doc.id === documentId)
  //   .map((doc) => doc.data());
  const docRef = db.collection(collectionId).doc(documentId);
  const doc = await docRef.get();
  const data = doc.exists ? doc.data() : null;
  console.log("データの読み取りが行われました3");
  return data;
};

//データのカウント
const countData = async (collectionId) => {
  const snapshot = await db.collection(collectionId).get();
  const data = snapshot.docs.map((doc) => doc.data());
  console.log("データの読み取りが行われました4");
  return data.length;
};
/*-------------------------------------------------------------------------------*/

//ゲームオブジェクトの作成
const createGameObject = async (Players, difficulty, maxCodingTime, maxMeetingTime, MaxCodingTurn, MaxMissionNum, maxDayNum, jinrohNum, isShuffle, language) => {
  //gameId
  const gameId = new Date().toString();

  //クエスチョンIDの設定
  const qDbId = "QUESTION_CONTENT";
  const questionIdMin=17;
  const questionIdArray = returnRandomIndex(questionIdMin, questionIdMin-1+await countData(qDbId), 1);
  const questionId = 21;//questionIdArray[0];
  //const questionId = 17;

  //クエスチョンテキストの取得
  let questionText = await readData(qDbId, questionId + "", "question");
  questionText=questionText.replace(/”/g,'"').replace(/’/g,"'");

  //初期に入力されているコードの取得
  let initialCode = await readData(qDbId, questionId + "", "inicialCode"); //inicialはinitialのスペルミス。本当にこれでデータベースに保存されているので気にする必要なし
  initialCode = initialCode.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/”/g,'"').replace(/’/g,"'");

  //答えのコードの取得
  let answerCode = await readData(qDbId, questionId + "", "answerCode");
  answerCode = answerCode.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/”/g,'"').replace(/’/g,"'");

  //最初のプレイヤーたち
  const initialPlayers = Players;

  //  プレイヤーたち
  const players = Players;

  //現在コーディング中のプレイヤー
  const presentPlayer = 0;

  //エディターに書かれたコード
  const editor = initialCode;

  //エディターヒストリー
  const editorHistory = [{ name: "初期コード", code: initialCode }];

  //ミッションの取得
  const havingDuplicateMissions = JSON.parse(
    await fs.readFile("missions.json", "utf8")
  );
  console.log("ミッションの被りあり総数", havingDuplicateMissions.length);

  const missions=removeDuplicates(havingDuplicateMissions,'arg');
  console.log("ミッションの被りなし総数", missions.length);

  //次のミッション
  const nextMissionIndex = 0;

  //現在のゲーム内の日付（Day1,Day2,Day3...とつづくやつ）
  const presentDay = 1;

  //マックスの日数
  const maxDay = maxDayNum;

  //ゲームフェイズ
  const gamePhase = "confirmRole";

  //現在のコーディングターン（コーディングはDay一つにつき複数回行われる）
  const presentCodingTurn = 1;

  //最大のコーディングターン
  const maxCodingTurn = MaxCodingTurn;

  //一回のコーディングで書ける最大文字数
  const codingMaxStringNum = 2000; //実質無制限 //一回のコーディングに使える時間

  //コーディングの時間制限
  const codingMaxTime = maxCodingTime; //秒

  //会議に使える時間
  const meetingmaxTime = maxMeetingTime; //秒

  //コーディングの順番をランダムにするか
  const isRandom = isShuffle;

  //ミッションの最大数
  const maxMissionNum = MaxMissionNum;

  //言語
  const codeLanguage = language;

  //現在のターンが始まった時間
  const startingTurn = Math.floor(Date.now() / 1000);

  //ゲームの結果
  const gameResult = "draw";

  //クエスチョンのmain
  let main = await readData(qDbId, questionId + "", "main");
  main = main.replace(/\\n/g, "\n").replace(/\\t/g, "\t");

  //ゲームオブジェクト
  const gameObject = {
    gameId,
    questionId,
    questionText,
    initialCode,
    answerCode,
    initialPlayers,
    players,
    presentPlayer,
    editor,
    editorHistory,
    missions,
    nextMissionIndex,
    presentDay,
    maxDay,
    gamePhase,
    presentCodingTurn,
    maxCodingTurn,
    codingMaxStringNum,
    codingMaxTime,
    meetingmaxTime,
    isRandom,
    maxMissionNum,
    codeLanguage,
    startingTurn,
    gameResult,
    main,
  };
  return gameObject;
};

//ゲームオブジェクト作成API
app.post("/create-gameObject", async (req, res) => {
  const players = req.body.players;
  const difficulty = req.body.difficulty;
  const maxCodingTime = req.body.maxCodingTime;
  const maxMeetingTime = req.body.maxMeetingTime;
  const maxCodingTurn = req.body.maxCodingTurn;
  const maxMissionNum = req.body.maxMissionNum;
  const maxDayNum = req.body.maxDayNum;
  const jinrohNum = req.body.jinrohNum;
  const isShuffle = req.body.isShuffle;
  const language = req.body.language;

  //console.log("pureiya-zu watashi",players);
  const gameObject = await createGameObject(players, difficulty, maxCodingTime, maxMeetingTime, maxCodingTurn, maxMissionNum, maxDayNum, jinrohNum, isShuffle, language);
  //console.log("ゲームオブジェクト作れてる？",gameObject);
  return res.status(200).json(gameObject);
});

//ランダムな整数を返す
const returnRandomIndex = (min, max, howMany) => {
  const indexies = [];
  while (howMany !== 0) {
    const createdIndex = Math.floor(Math.random() * (max + 1 - min)) + min;
    if (!indexies.includes(createdIndex)) {
      indexies.push(createdIndex);
      howMany -= 1;
    }
  }
  const compareFunc = (a, b) => {
    return a - b;
  };
  if (howMany === 1) {
    return indexies[0];
  }
  return indexies.sort(compareFunc);
};

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

//配列からかぶりを排除する関数
const removeDuplicates = (arr, key) => {
  const seen = new Set(); // 重複を追跡するためのセット
  const result = []; // 重複を除外した結果の配列

  for (const item of arr) {
    if (!seen.has(item[key])) {
      seen.add(item[key]); // セットに追加
      result.push(item); // 結果の配列に追加
    }
  }

  return result;
};
