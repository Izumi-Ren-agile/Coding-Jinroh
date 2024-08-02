const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs");

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
  fs.readFile("gameObject.json","utf8",(err,data)=>{
    if(err){
        return res.status(500).send("ゲームオブジェクトの読み取りエラーが発生しました");
    }else{
        return res.status(200).json(JSON.parse(data));
    };
  })
});

// サーバの設定
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
