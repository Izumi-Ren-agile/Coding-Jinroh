import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import './game.css'

export const NightGame = () => {
    

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const navigate = useNavigate()

    const question = {
        questionId: "",
        questionText: "以下の仕様を満たす countWords メソッドの作成\n 仕様： ・与えられた文字列に含まれる単語の数を数えるメソッド ・単語はスペースで区切られているものとする",
        initialCode: 'public class Main {     public static void main(String[] args) {         // テストケース         System.out.println(countWords("Hello world"));             // 出力: 2         System.out.println(countWords("Java is fun"));             // 出力: 3         System.out.println(countWords(" Count the words "));       // 出力: 3         System.out.println(countWords("This is a test"));          // 出力: 4         System.out.println(countWords("OneTwoThree"));             // 出力: 1     }      // 与えられた文字列に含まれる単語の数を数えるメソッド     public static int countWords(String str) {                  //ここに実装                       return null;     } }',
        answerCode: '',
        input1: '',
        output1: ''
    }

    const initGame = {
        gameId: "",
        question: question,
        players: ["1a", "2b", "3", "4", "5", "6", "7"],
        editor: "",
        missions: [],
        nextMission: "",
        presentDay: 1,
        maxDay: 4,
        gamePhase: "night",
        presentCodingTurn: 1,
        maxCodingTurn: 2,
        codingMaxStringNum: 2000,
        codingMaxTime: 60,
        meetingmaxTime: 120
    }
    const [game, setGame] = useState(initGame);
    const [code, setCode] = useState(game.question.initialCode);

    const handleRunCode = () => {
        // Logic to run the code
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
                        <div className="player" key={index} id={`player${index}`}>{player}</div>
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
                        <CodeMirror
                            id="editor"
                            className="editor"
                            value={code}
                            extensions={[javascript(), oneDark]}
                            onChange={(value) => handleChange(value)}
                        />
                    </div>
                    <div className="controls">
                        <button id="run">Run</button>
                        <button id="finish">Finish</button>
                    </div>
                    <div className="rectangle9">
                        <div className="rectangle9-content">console</div>
                    </div>
                    <div className="console-container">
                        <div className="console">
                            <pre id="console"></pre>
                        </div>
                    </div>
                </div>
                <div className="contents-right">
                    <div className="right-container">
                        <p>Project</p>
                    </div>
                    <div className="project-description">
                        <p>〇〇君<br />急遽のプロジェクトで申し訳ない。クライアントの仕様書通り、以下のメソッドを今日中に納品してほしい。<br /><br />{game.question.questionText}<br /><br />よろしく頼む。<br /><br />〇〇課長</p>
                    </div>
                </div>
            </div>
            <script src="hedder.js"></script>
        </div>
    );
};