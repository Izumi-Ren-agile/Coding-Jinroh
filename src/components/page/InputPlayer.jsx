import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InsertData from "../database/UpdateData";
import { CountData } from "../database/CountData";
import { SelectData } from "../database/SelectData";
import NonhookCountData from "../database/NonhookCountData";

export const InputPlayer = () => {
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [players, setPlayers] = useState([]);
  const [gameObject, setGameObject] = useState({ property: "default" });
  const [flagOfCreateGameObject, setFlagOfGameObject] = useState(false);
  const [initialGameObject, setInitialGameObject] = useState({});

  const navigate = useNavigate();
  const handleConfirmPlayer = () => {
    navigate("/confirmPlayerPage", { state: players });
  };
  //画面遷移のためのuseEffect
  useEffect(() => {
    if (isToConfirm) {
      handleConfirmPlayer();
    }
    localStorage.setItem("gameObject", JSON.stringify({ test: "test" }));
    console.log("どうも" + localStorage.getItem("gameObject"));
  }, [players]);

  //ゲームオブジェクト作成
  useEffect(() => {
    if (flagOfCreateGameObject === true) {
      setInitialGameObject(createGameObject(players));
      console.log(
        "useEffectによるゲームオブジェクトの作成:",
        initialGameObject
      );
      //setFlagOfGameObject(false);
    }
  }, [flagOfCreateGameObject]);

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

  useEffect(() => {
    gameObjectfileRead();
  }, []);

  useEffect(() => {
    console.log("ゲームオブジェクト:", gameObject);
  }, [gameObject]);

  return (
    <>
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
                handleConfirmPlayer();
                gameObjectfileWrite(dummyGameObject);
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
      this.yourMission = [];
      this.voted = 0;
      this.imagePath = "/images/image";
    }

    setStatus(isAlive) {
      this.isAlive = isAlive;
    }

    setIsPM(isPM) {
      this.isPM = isPM;
    }
  }

  const colors = [
    "lime",
    "pink",
    "aqua",
    "purple",
    "yellow",
    "orange",
    "red",
    "gray",
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
  //gameId
  const gameId = new Date().toString();

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
  const mDbId = "MISSION_CONTENT";
  const howManyMissions = 5; //プレイヤー一人当たりに取得してくるミッションの数
  const missionIndex = returnRandomIndex(
    1,
    CountData(mDbId),
    players.length * howManyMissions
  );
  const missions = [];
  for (let m in missionIndex) {
    missions.push(m);
  }

  //次のミッション
  const nextMissionIndex = 0;

  //現在のゲーム内の日付（Day1,Day2,Day3...とつづくやつ）
  const presentDay = 1;

  //マックスの日数
  const maxDay = 4;

  //ゲームフェイズ
  const gamePhase = "confirmRole";

  //現在のコーディングターン（コーディングはDay一つにつき複数回行われる）
  const presentCodingTurn = 1;

  //最大のコーディングターン
  const maxCodingTurn = 2;

  //一回のコーディングで書ける最大文字数
  const codingMaxStringNum = 2000; //実質無制限 //一回のコーディングに使える時間

  //コーディングの時間制限
  const codingMaxTime = 60; //秒

  //会議に使える時間
  const meetingmaxTime = 120; //秒

  //コーディングの順番をランダムにするか
  const isRandom = false;

  //ミッションの最大数
  const maxMissionNum = 3;

  //言語
  const codeLanguage = "java";

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
  };
  return gameObject;
};

const questionObject = {
  questionId: "",
  questionText:
    "以下の仕様を満たす countWords メソッドの作成\n 仕様：\n<br /> ・与えられた文字列に含まれる単語の数を数えるメソッド ・単語はスペースで区切られているものとする",
  initialCode:
    'public class Main {\npublic static void main(String[] args) {\n        // テストケース\n        System.out.println(countWords("Hello world"));             // 出力: 2\n        System.out.println(countWords("Java is fun"));             // 出力: 3\n        System.out.println(countWords(" Count the words "));       // 出力: 3\n        System.out.println(countWords("This is a test"));          // 出力: 4\n        System.out.println(countWords("OneTwoThree"));             // 出力: 1\n    }\n\n    // 与えられた文字列に含まれる単語の数を数えるメソッド\n    public static int countWords(String str) {\n        // 文字列がnullまたは空の場合、単語数は0\n        if (str == null || str.isEmpty()) {\n            return 0;\n        }\n        \n        // 文字列をトリムして前後の空白を取り除く\n        str = str.trim();\n\n        // 文字列が再び空の場合（空白のみの文字列だった場合）、単語数は0\n        if (str.isEmpty()) {\n            return 0;\n        }\n        \n        // 文字列をスペースで分割して単語の配列を作成\n        String[] words = str.split("\\s+");\n\n        // 配列の長さを返す（これが単語数になる）\n        return words.length;\n}\n}\n\n',
  answerCode: "bbbbbbbbbbbbb",
};
const player1 = {
  id: 1111,
  name: "ikeda",
  isJinroh: false,
  color: "lime",
  //isAlive: true,
  isPM: false,
  yourMission: [], //初期値はから配列でOK
  voted: 0,
  imagePath: "/images/image",
};

const player2 = {
  id: 2222,
  name: "izumi",
  isJinroh: false,
  color: "pink",
  isAlive: true,
  isPM: false,
  yourMission: [],
  voted: 0,
  imagePath: "/images/image",
};

const player3 = {
  id: 3333,
  name: "nishimura",
  isJinroh: true,
  color: "aqua",
  isAlive: true,
  isPM: false,
  yourMission: [],
  voted: 0,
  imagePath: "/images/image",
};

