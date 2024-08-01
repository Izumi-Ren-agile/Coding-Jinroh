import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { CodeEditor } from './molecules/CodeEditor';
import { Tag } from './molecules/Tag';
import { Console } from './molecules/Console';
import { Project } from './molecules/Project';
import { GameHedder } from './organisms/GameHedder';
import { Content70 } from './templates/Content70';
import { Content30 } from './templates/Content30';
import { Contents } from './templates/Contents';
import { Compiler } from './CompilerAsMethod';
import './game.css'

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
        console.log(gameObject);
        while(gameObject.players[gameObject.presentPlayer].yourMission.length !== gameObject.maxMissionNum){
            gameObject.players[gameObject.presentPlayer].yourMission.push(gameObject.missions[gameObject.nextMissionIndex]);
            gameObject.nextMittionIndex++;
            setGameObject(gameObject);
        }
        setGameObject(gameObject);
    }, [gameObject]);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const handleRunCode = () => {
        setCompiledCode(code);
    };

    const handleFinishTurn = () => {

        if(gameObject.gamePhase === "night"){
            gameObject.editorHistory = [ ...gameObject.editorHistory, {name: `day${gameObject.presentDay} ${gameObject.players[gameObject.presentPlayer].name}`, code: code}]
        }

        if(gameObject.presentPlayer < gameObject.players.length-1){
            gameObject.presentPlayer++;
        } else {
            gameObject.presentPlayer = 0;
            if(gameObject.presentCodingTurn < gameObject.maxCodingTurn){
                gameObject.presentCodingTurn++;
            } else {
                if(gameObject.gamePhase === "night"){
                    gameObject.gamePhase = "daytime";
                } else {
                    if(gameObject.presentDay < gameObject.maxDay){
                        gameObject.presentDay++;
                        navigate('/vote');
                    } else {
                        navigate('/result');
                    }
                }
            }
        }
        setGameObject(state => { return {...gameObject} });
        console.log(gameObject);
    };

    const handleChange = (value) => {
        console.log(code);
        setCode(value);
        console.log(code);
    };

    return (
        <div className="container" style={{backgroundColor: gameObject.gamePhase === "night" ? '#526D82' : 'white'}}>
            <GameHedder gameObject={gameObject} handleFinishTurn={handleFinishTurn} yourMission={yourMission}/>
            <Contents>
                <Content70>
                    <Tag secondText={"あと〇文字"}>エディター</Tag>
                    <CodeEditor code={code} onChange={handleChange} handleRunCode={handleRunCode}/>
                    <Tag secondText={""}>実行結果</Tag>
                    <Console consoleCode={Compiler({language:"java", sourceCode:compiledCode}).output ? Compiler({language:"java", sourceCode:compiledCode}).output : Compiler({language:"java", sourceCode:compiledCode}).buildErrors} />
                </Content70>
                <Content30>
                    <Tag secondText={""}>プロジェクト</Tag>
                    <Project question={gameObject.questionText} />
                </Content30>
            </Contents>
            <script src="hedder.js"></script>
        </div>
    );
};