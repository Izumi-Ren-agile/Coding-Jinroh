import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { CodeEditor } from './molecules/CodeEditor';
import { Tag } from './molecules/Tag';
import { Console } from './molecules/Console';
import { Project } from './molecules/Project';
import { Content70 } from './templates/Content70';
import { Content30 } from './templates/Content30';
import { Contents } from './templates/Contents';
import { Buttons } from './templates/Buttons';
import { Compiler } from './CompilerAsMethod';
import { Button } from "antd";
import './game.css'

export const NightGame = () => {
    const location = useLocation();
    const gameO = location.state; //DB
    const [game, setGame] = useState(gameO); //DB
    const [code, setCode] = useState(game.editor);
    const [compiledCode, setCompiledCode] = useState('');
    const navigate = useNavigate();

    console.log(location.state);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const handleRunCode = () => {
        setCompiledCode(code);
    };

    const handleFinishTurn = () => {
        if(game.presentPlayer < game.players.length-1){
            game.presentPlayer++;
        } else {
            game.presentPlayer = 0;
            if(game.presentCodingTurn < game.maxCodingTurn){
                game.presentCodingTurn++;
            } else {
                if(game.gamePhase === "night"){
                    game.gamePhase = "daytime";
                } else {
                    if(game.presentDay < game.maxDay){
                        game.presentDay++;
                        navigate('vote');
                    } else {
                        navigate('result');
                    }
                }
            }
        }
        setGame(state => { return {...game} });
        console.log(game);
    };

    const handleChange = (value) => {
        console.log(code);
        setCode(value);
        console.log(code);
    };

    return (
        <div className="container" style={{backgroundColor: game.gamePhase === "night" ? '#526D82' : 'white'}}>
            <div className="header">
                <div className="day-indicator">
                    <h1 style={{color: game.gamePhase === "night" ? 'white' : 'black'}}>Day {game.presentDay}</h1>
                    <p style={{color: game.gamePhase === "night" ? 'white' : 'black'}}>{game.gamePhase}</p>
                </div>
                <div className="players-container">
                    {game.players.map((player, index) => (
                        <div className="player" key={index} id={`player${index}`}>{player.name}</div>
                    ))}
                </div>
                <div className="timer">
                    <p id="timer">16秒</p>
                </div>
            </div>
            <Contents>
                <Content70>
                    <Tag secondText={"あと〇文字"}>editor</Tag>
                    <CodeEditor code={code} onChange={handleChange} />
                    <Buttons>
                        <Button type="primary" onClick={handleRunCode}>Run</Button>
                        <Button type="primary" onClick={handleFinishTurn}>Finish</Button>
                    </Buttons>
                    <Tag secondText={""}>console</Tag>
                    <Console consoleCode={Compiler({language:"java", sourceCode:compiledCode}).output ? Compiler({language:"java", sourceCode:compiledCode}).output : Compiler({language:"java", sourceCode:compiledCode}).buildErrors} />
                </Content70>
                <Content30>
                    <Tag secondText={""}>project</Tag>
                    <Project question={game.questionText} />
                </Content30>
            </Contents>
            <script src="hedder.js"></script>
        </div>
    );
};