const player4 = {
  id: 4444,
  name: "takahashi",
  isJinroh: false,
  color: "purple",
  isAlive: true,
  isPM: false,
  yourMission: [],
  voted: 0,
  imagePath: "/images/image",
};

const player5 = {
  id: 5555,
  name: "papa",
  isJinroh: false,
  color: "yellow",
  isAlive: true,
  isPM: false,
  yourMission: [],
  voted: 0,
  imagePath: "/images/image",
};

const player6 = {
  id: 6666,
  name: "papa",
  isJinroh: false,
  color: "orange",
  isAlive: true,
  isPM: false,
  yourMission: [],
  voted: 0,
  imagePath: "/images/image",
};

//初心者用1
const questionObject1 = {
  questionId: "",
  questionText:
    `以下の仕様を満たす countWords メソッドの作成
    仕様：
    ・与えられた文字列に含まれる単語の数を数えるメソッド
    ・単語はスペースで区切られているものとする"`,
  initialCode:
    `public class Main { public static void main(String[] args) { 
    // テストケース 
    System.out.println(countWords("Hello world"));// 出力: 2 
    System.out.println(countWords("Java is fun")); // 出力: 3 
    System.out.println(countWords(" Count the words ")); // 出力: 3
    System.out.println(countWords("This is a test")); // 出力: 4 
    System.out.println(countWords("OneTwoThree")); // 出力: 1 } 
    
    // 与えられた文字列に含まれる単語の数を数えるメソッド 
    public static int countWords(String str) { 
    //ここに実装 
    return null; } }
`,
  answerCode: 
  `public class Main {     public static void main(String[] args) {         
    // テストケース         
    System.out.println(countWords("Hello w3orld"));             
    // 出力: 2         
    System.out.println(countWords("Java is fun"));             
    // 出力: 3         
    System.out.println(countWords(" Count the words "));       
    // 出力: 3         
    System.out.println(countWords("This is a test"));          
    // 出力: 4         
    System.out.println(countWords("OneTwoThree"));             
    // 出力: 1     }      
    // 与えられた文字列に含まれる単語の数を数えるメソッド     
    public static int countWords(String str) {         
    // 文字列がnullまたは空の場合、単語数は0         
    if (str == null || str.isEmpty()) {             
    return 0; 
            }                  
    // 文字列をトリムして前後の空白を取り除く         
    str = str.trim();          
    // 文字列が再び空の場合（空白のみの文字列だった場合）、単語数は0
    if (str.isEmpty()) {             
    return 0;         }                  
    // 文字列をスペースで分割して単語の配列を作成         
    String[] words = str.split("\\s+");          
    // 配列の長さを返す（これが単語数になる）         
    return words.length;     } }`,
    verificationInOut:{
      input1:"Hello world",
      input2:"Java is fun ",
      input3:" Count the words ",
      input4:"This is a test",
      input5:"OneTwoThree",
      output1:"2",
      output2:"3",
      output3:"3",
      output4:"3",
      output5:"1"
  }
};


const players = [player1, player2, player3];

const missionContent0 = {
  mission: "文字列\n'int0'\nを含めろ！",
  arg: "int",
};

const missionContent1 = {
  mission: "文字列\n'int'\nを含めろ！",
  arg: "int",
};

const missionContent2 = {
  mission: "文字列\n'int2'\nを含めろ！",
  arg: "int",
};

const missionContent3 = {
  mission: "文字列\n'int3'\nを含めろ！",
  arg: "int",
};

const missionContent4 = {
  mission: "文字列\n'int4'\nを含めろ！",
  arg: "int",
};

const missionContent5 = {
  mission: "文字列\n'int5'\nを含めろ！",
  arg: "int",
};

let missions = [
  missionContent1,
  missionContent2,
  missionContent3,
  missionContent4,
  missionContent5,
];

missions = [
  ...missions,
  missionContent1,
  missionContent2,
  missionContent3,
  missionContent4,
  missionContent5,
];

missions = [
  ...missions,
  missionContent1,
  missionContent2,
  missionContent3,
  missionContent4,
  missionContent5,
];

missions = [
  ...missions,
  missionContent1,
  missionContent2,
  missionContent3,
  missionContent4,
  missionContent5,
];

const dummyGameObject = {
  gameId: "1234dummyData",
  questionId: questionObject1.questionId,
  questionText: questionObject1.questionText,
  initialCode: questionObject1.initialCode,
  answerCode: questionObject1.answerCode,
  verificationInOut:questionObject1.verificationInOut,
  initialPlayers: players,
  players: players,
  presentPlayer: 0,
  editor: questionObject1.initialCode,
  editorHistory: [{ name: "初期コード", code: questionObject.initialCode }],
  missions: missions,
  nextMissionIndex: 0,
  presentDay: 1,
  maxDay: 4,
  gamePhase: "confirmRole",
  presentCodingTurn: 1,
  maxCodingTurn: 2,
  codingMaxStringNum: 2000,
  codingMaxTime: 60,
  meetingmaxTime: 120,
  isRandom: false,
  maxMissionNum: 3,
  codeLanguage: "java",
};
export const gameObjectfileWrite = (object) => {
  fetch("/write-gameObject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export const setData = (object, collectionId, documentId) => {
  const sendObject = {
    object,
    collectionId,
    documentId,
  };

  fetch("/set-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendObject),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export const readData = (collectionId, documentId) => {
  const readObject={
    collectionId,
    documentId
  }
  fetch("/read-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(readObject),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};
