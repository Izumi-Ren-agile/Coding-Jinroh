/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import InsertData from "../database/UpdateData";
// import { CountData } from "../database/CountData";
// import { SelectData } from "../database/SelectData";
// import NonhookCountData from "../database/NonhookCountData";
import { UserOutlined } from '@ant-design/icons';
import useSound from "use-sound";
import ButtonSound1 from "../../sound/creep_up_on.mp3";
import { Input, Button, Radio, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const InputPlayer = () => {

  const [play, { stop, pause }] = useSound(ButtonSound1);

  const [gameObject, setGameObject] = useState({ property: "default" });
  const [playerNames, setPlayerNames] = useState(Array(8).fill(''));
  const [usePlayerImage, setUsePlayerImage] = useState(Array(8).fill('OFF'));
  const [playerNameErrorMassage, setPlayerNameErrorMessage] = useState(Array(8).fill(''));
  const [inputPlayerNum, setInputPlayerNum] = useState(0);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [difficulty, setDifficulty] = useState('中級');
  const [maxCodingTime, setMaxCodingTime] = useState(60);
  const [maxMeetingTime, setMaxMeetingTime] = useState(120);
  const [missionNum, setMissionNum] = useState(3);
  const [maxCodingTurn, setMaxCodingTurn] = useState(2);
  const [maxDays, setMaxDays] = useState("自動");
  const [jinrohNum, setJinrohNum] = useState("自動");
  const [shufflePlayer, setShufflePlayer] = useState(false);
  const [language, setLanguage] = useState('java');

  const handlePlayerNameChange = (index, value) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = value;
    setPlayerNames(newPlayerNames);
    const newPlayerNameErrorMessage = [...playerNameErrorMassage];
    newPlayerNameErrorMessage[index] = calcNameErrorMessage(value);
    setPlayerNameErrorMessage(newPlayerNameErrorMessage);
  };

  const handleUsePlayerImageChange = (index, value) => {
    const newUsePlayerImage = [...usePlayerImage];
    newUsePlayerImage[index] = value;
    setUsePlayerImage(newUsePlayerImage);
  };

  const calcNameErrorMessage = (playerNameValue) => {
    // 空白のみを検出する正規表現
    const whitespaceRegex = /^\s*$/;

    // 空白文字のみの場合はfalseを返す
    if (whitespaceRegex.test(playerNameValue) && playerNameValue !== "") {
      return "空白のみのプレイヤー名は設定できません";
    }

    let nameLength = 0;

    for (let j = 0; j < playerNameValue.length; j++) {
      if (playerNameValue.match(/[ -~]/)) { // 半角文字の場合
        nameLength += 1;
      } else { // 全角文字の場合
        nameLength += 2;
      }
    }

    console.log(nameLength);
    if (nameLength > 20) {
      return "半角20文字以上、全角10文字以上のプレイヤー名は設定できません";
    }

    return "";
  }

  const handleQuestionPage = () => {
    navigate("/question")
  }

  const handleConfirmPlayer = () => {
    navigate("/confirmPlayerPage");
  };

  const contentsStyle = css`
  flex-grow: 1;
  display: flex;
  margin-bottom: 20px;
  `
  const contentLeftStyle = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 40px;
  `
  const contentRightStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 400px;
  padding: 0 10px;
  `
  const playerInputStyle = css`
  padding: 0 20px:
  margin: 0 40px:
  `
  const playerInputContainerStyle = css`
  display: flex;
  gap: 10px;
  `
  const radioContainerStyle = css`
  display: flex;
  gap: 30px;
  `
  const radioButtonStyle = css`
  padding: 0 20px:
  `
  const buttonContainerStyle = css`
  display: flex;
  align-items: center;
  margin: 20px auto;
  `

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

  useEffect(() => {
    setInputPlayerNum(playerNames.filter(name => name !== '').length);
  }, [playerNames])

  return (
    <>
      <body>
        <div class="container">
          <h1 className="title">コーディング人狼 - オプション設定</h1>
          <div css={contentsStyle}>
            <div css={contentLeftStyle}>
              <header>
                <h2 style={{ textAlign: "center" }}>プレイヤーを入力してください <Tooltip title="プレイヤーは３～８人で設定してください。１～２人でゲームを開始するとPracticeモードになり、課題の練習ができます。" placement="top"><QuestionCircleOutlined /></Tooltip></h2>
                <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
              </header>
              {playerNames.map((name, index) => (
                <div key={index} css={playerInputStyle}>
                  <label htmlFor={`player${index + 1}`}>{`Player ${index + 1}  `}<span style={{ color: "red" }}>{playerNameErrorMassage[index]}</span></label>
                  <div css={playerInputContainerStyle}>
                    <Input
                      size="small"
                      id={`player${index + 1}`}
                      placeholder="名前を入力してください"
                      prefix={<UserOutlined />}
                      value={name}
                      onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                    />
                    <Radio.Group onChange={(e) => handleUsePlayerImageChange(index, e.target.value)} value={usePlayerImage[index]} buttonStyle="solid" size="middle" style={{ minWidth: "160px" }}>
                      <Radio.Button value={"ON"}><Tooltip title="githubアカウント名を入力することで、アバター画像が使用できます。" placement="top">画像を使用</Tooltip></Radio.Button>
                      <Radio.Button value={"OFF"}>OFF</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              ))}
            </div>
            <div css={contentRightStyle}>
              <header>
                <h2>ゲーム設定を選択してください <Tooltip title="ゲームのオプションを設定してください。変更しなければ、デフォルト設定で遊ぶことができます。" placement="top"><QuestionCircleOutlined /></Tooltip></h2>
              </header>
              <div css={radioButtonStyle}>
                <label for="difficulty">課題難易度 <Tooltip title="問題の難易度を選んでください。" placement="top"><QuestionCircleOutlined /></Tooltip><br /></label>
                <Radio.Group onChange={(e) => setDifficulty(e.target.value)} value={difficulty} buttonStyle="solid" size="large">
                  <Radio.Button value={'初級'} disabled>初級</Radio.Button>
                  <Radio.Button value={'中級'}>中級</Radio.Button>
                  <Radio.Button value={'上級'} disabled>上級</Radio.Button>
                </Radio.Group>
              </div>
              <div css={radioButtonStyle}>
                <label for="maxCodingTime">コーディング秒数 <Tooltip title="１ターン毎のコーディング秒数を設定してください。" placement="top"><QuestionCircleOutlined /></Tooltip><br /></label>
                <Radio.Group onChange={(e) => setMaxCodingTime(e.target.value)} value={maxCodingTime} buttonStyle="solid" size="large">
                  <Radio.Button value={30}>30秒</Radio.Button>
                  <Radio.Button value={60}>60秒</Radio.Button>
                  <Radio.Button value={120}>120秒</Radio.Button>
                  <Radio.Button value={240}>240秒</Radio.Button>
                  <Radio.Button value={999}>999秒</Radio.Button>
                </Radio.Group>
              </div>
              <div css={radioButtonStyle}>
                <label for="maxMeetingTime">会議秒数 <Tooltip title="１Day毎の会議秒数を設定してください。" placement="top"><QuestionCircleOutlined /></Tooltip><br /></label>
                <Radio.Group onChange={(e) => setMaxMeetingTime(e.target.value)} value={maxMeetingTime} buttonStyle="solid" size="large">
                  <Radio.Button value={30}>30秒</Radio.Button>
                  <Radio.Button value={60}>60秒</Radio.Button>
                  <Radio.Button value={120}>120秒</Radio.Button>
                  <Radio.Button value={240}>240秒</Radio.Button>
                  <Radio.Button value={999}>999秒</Radio.Button>
                </Radio.Group>
              </div>
              <div css={radioContainerStyle}>
                <div css={radioButtonStyle}>
                  <label for="missionNum">ミッション数 <Tooltip title="１ターン毎のミッション数を設定してください。ミッション数を０にすると、PMはランダムに設定されます。" placement="top"><QuestionCircleOutlined /></Tooltip><br /></label>
                  <Radio.Group onChange={(e) => setMissionNum(e.target.value)} value={missionNum} buttonStyle="solid" size="large">
                    <Radio.Button value={0}>0</Radio.Button>
                    <Radio.Button value={1}>1</Radio.Button>
                    <Radio.Button value={2}>2</Radio.Button>
                    <Radio.Button value={3}>3</Radio.Button>
                  </Radio.Group>
                </div>
                <div css={radioButtonStyle}>
                  <label for="missionNum">コーディングターン数 <Tooltip title="１Day毎のコーディングターン数を設定してください。" placement="top"><QuestionCircleOutlined /></Tooltip><br /></label>
                  <Radio.Group onChange={(e) => setMaxCodingTurn(e.target.value)} value={maxCodingTurn} buttonStyle="solid" size="large">
                    <Radio.Button value={1}>1</Radio.Button>
                    <Radio.Button value={2}>2</Radio.Button>
                    <Radio.Button value={3}>3</Radio.Button>
                    <Radio.Button value={4}>4</Radio.Button>
                    <Radio.Button value={5}>5</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div css={radioButtonStyle}>
                <label for="maxDays">最大Day数 <Tooltip title="設定されたDay数を終えるか、コーディングが完了するかで勝敗が決します。追放されていないプレイヤーが２人になった時点で人狼の勝ちですので、設定できるDay数は（プレイヤー数 - 2）が最大となります。" placement="top"><QuestionCircleOutlined /></Tooltip><br /></label>
                <Radio.Group onChange={(e) => setMaxDays(e.target.value)} value={maxDays} buttonStyle="solid" size="large">
                  <Radio.Button value={"自動"}>自動</Radio.Button>
                  {[...Array(inputPlayerNum < 3 ? 0 : inputPlayerNum - 2)].map((_, i) => (
                    <Radio.Button value={i + 1}>{i + 1}</Radio.Button>
                  ))}
                  {[...Array(inputPlayerNum < 3 ? 6 : 8 - inputPlayerNum)].map((_, i) => (
                    <Radio.Button value={inputPlayerNum < 3 ? i + 1 : i - 1 + inputPlayerNum} disabled>{inputPlayerNum < 3 ? i + 1 : i - 1 + inputPlayerNum}</Radio.Button>
                  ))}
                </Radio.Group>
              </div>
              <div css={radioContainerStyle}>
                <div css={radioButtonStyle}>
                  <label for="jinrohNum">人狼数 <Tooltip title="「自動」に設定すると、プレイヤー数が４人以下なら１匹、プレイヤー数が５人以上なら２匹の人狼がランダムに設定されます。" placement="top"><QuestionCircleOutlined /></Tooltip><br /></label>
                  <Radio.Group onChange={(e) => setJinrohNum(e.target.value)} value={jinrohNum} buttonStyle="solid" size="large">
                    <Radio.Button value={"自動"}>自動</Radio.Button>
                    <Radio.Button value={1}>1</Radio.Button>
                    {playerNames.filter(name => name !== '').length < 5 ? (
                      <Radio.Button value={2} disabled>2</Radio.Button>
                    ) : (
                      <Radio.Button value={2}>2</Radio.Button>
                    )}
                  </Radio.Group>
                </div>
                <div css={radioButtonStyle}>
                  <label for="jinrohNum">順番シャッフル <Tooltip title="「ON」にすると、各ターン毎にプレイヤーの順番をシャッフルします。" placement="top"><QuestionCircleOutlined /></Tooltip><br /></label>
                  <Radio.Group onChange={(e) => setShufflePlayer(e.target.value)} value={shufflePlayer} buttonStyle="solid" size="large">
                    <Radio.Button value={true}>ON</Radio.Button>
                    <Radio.Button value={false}>OFF</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div css={radioButtonStyle}>
                <label for="jinrohNum">使用言語 <Tooltip title="問題で使用するプログラミング言語を選んでください。" placement="top"><QuestionCircleOutlined /></Tooltip><br /></label>
                <Radio.Group onChange={(e) => setLanguage(e.target.value)} value={language} buttonStyle="solid" size="large">
                  <Radio.Button value={"java"}>Java</Radio.Button>
                  <Radio.Button value={"python"} disabled>Python</Radio.Button>
                  <Radio.Button value={"C"} disabled>C</Radio.Button>
                  <Radio.Button value={"C++"} disabled>C++</Radio.Button>
                  <Radio.Button value={"Ruby"} disabled>Ruby</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div css={buttonContainerStyle}>
            <Button
              size="large"
              id="submit-button"
              className="btn-group"
              onClick={async () => {
                play();setTimeout(stop,900);
                if (isValidPlayers(playerNames)) {
                  const players = playerCalc(jinrohNum, usePlayerImage);
                  const gameObject = await createGameObject({ players: players, difficulty: difficulty, maxCodingTime: maxCodingTime, maxMeetingTime: maxMeetingTime, maxCodingTurn: maxCodingTurn, maxMissionNum: missionNum, maxDayNum: maxDays, jinrohNum: jinrohNum, isShuffle: shufflePlayer, language: language });
                  // console.log("ゲームオブジェクトは作れているよね？", gameObject);
                  // const gameObject = await createDummyGameObject(players);
                  await gameObjectfileWrite(gameObject);
                  console.log("終わってっか？？");
                  if (gameObject.initialPlayers.length < 3) {
                    handleQuestionPage();
                  } else {
                    handleConfirmPlayer();
                  }
                } else {
                  setErrorMessage("1人以上の有効なプレイヤー名を入力してください 同じプレイヤー名は使用できません");
                }
              }}
            >
              ゲーム開始
            </Button>
          </div>
        </div>
      </body >
    </>
  );
};
/**
 * 入力された名前をもとにプレイヤークラスのオブジェクトを返す
 * @returns プレイヤーたちのオブジェクト
 */
