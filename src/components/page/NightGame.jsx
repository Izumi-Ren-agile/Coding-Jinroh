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

export const NightGame = () => {
    const location = useLocation();
    const gameO = location.state; //DB
    const [gameObject, setGameObject] = useState(gameO); //DB
    const [code, setCode] = useState(gameObject.editor);
    const [compiledCode, setCompiledCode] = useState('');
    const [yourMission, setYourMission] = useState([]);
    const navigate = useNavigate();

    console.log(gameObject.nextMissionIndex);

    useEffect(() => {
        console.log(gameObject.players[gameObject.presentPlayer].yourMission.length);
        while (gameObject.players[gameObject.presentPlayer].yourMission.length < gameObject.maxMissionNum) {
            console.log('bb')
            gameObject.players[gameObject.presentPlayer].yourMission.push(gameObject.missions[gameObject.nextMissionIndex]);
            gameObject.nextMissionIndex++;
            setGameObject(gameObject);
        }
    }, [gameObject]);

    const compileResult = Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output; //なんかようわからんけどこの一文あったらPythonでの実行がうまくいく（変数自体は使ってない）

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const handleRunCode = () => {
        setCompiledCode(code);
    };

    const handleFinishTurn = () => {

        if (gameObject.gamePhase === "night") {
            gameObject.editorHistory = [...gameObject.editorHistory, { name: `day${gameObject.presentDay} ${gameObject.players[gameObject.presentPlayer].name}`, code: code }]
        }

        if (gameObject.presentPlayer < gameObject.players.length - 1) {
            gameObject.presentPlayer++;
        } else {
            if (gameObject.presentCodingTurn < gameObject.maxCodingTurn) {
                gameObject.presentPlayer = 0;
                gameObject.presentCodingTurn++;
            } else {
                if (gameObject.gamePhase === "night") {
                    gameObject.gamePhase = "daytime";
                } else {
                    gameObject.presentPlayer = 0;
                    if (gameObject.presentDay < gameObject.maxDay) {
                        gameObject.presentDay++;
                        navigate('/result', {state: gameObject});
                    } else {
                        navigate('/result');
                    }
                }
            }
        }
        setGameObject(state => { return { ...gameObject } });
        console.log(gameObject);
    };

    const handleChange = (value) => {
        console.log(code);
        setCode(value);
        console.log(code);
    };



    return (
        <div className="container" style={{ backgroundColor: gameObject.gamePhase === "night" ? '#526D82' : 'white' }}>
            <GameHedder gameObject={gameObject} handleFinishTurn={handleFinishTurn} yourMission={yourMission} />
            <Contents>
                <Content70>
                    <Tag secondText={"あと〇文字"}>エディター</Tag>
                    <CodeEditor code={code} onChange={handleChange} handleRunCode={handleRunCode} />
                    <Tag secondText={""}>実行結果</Tag>
                    <Console consoleCode={Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output ? Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output : Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).buildErrors ? Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).buildErrors : ''} />
                </Content70>
                <Project question={gameObject.questionText} secondText={""} />
            </Contents>
            <script src="hedder.js"></script>
        </div>
    );
};