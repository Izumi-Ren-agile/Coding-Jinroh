import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { CodeEditor } from './CodeEditor';
import { Tag } from './molecules/Tag';
import { Content70 } from './templates/Content70';
import { Content30 } from './templates/Content30';
import { Contents } from './templates/Contents';
import { Compiler } from './compile/CompilerAsMethod';
import { Button } from "antd";
import './game.css'

export const NightGame = () => {
    const [code, setCode] = useState("");
    const [consoleCode, setConsoleCode] = '';
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.state);

    const game = location.state;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const handleRunCode = () => {
        const conpiledCode = Compiler({
            language: "Java",
            sourceCode: code
        });

        setConsoleCode(conpiledCode);
    };

    const handleFinishTurn = () => {
        // Logic to finish the turn
    };

    const handleChange = (value) => {
        setCode(value);
    };

    return (
        <div className="container">
            <div className="header">
                <div className="day-indicator">
                    <h1>Day {game.presentDay}</h1>
                    <p>{game.gamePhase}</p>
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
                    <div className="controls">
                        <Button id="run" onClick={handleRunCode}>Run</Button>
                        <button id="finish" onClick={handleFinishTurn}>Finish</button>
                    </div>
                    <Tag secondText={""}>console</Tag>
                    <div className="console-container">
                        <div className="console">
                            <pre id="console">{consoleCode}</pre>
                        </div>
                    </div>
                </Content70>
                <Content30>
                    <Tag secondText={""}>project</Tag>
                    <div className="project-description">
                        <p>〇〇君<br />急遽のプロジェクトで申し訳ない。クライアントの仕様書通り、以下のメソッドを今日中に納品してほしい。<br /><br />{game.questionText}<br /><br />よろしく頼む。<br /><br />〇〇課長</p>
                    </div>
                </Content30>
            </Contents>
            <script src="hedder.js"></script>
        </div>
    );
};