import { useState, useEffect } from "react";
import { CodeEditor } from "../molecules/CodeEditor";
import { Console } from "../molecules/Console";
import { Project } from "../molecules/Project";
import { GameHeader } from "../organisms/GameHeader";
import { Content70 } from "../templates/Content70";
import { Contents } from "../templates/Contents";
// import { Compiler } from "../compile/CompilerAsMethod";
import { Tag } from "../molecules/Tag";
import { TabsOfCodeEditor } from "../molecules/TabsOfCodeEditor";

export const Game = (props) => {
  const { gameObject, handleFinishTurn, code, handleChange } = props;
  console.log("initialcode",code);
  const [compiledCode, setCompiledCode] = useState("");
  const [stdout, setStdout] = useState(null); // コンパイルの標準出力
  const [buildStderr, setBuildStderr] = useState(null); // コンパイルのエラーメッセージ
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState(null); // エラーメッセージ
  const language  = gameObject.codeLanguage; // 使用するプログラミング言語を"java"に設定
//   const [sourceCode, setSourceCode] = useState(code)


  // コンポーネントがマウントされたときに確認ダイアログを表示する
  useEffect(() => {
    const showConfirmationDialog = async () => {
      const confirmed = window.confirm(
        gameObject.gamePhase === "night"
          ? `${gameObject.players[gameObject.presentPlayer].name}さんですか？`
          : "会議を始めますか？"
      );
      if (!confirmed) {
        showConfirmationDialog();
      }
    };
    showConfirmationDialog();
  }, []);

  //const compileResult = Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output; //なんかようわからんけどこの一文あったらPythonでの実行がうまくいく（変数自体は使ってない）

//   const handleRunCode = () => {
//     setCompiledCode(code);
//   };

  const handleRunCode = async () => {
    setLoading(true); // ローディング状態を開始
    setError(null); // エラー状態をクリア

    try {
      const response = await fetch("/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({language, sourceCode: code}) // 言語とソースコードをリクエストボディに含める
      });

      if (!response.ok) {
        // レスポンスが成功していない場合はエラーメッセージを取得
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "コンパイル中にエラーが発生しました");
      }

      const result = await response.json(); // レスポンスをJSONとして解析
      console.log(result)
      console.log(code)
      setStdout(result.stdout); // 標準出力を設定
      setBuildStderr(result.buildStderr); // エラーメッセージを設定

    } catch (error) {
      setError(error); // エラーを設定
    } finally {
      setLoading(false); // ローディング状態を終了
    }
  };


  return (
    // <div className="container" style={{ backgroundColor: gameObject.gamePhase === "night" ? '#526D82' : '#ede4dd' }}>
    //     <GameHeader gameObject={gameObject} handleFinishTurn={handleFinishTurn} yourMission={gameObject.players[gameObject.presentPlayer].yourMission} />
    //     {gameObject.property ? (<></>) : (
    //         <Contents>
    //             <Content70>
    //                 <Tag secondText={"あと〇文字"}>エディター</Tag>
    //                 {gameObject.gamePhase === "night" ? (
    //                     <CodeEditor code={code} onChange={handleChange} handleRunCode={handleRunCode} />) : (<TabsOfCodeEditor editorHistory={gameObject.editorHistory} onChange={handleChange} handleRunCode={handleRunCode} />)}
    //                 <Tag secondText={""}>実行結果</Tag>
    //                 <Console consoleCode={Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output ? Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output : Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).buildErrors ? Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).buildErrors : ''} />
    //             </Content70>
    //             <Project question={gameObject.questionText} secondText={""} />
    //         </Contents>
    //     )}
    // </div>

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
        yourMission={gameObject.players[gameObject.presentPlayer].yourMission}
      />
      {gameObject.property ? (
        <></>
      ) : (
        <Contents>
          <Content70>
            <Tag secondText={"あと〇文字"}>エディター</Tag>
            {gameObject.gamePhase === "night" ? (
              <CodeEditor
                code={code}
                onChange={handleChange}
                // onChange={(e) => setSourceCode(e.target.value)}
                handleRunCode={handleRunCode}
                loading = {loading}
              />
            ) : (
              <TabsOfCodeEditor
                editorHistory={gameObject.editorHistory}
                onChange={handleChange}
                handleRunCode={handleRunCode}
              />
            )}
            <Tag secondText={""}>実行結果</Tag>
            {/* 通信エラー */}
            {error && <div>Error: {error.message}</div>}

            <Console
              consoleCode={stdout || (buildStderr && `\nErrors:\n${buildStderr}`)||""}
            />
          </Content70>
          <Project question={gameObject.questionText} secondText={""} />
        </Contents>
      )}
    </div>
  );
};