export const playerCalc = (jinrohNum, usePlayerImage) => {
  class Player {
    constructor(id, name, isJinroh, color, isAlive, isPM, imagePath) {
      this.id = id;
      this.name = name;
      this.isJinroh = isJinroh;
      this.color = color;
      this.isAlive = isAlive;
      this.isPM = isPM;
      this.yourMission = [];
      this.voted = 0;
      this.imagePath = imagePath;
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
    "olive",
    "navy",
    "red",
    "teal",
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
  if (jinrohNum !== "自動") {
    howManyJinroh = jinrohNum;
  } else if (howManyPlayers <= 4) {
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
    const imagePath = usePlayerImage[i] === 'OFF' ? "" : `https://avatars.githubusercontent.com/${playersName[i]}`;
    const player = new Player(
      i,
      playersName[i],
      isJinroh,
      colors[i],
      true,
      false,
      imagePath
    );
    players.push(player);
  }

  return players;
};

export const isValidPlayers = (playerNames) => {

  // 空白のみを検出する正規表現
  const whitespaceRegex = /^\s*$/;

  // すべての要素が空文字であるかを確認するためのフラグ
  let allEmpty = true;

  // プレイヤー名の重複チェック用のセット
  const nameSet = new Set();

  // forループで早期リターンを実現
  for (let i = 0; i < playerNames.length; i++) {
    const playerName = playerNames[i];

    // 空文字の場合はスキップし、次の要素を確認
    if (playerName === "") {
      continue;
    }

    // ここに来た時点で少なくとも1つは空文字ではない
    allEmpty = false;

    // 空白文字のみの場合はfalseを返す
    if (whitespaceRegex.test(playerName)) {
      return false;
    }

    // 同じプレイヤー名がすでにセットに存在する場合はfalseを返す
    if (nameSet.has(playerName) && playerName !== "") {
      return false;
    }

    // プレイヤー名をセットに追加
    nameSet.add(playerName);

    let nameLength = 0;

    for (let j = 0; j < playerName.length; j++) {
      if (playerName[j].match(/[ -~]/)) { // 半角文字の場合
        nameLength += 1;
      } else { // 全角文字の場合
        nameLength += 2;
      }
    }

    console.log(nameLength);
    if (nameLength > 20) {
      return false;
    }
  }

  // すべての要素が空文字の場合はfalseを返す
  if (allEmpty) {
    return false;
  }

  // すべてのバリデーションを通過した場合はtrueを返す
  return true;
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

export const createGameObject = async (GameOptions) => {
  let returnGameObject;
  // const playersObject = {
  //   players: Players,
  // };
  await fetch("/create-gameObject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(GameOptions),
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
  const answerCode = 'public static int countWords(String str){\n\t// 文字列がnullまたは空の場合、単語数は0 \n\tif (str == null || str.isEmpty()) { \n\t\treturn 0;\n\t} \n\t// 文字列をトリムして前後の空白を取り除く\n\tstr = str.trim(); \n\t// 文字列が再び空の場合（空白のみの文字列だった場合）、単語数は0 \n\tif (str.isEmpty()) { \n\t\treturn 0;\n\t} \n\t// 文字列をスペースで分割して単語の配列を作成\n\tString[] words = str.split("\\s+"); \n\t// 配列の長さを返す（これが単語数になる）\n\treturn words.length; \n}';

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