import { useState, useEffect } from "react";
import swal from 'sweetalert2';
import { CodeEditor } from "../molecules/CodeEditor";
import { Console } from "../molecules/Console";
import { Project } from "../molecules/Project";
import { GameHeader } from "../organisms/GameHeader";
import { Content70 } from "../templates/Content70";
import { Contents } from "../templates/Contents";
// import { Compiler } from "../compile/CompilerAsMethod";
import { Tag } from "../molecules/Tag";
import { TabsOfCodeEditor } from "../molecules/TabsOfCodeEditor";
import useSound from 'use-sound';
import BGM from '../../sound/ks024.wav';
import Alert from '../../sound/alert.mp3';
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const Game = (props) => {
  const { gameObject, handleFinishTurn, code, handleChange, setTabCode, activeTab } = props;
  const [compiledCode, setCompiledCode] = useState("");
  const [stdout, setStdout] = useState(null); // コンパイルの標準出力
  const [buildStderr, setBuildStderr] = useState(null); // コンパイルのエラーメッセージ
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState(null); // エラーメッセージ
  const language = gameObject.codeLanguage; // 使用するプログラミング言語を"java"に設定
  const[isPlayBGM,setIsPlayBGM]=useState(false);
  const[isPlayAlert,setIsPlayAlert]=useState(false);

  const [playAlert, { stop:stopAlert, pause:pauseAlert}] = useSound(Alert, { volume: 1 ,interrupt:true});
  useEffect(()=>{
    if(isPlayAlert){
      playAlert();
    }else{
      stopAlert();
    }
  },[isPlayAlert])

  //勝敗判定
  const [isComplete, setIsComplete] = useState(false);

  // コンポーネントがマウントされたときに確認ダイアログを表示する
  useEffect(() => {
    if (gameObject.gamePhase === "night" && gameObject.startingTurn + gameObject.codingMaxTime > Math.floor(Date.now() / 1000)) {
      //setIsPlayAlert(true);
      swal.fire({
        title: `${gameObject.players[gameObject.presentPlayer].name}さん\nですか？`,
        text: '「はい」を押すとコーディングフェーズに進みます',
        icon: 'warning',
        confirmButtonText: 'はい',
        cancelButtonText: 'いいえ',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("はい押された？");
          setIsPlayBGM(true);// ここで音声を再生する
        } else {
          window.location.reload();
        }
      });
    } else if (gameObject.gamePhase === "daytime" && gameObject.startingTurn + gameObject.meetingmaxTime > Math.floor(Date.now() / 1000)) {
      const pmPlayer = gameObject.players.find(player => player.isPM);
      swal.fire({
        title: `今日のコーディングターンが\n終わりました！`,
        // text: `PMは、${pmPlayer.name}さんです！`,
        html: `PMは、<strong>${pmPlayer.name}</strong>さんです！`,
        imageUrl: `images/card-PM.png`,
        imageWidth: 400,
        imageHeight: 400,
        confirmButtonText: '会議を始める',
      }).then((result) => {
        if (!result.isConfirmed) {
          // ユーザーが「いいえ」をクリックした場合の処理
          window.location.reload();
        }
      });
    }

    // キーが押されたときに実行される関数
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        // Ctrl + Enterキーが押されたときに実行する処理
        handleRunCode();
      }
    };

    // windowオブジェクトにイベントリスナーを追加
    window.addEventListener('keydown', handleKeyPress);

    // コンポーネントがアンマウントされるときにクリーンアップ
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  //const compileResult = Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output; //なんかようわからんけどこの一文あったらPythonでの実行がうまくいく（変数自体は使ってない）

  const handleRunCode = async () => {
    setLoading(true); // ローディング状態を開始
    setError(null); // エラー状態をクリア
    const adjustedCode = "import java.util.*; import java.io.*; import java.lang.*; public class Main{" + gameObject.main + code + "}";
    console.log("調整されたコード", adjustedCode);
    try {
      const response = await fetch("/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, sourceCode: adjustedCode }), // 言語とソースコードをリクエストボディに含める
      });

      if (!response.ok) {
        // レスポンスが成功していない場合はエラーメッセージを取得
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "コンパイル中にエラーが発生しました"
        );
      }

      const result = await response.json(); // レスポンスをJSONとして解析
      console.log(result);
      console.log(code);
      setStdout(result.stdout); // 標準出力を設定
      setBuildStderr(result.buildStderr); // エラーメッセージを設定
    } catch (error) {
      setError(error); // エラーを設定
    } finally {
      setLoading(false); // ローディング状態を終了
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor:
          gameObject.gamePhase === "night" ? "#526D82" : "#ede4dd",
      }}
    >
      <GameHeader
        gameObject={gameObject}
        handleFinishTurn={handleFinishTurn}
        setIsPlayBGM={setIsPlayBGM}
      />
      {gameObject.property ? (
        <></>
      ) : (
        <Contents>
          <Content70>
            {console.log("コードの中何入ってんの？", code)}
            <Tag secondText={"あと〇文字"} colorMode={gameObject.gamePhase}>エディター <Tooltip title="プロジェクトに従って、実装を進めてください。メイン関数タブは編集することができません。" placement="top"><QuestionCircleOutlined /></Tooltip></Tag>
            {gameObject.gamePhase === "night" ? (
              <CodeEditor
                gameObject={gameObject}
                code={code}
                onChange={handleChange}
                handleRunCode={handleRunCode}
                loading={loading}
              />
            ) : (
              <TabsOfCodeEditor
                gameObject={gameObject}
                editorHistory={gameObject.editorHistory}
                onChange={handleChange}
                handleRunCode={handleRunCode}
                loading={loading}
                setTabCode={setTabCode}
                activeTab={activeTab}
              />
            )}
            <Tag secondText={""} colorMode={gameObject.gamePhase}>実行結果 <Tooltip title="実行ボタンを押すと実行結果が表示されます。入力例に対して、期待される出力を満たしていると、正誤判定が〇になります。" placement="top"><QuestionCircleOutlined /></Tooltip></Tag>
            {/* 通信エラー */}
            {error && <div>Error: {error.message}</div>}

            <Console
              consoleCode={
                stdout || (buildStderr && `\nErrors:\n${buildStderr}`) || ""
              }
            />
          </Content70>
          <Project question={gameObject.questionText.replace(/\\n/g, '\n')} secondText={""} gameObject={gameObject} />
        </Contents>
      )}
    </div>
  );
};
