import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import { CodeEditor } from './CodeEditor';
import { Compiler } from './CompilerAsMethod';
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
            <div className="contents">
                <div className="contents-left">
                    <div className="rectangle8">
                        <div className="rectangle8-content1">
                            <div className="editor-text">Editor</div>
                            <div className="remaining-text">あと〇文字</div>
                        </div>
                    </div>
                    <div className="editor-container">
                        <CodeEditor code={code} onChange={handleChange} />
                    </div>
                    <div className="controls">
                        <button id="run" onClick={handleRunCode}>Run</button>
                        <button id="finish" onClick={handleFinishTurn}>Finish</button>
                    </div>
                    <div className="rectangle9">
                        <div className="rectangle9-content">console</div>
                    </div>
                    <div className="console-container">
                        <div className="console">
                            <pre id="console">{consoleCode}</pre>
                        </div>
                    </div>
                </div>
                <div className="contents-right">
                    <div className="right-container">
                        <p>Project</p>
                    </div>
                    <div className="project-description">
                        <p>〇〇君<br />急遽のプロジェクトで申し訳ない。クライアントの仕様書通り、以下のメソッドを今日中に納品してほしい。<br /><br />{game.questionText}<br /><br />よろしく頼む。<br /><br />〇〇課長</p>
                    </div>
                </div>
            </div>
            <script src="hedder.js"></script>
        </div>
    );
};