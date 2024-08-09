import React from 'react';
import { useState, useEffect } from "react";
import swal from 'sweetalert2';
import { Console } from "../molecules/Console";
import { Project } from "../molecules/Project";
import { GameHeader } from "../organisms/GameHeader";
import { Content70 } from "../templates/Content70";
import { Contents } from "../templates/Contents";
import { Tag } from "../molecules/Tag";
import { TabsOfCodeEditor } from "../molecules/TabsOfCodeEditor";

export const Result = (props) => {
    const { gameObject, handleFinishTurn, code, handleChange, setTabCode, activeTab } = props;
    const [compiledCode, setCompiledCode] = useState("");
    const [stdout, setStdout] = useState(null); // コンパイルの標準出力
    const [buildStderr, setBuildStderr] = useState(null); // コンパイルのエラーメッセージ
    const [loading, setLoading] = useState(false); // ローディング状態
    const [error, setError] = useState(null); // エラーメッセージ
    const language = gameObject.codeLanguage; // 使用するプログラミング言語を"java"に設定

    // コンポーネントがマウントされたときに確認ダイアログを表示する
    useEffect(() => {
        swal.fire({
            title: `勝敗が決しました！`,
            text: '勝ったのは．．．',
            icon: 'success',
            confirmButtonText: '結果を見る',
        });
        swal.fire({
            title: `${gameObject.gameResult === "citizen" ? "市民" : "人狼"}の勝利！`,
            confirmButtonText: 'ゲームを振り返る',
        });
    }, []);

    const handleRunCode = async () => {
        setLoading(true); // ローディング状態を開始
        setError(null); // エラー状態をクリア

        try {
            const response = await fetch("/compile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ language, sourceCode: code }), // 言語とソースコードをリクエストボディに含める
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
        <div className="container" style={{ backgroundColor: "#526D82" }}>
            <GameHeader gameObject={gameObject}
                handleFinishTurn={handleFinishTurn}
            />
            <Contents>
                <Content70>
                <Tag secondText={"あと〇文字"}>エディター</Tag>
                    <TabsOfCodeEditor
                gameObject={gameObject}
                editorHistory={gameObject.editorHistory}
                onChange={handleChange}
                handleRunCode={handleRunCode}
                loading={loading}
                setTabCode={setTabCode}
                activeTab={activeTab}
                    />
                    <Tag secondText={""}>実行結果</Tag>
                    {/* 通信エラー */}
                    {error && <div>Error: {error.message}</div>}

                    <Console
                        consoleCode={
                            stdout || (buildStderr && `\nErrors:\n${buildStderr}`) || ""
                        }
                    />
                </Content70>
                <Project question={gameObject.questionText.replace(/\\n/g, '\n')} secondText={""} gameObject={gameObject}/>
            </Contents>
        </div >
    );
};