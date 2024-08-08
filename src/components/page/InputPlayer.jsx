import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InsertData from "../database/UpdateData";
import { CountData } from "../database/CountData";
import { SelectData } from "../database/SelectData";
import NonhookCountData from "../database/NonhookCountData";

export const InputPlayer = () => {
  const [gameObject, setGameObject] = useState({ property: "default" });
  const navigate = useNavigate();
  const handleConfirmPlayer = () => {
    navigate("/confirmPlayerPage");
  };

  const gameObjectfileRead = async () => {
    await fetch("/read-gameObject")
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
              onClick={async () => {
                const players = playerCalc();
                // const gameObject = await createGameObject(players);
                // console.log("ゲームオブジェクトは作れているよね？", gameObject);
                const gameObject = await createDummyGameObject(players);
                await gameObjectfileWrite(gameObject);
                console.log("終わってっか？？");
                handleConfirmPlayer();
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
      this.solvedMission = [];
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

export const gameObjectfileWrite = async (object) => {
  await fetch("/write-gameObject", {
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
  const readObject = {
    collectionId,
    documentId,
  };
  fetch("/read-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(readObject),
  })
    .then((response) => response.text())
    .then((data) => console.log("読み込みapi:", data))
    .catch((error) => console.error("Error:", error));
};

export const createGameObject = async (Players) => {
  let returnGameObject;
  const playersObject = {
    players: Players,
  };
  await fetch("/create-gameObject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playersObject),
  })
    .then((response) => response.text())
    .then((data) => returnGameObject = data)
    .catch((error) => console.error("Error:", error));

  return JSON.parse(returnGameObject);
};

/*-------------------------------------------------------------------------------*/

//ゲームオブジェクトの作成
const createDummyGameObject = async (Players) => {
  //gameId
  const gameId = new Date().toString();

  //クエスチョンIDの設定
  const questionId = "1234";

  //クエスチョンテキストの取得
  const questionText = '文字列に含まれる単語数を数える countWords メソッドの作成\n 仕様\n引数1:String\n戻り値:int\nなお、ここでは単語を下記のように定義します。- \n・連続する文字の集まり- \n・他の連続する文字の集まりと半角空白で隔てられている- \n・構成要素として半角空白と全角空白を含まない\n例えば、"Hello World"という文字列に含まれる単語は「Hello」と「World」の二つです。"HelloWorld"の場合、含まれる単語は「HelloWorld」一つだけとなります。\n\nmainメソッドでcountWordsメソッドが呼びだされ正誤判定がされます。すべての正誤判定が""○""になるよう、countWordsメソッドを編集してください。なお、mainメソッドを編集することはできません。';

  //初期に入力されているコードの取得
  const main = 'public static void main(String[] args){\n\t//正誤判定1\n\tSystem.out.println("入力1:Hello World");\n\tSystem.out.println("期待出力1:2");\n\tSystem.out.println("実際の出力1:"+countWords("Hello World"));\n\tSystem.out.println("正誤1:"+(countWords("Hello World")==2?"○":"×"));System.out.println();\n\n\t//正誤判定2\n\tSystem.out.println("入力2:Java is fan");\n\tSystem.out.println("期待出力2:3");\n\tSystem.out.println("実際の出力2:"+countWords("Java is fan"));\n\tSystem.out.println("正誤2:"+(countWords("Java is fan")==3?"○":"×"));System.out.println();\n\n\t//正誤判定3\n\tSystem.out.println("入力3: Count the words");\n\tSystem.out.println("期待出力3:3");\n\tSystem.out.println("実際の出力3:"+countWords(" Count the words"));\n\tSystem.out.println("正誤3:"+(countWords(" Count the words")==3?"○":"×"));System.out.println();\n\n\t//正誤判定4\n\tSystem.out.println("入力4:This   is a  test");\n\tSystem.out.println("期待出力4:4");\n\tSystem.out.println("実際の出力4:"+countWords("This   is a  test"));\n\tSystem.out.println("正誤4:"+(countWords("This   is a  test")==4?"○":"×"));System.out.println();\n\n\t//正誤判定5\n\tSystem.out.println("入力5:OneTwoThree");\n\tSystem.out.println("期待出力5:1");\n\tSystem.out.println("実際の出力5:"+countWords("OneTwoThree"));\n\tSystem.out.println("正誤5:"+(countWords("OneTwoThree")==1?"○":"×"));System.out.println();\n}'

  const initialCode = "public static int countWords(String str){\n\treturn 0;\n}";

  //答えのコードの取得
  const answerCode = 'public int countWords(String str){\n\t// 文字列がnullまたは空の場合、単語数は0 \n\tif (str == null || str.isEmpty()) { \n\t\treturn 0;\n\t} \n\t// 文字列をトリムして前後の空白を取り除く\n\tstr = str.trim(); \n\t// 文字列が再び空の場合（空白のみの文字列だった場合）、単語数は0 \n\tif (str.isEmpty()) { \n\t\treturn 0;\n\t} \n\t// 文字列をスペースで分割して単語の配列を作成\n\tString[] words = str.split("\\s+"); \n\t// 配列の長さを返す（これが単語数になる）\n\treturn words.length; \n}';

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
  const missionContent1 = {
    mission: "文字列\n'int'\nを含めろ！",
    arg: "int"
  }
  const missionContent2 = {
    mission: "文字列\n'String'\nを含めろ！",
    arg: "String"
  }
  const missionContent3 = {
    mission: "文字列\n'aiueo'\nを含めろ！",
    arg: "aiueo"
  }
  const missionContent4 = {
    mission: "文字列\n'Array'\nを含めろ！",
    arg: "Array"
  }
  const missionContent5 = {
    mission: "文字列\n'soccer'\nを含めろ！",
    arg: "soccer"
  }

  let missions = [missionContent1, missionContent2, missionContent3, missionContent4, missionContent5];
  missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4, missionContent5];
  missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4, missionContent5];
  missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4, missionContent5];
  missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4, missionContent5];

  //次のミッション
  const nextMissionIndex = 0;

  //現在のゲーム内の日付（Day1,Day2,Day3...とつづくやつ）
  const presentDay = 1;

  //マックスの日数
  const maxDay = 5;

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

  //現在のターンが始まった時間
  const startingTurn = Math.floor(Date.now() / 1000);;

  //ゲームの結果
  const gameResult = "draw";

  //InputとOutputのペア
  // const verificationInOut = await readData(qDbId, questionId + "", "verificationInOut");

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