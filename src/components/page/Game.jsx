import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { CodeEditor } from '../molecules/CodeEditor';
import { Console } from '../molecules/Console';
import { Project } from '../molecules/Project';
import { GameHedder } from '../organisms/GameHedder';
import { Content70 } from '../templates/Content70';
import { Contents } from '../templates/Contents';
import { Compiler } from "../compile/CompilerAsMethod";
import { Tag } from '../molecules/Tag';
import { TabsOfCodeEditor } from '../molecules/TabsOfCodeEditor';

export const Game = (props) => {
    const { gameObject, handleFinishTurn, code, handleChange } = props;
    // const [code, setCode] = useState('');
    const [compiledCode, setCompiledCode] = useState('');
    // const [yourMission, setYourMission] = useState([]);
    // const [isConfirmed, setIsConfirmed] = useState(false);
    // const [presentPlayerIndex, setPresentPlayerIndex] = useState(0);
    // const navigate = useNavigate();

    // const gameObjectfileRead = () => {
    //     fetch("/read-gameObject")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (gameObject.property === "default") {
    //                 setGameObject(data);
    //                 console.log("data-read", data);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    // useEffect(() => {
    //     gameObjectfileRead();
    //     console.log("use-Effect");
    // }, []);

    // useEffect(() => {
    //     console.log("ゲームオブジェクト:", gameObject);
    // }, [gameObject]);

    // useEffect(() => {
    //     if (!gameObject.property) {
    //         console.log(gameObject.players[gameObject.presentPlayer].yourMission.length);
    //         while (gameObject.players[gameObject.presentPlayer].yourMission.length < gameObject.maxMissionNum) {
    //             console.log('bb')
    //             gameObject.players[gameObject.presentPlayer].yourMission.push(gameObject.missions[gameObject.nextMissionIndex]);
    //             gameObject.nextMissionIndex++;
    //             setGameObject(gameObject);
    //         }
    //     }
    // }, [gameObject]);

    // useEffect(() => {
    //     if (gameObject.presentPlayer !== presentPlayerIndex) {
    //         setPresentPlayerIndex(gameObject.presentPlayer);
    //     }

    // }, [gameObject])

    // コンポーネントがマウントされたときに確認ダイアログを表示する
    useEffect(() => {
        let ignore = false;
        const showConfirmationDialog = async () => {
            const confirmed = window.confirm(gameObject.gamePhase === "night" ? `${gameObject.players[gameObject.presentPlayer].name}さんですか？` : "会議を始めますか？");
            if (!confirmed) {
                showConfirmationDialog();
            }
        };

        if (!ignore) {
            showConfirmationDialog();
        }
        return () => {
            ignore = true
        }
    }, []);

    //const compileResult = Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output; //なんかようわからんけどこの一文あったらPythonでの実行がうまくいく（変数自体は使ってない）

    const handleRunCode = () => {
        setCompiledCode(code);
    };

    // const handleFinishTurn = () => {

    //     if (gameObject.gamePhase === "night") {
    //         gameObject.editorHistory = [...gameObject.editorHistory, { name: `day${gameObject.presentDay} ${gameObject.players[gameObject.presentPlayer].name}`, code: code }]
    //     }

    //     if (gameObject.presentPlayer < gameObject.players.length - 1) {
    //         gameObject.presentPlayer++;
    //     } else {
    //         if (gameObject.presentCodingTurn < gameObject.maxCodingTurn) {
    //             gameObject.presentPlayer = 0;
    //             gameObject.presentCodingTurn++;
    //         } else {
    //             if (gameObject.gamePhase === "night") {
    //                 gameObject.gamePhase = "daytime";
    //             } else {
    //                 gameObject.presentPlayer = 0;
    //                 if (gameObject.presentDay < gameObject.maxDay) {
    //                     gameObject.presentDay++;
    //                     navigate('/vote');
    //                 } else {
    //                     navigate('/vote');
    //                 }
    //             }
    //         }
    //     }
    //     setGameObject(state => { return { ...gameObject } });
    //     console.log(gameObject);
    // };

    // const handleChange = (value) => {
    //     setCode(value);
    // };

    return (
        <div className="container" style={{ backgroundColor: gameObject.gamePhase === "night" ? '#526D82' : '#ede4dd' }}>
            <GameHedder gameObject={gameObject} handleFinishTurn={handleFinishTurn} yourMission={gameObject.players[gameObject.presentPlayer].yourMission} />
            {gameObject.property ? (<></>) : (
                <Contents>
                    <Content70>
                        <Tag secondText={"あと〇文字"}>エディター</Tag>
                        {gameObject.gamePhase === "night" ? (
                            <CodeEditor code={code} onChange={handleChange} handleRunCode={handleRunCode} />) : (<TabsOfCodeEditor editorHistory={gameObject.editorHistory} onChange={handleChange} handleRunCode={handleRunCode} />)}
                        <Tag secondText={""}>実行結果</Tag>
                        <Console consoleCode={Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output ? Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output : Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).buildErrors ? Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).buildErrors : ''} />
                    </Content70>
                    <Project question={gameObject.questionText} secondText={""} />
                </Contents>
            )}
        </div>
    );
};