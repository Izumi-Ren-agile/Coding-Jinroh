import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InsertData from "./database/UpdateData";
import { CountData } from "./database/CountData";
import { SelectData } from "./database/SelectData";
import NonhookCountData from "./database/NonhookCountData";

export const InputPlayer = () => {
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [players, setPlayers] = useState([]);
  const [gameObject, setGameObject] = useState({ property: "default" });

  const navigate = useNavigate();
  const handleConfirmPlayer = () => {
    navigate("/confirmPlayer", { state: players });
  };
  useEffect(() => {
    if (isToConfirm) {
      handleConfirmPlayer();
    }
    localStorage.setItem("gameObject", JSON.stringify({ test: "test" }));
    console.log("どうも" + localStorage.getItem("gameObject"));
  }, [players]);

  const gameObjectfileRead = () => {
    fetch("/read-gameObject")
      .then((response) => response.json())
      .then((data) => {
        if (gameObject.property === "default") {
          setGameObject(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  gameObjectfileRead();

  return (
    <>
      {console.log("ゲームオブジェクト取得確認tokademonai", gameObject)}
      <body>
        <div>
          <header>
            <h1>プレイヤーを入力してください</h1>
          </header>
          <div class="player-input">
            <label for="player1">Player 1:</label>
            <input type="text" id="player1" name="player1" />
          </div>
          <div class="player-input">
            <label for="player2">Player 2:</label>
            <input type="text" id="player2" name="player2" />
          </div>
          <div class="player-input">
            <label for="player3">Player 3:</label>
            <input type="text" id="player3" name="player3" />
          </div>
          <div class="player-input">
            <label for="player4">Player 4:</label>
            <input type="text" id="player4" name="player4" />
          </div>
          <div class="player-input">
            <label for="player5">Player 5:</label>
            <input type="text" id="player5" name="player5" />
          </div>
          <div class="player-input">
            <label for="player6">Player 6:</label>
            <input type="text" id="player6" name="player6" />
          </div>
          <div class="player-input">
            <label for="player7">Player 7:</label>
            <input type="text" id="player7" name="player7" />
          </div>
          <div class="player-input">
            <label for="player8">Player 8:</label>
            <input type="text" id="player8" name="player8" />
          </div>
          <div class="button-container">
            <button
              id="submit-button"
              onClick={() => {
                // setPlayers(playerCalc());
                // setIsToConfirm(true);
                gameObjectfileWrite();
              }}
            >
              決定
            </button>
          </div>
        </div>
      </body>
    </>
  );
};
/**
 * 入力された名前をもとにプレイヤークラスのオブジェクトを返す
 * @returns プレイヤーたちのオブジェクト
 */
export const playerCalc = () => {
  class Player {
    constructor(id, name, isJinroh, color, isAlive, isPM) {
      this.id = id;
      this.name = name;
      this.isJinroh = isJinroh;
      this.color = color;
      this.isAlive = isAlive;
      this.isPM = isPM;
    }

    setStatus(isAlive) {
      this.isAlive = isAlive;
    }

    setIsPM(isPM) {
      this.isPM = isPM;
    }
  }

  const colors = [
    "red",
    "blue",
    "green",
    "pink",
    "black",
    "purple",
    "yellow",
    "white",
  ];

  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;
  const player3Name = document.getElementById("player3").value;
  const player4Name = document.getElementById("player4").value;
  const player5Name = document.getElementById("player5").value;
  const player6Name = document.getElementById("player6").value;
  const player7Name = document.getElementById("player7").value;
  const player8Name = document.getElementById("player8").value;

  const playersName = [
    player1Name,
    player2Name,
    player3Name,
    player4Name,
    player5Name,
    player6Name,
    player7Name,
    player8Name,
  ].filter((name) => {
    return name !== "";
  });

  const howManyPlayers = playersName.length;

  let howManyJinroh;
  if (howManyPlayers <= 4) {
    howManyJinroh = 1;
  } else {
    howManyJinroh = 2;
  }

  const jinrohIndex = returnRandomIndex(0, howManyPlayers - 1, howManyJinroh);
  console.log("jinrohIndex", jinrohIndex);
  const players = [];

  let counterOfJinrohIndex = 0;
  for (let i = 0; i < howManyPlayers; i++) {
    let isJinroh = false;
    if (i === jinrohIndex[counterOfJinrohIndex]) {
      isJinroh = true;
      counterOfJinrohIndex++;
    }
    const player = new Player(
      i,
      playersName[i],
      isJinroh,
      colors[i],
      true,
      false
    );
    players.push(player);
  }

  return players;
};

/**
 * ランダムな整数を複数生成し、昇順に返す
 * @param {*} min 生成される数字の最小値
 * @param {*} max 生成される数字の最大値
 * @param {*} howMany 生成される数字の個数
 * @returns 生成された整数
 */
export const returnRandomIndex = (min, max, howMany) => {
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
  return indexies.sort(compareFunc);
};

export const createGameObject = (Players) => {
  //  プレイヤーたち
  const players = Players;

  //クエスチョンIDの設定
  const qDbId = "QUESTION_CONTENT";
  const questionId = returnRandomIndex(1, CountData(qDbId), 1);

  //クエスチョンテキストの取得
  const questionText = SelectData({
    collectionId: qDbId,
    documentId: questionId,
    field: "question",
  });

  //初期に入力されているコードの取得
  const initialCode = SelectData({
    collectionId: qDbId,
    documentId: questionId,
    field: "inicialCode",
  }); //inicialはinitialのスペルミス。本当にこれでデータベースに保存されているので気にする必要なし

  //答えのコードの取得
  const answerCode = SelectData({
    collectionId: qDbId,
    documentId: questionId,
    field: "answerCode",
  });

  //エディターに書かれたコード
  const editor = "";

  //ミッションの取得
  const mDbId = "MISSION_CONTENT";
  const howManyMissions = 5; //プレイヤー一人当たりに取得してくるミッションの数
  const missionIndex = returnRandomIndex(1, CountData(mDbId), 1);
  const newMissions = [];
  for (let m in missionIndex) {
    newMissions.push(m);
  }

  //使用済みミッション
  const usedMissions = [];

  //現在のゲーム内の日付（Day1,Day2,Day3...とつづくやつ）
  const presentDay = 1;

  //マックスの日数
  const maxDay = players <= 4 ? 4 : 6;

  //ゲームフェイズ
  const gamePhase = "night";

  //現在のコーディングターン（コーディングはDay一つにつき複数回行われる）
  const presentCodingTurn = 1;

  //最大のコーディングターン
  const maxCodingTurn = 2;

  //一回のコーディングで書ける最大文字数
  const codingMaxStringNum = 9000; //実質無制限 //一回のコーディングに使える時間

  const codingMaxTime = 60; //秒

  //会議に使える時間
  const meetingMaxTime = 120; //秒

  //現在のプレイヤー
  const presentPlayer = 0;

  //ゲームオブジェクト
  const gameObject = {
    questionId,
    questionText,
    initialCode,
    answerCode,
    players: players,
    editor,
    newMissions,
    usedMissions,
    presentDay,
    maxDay,
    gamePhase,
    presentCodingTurn,
    maxCodingTurn,
    codingMaxStringNum,
    codingMaxTime,
    meetingMaxTime,
    presentPlayer,
  };

  const dummyGameObject = {
    questionId: 2,
    questionText: "dummy",
    initialCode: "dummy code",
    answerCode: "dummy answer",
    players: players,
    editor: "dummy dummy dummy",
    newMissions: ["mission1", "mission2", "mission3"],
    usedMissions: ["mission4"],
    presentDay: 1,
    maxDay: 4,
    gamePhase: 1,
    presentCodingTurn: 1,
    maxCodingTurn: 2,
    codingMaxStringNum: 10000,
    codingMaxTime: 60,
    meetingMaxTime: 120,
    presentPlayer: players[0],
  };
  //データベースに保存
  //const gDbId = "GAME_OBJECTS";
  // InsertData({ collectionId: gDbId, jsonObject: gameObject});
  // InsertData({ collectionId: "mimimimi", jsonObject: gameObject});
  // console.log(gameObject);
  //return gameObject;

  //プロパティファイルに保存
};

export const gameObjectfileWrite = () => {
  const dummyGameObject = {
    questionId: 2,
    questionText: "dummy testtest",
    initialCode: "dummy code",
    answerCode: "dummy answer",
    players: ["p1", "p2", "p3"],
    editor: "dummy dummy dummy",
    newMissions: ["mission1", "mission2", "mission3"],
    usedMissions: ["mission4"],
    presentDay: 1,
    maxDay: 4,
    gamePhase: 1,
    presentCodingTurn: 1,
    maxCodingTurn: 2,
    codingMaxStringNum: 10000,
    codingMaxTime: 60,
    meetingMaxTime: 120,
    presentPlayer: "p1",
  };
  fetch("/write-gameObject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dummyGameObject),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};
