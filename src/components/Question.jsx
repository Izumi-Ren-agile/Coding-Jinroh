import { useNavigate } from "react-router-dom";
import "./concept.css";

export const Question = (props) => {
    //const { players, questionObject } = props;
    const navigate = useNavigate();

    const player1 = {
        id: 123456,
        name: "ikeda",
        isJinroh: false,
        color: "red",
        isAlive: true,
        isPM: false
    }

    const player2 = {
        id: 123456,
        name: "izumi",
        isJinroh: false,
        color: "blue",
        isAlive: true,
        isPM: false
    }

    const player3 = {
        id: 123456,
        name: "nishimura",
        isJinroh: true,
        color: "red",
        isAlive: true,
        isPM: false
    }

    const player4 = {
        id: 123456,
        name: "takahashi",
        isJinroh: false,
        color: "red",
        isAlive: true,
        isPM: false
    }

    const player5 = {
        id: 123456,
        name: "papa",
        isJinroh: false,
        color: "red",
        isAlive: true,
        isPM: false
    }

    const players = [
        player1,
        player2,
        player3,
        player4,
        player5
    ]

    const questionObject = {
        questionId: "",
        questionText: "以下の仕様を満たす countWords メソッドの作成\n 仕様： ・与えられた文字列に含まれる単語の数を数えるメソッド ・単語はスペースで区切られているものとする",
        initialCode: 'public class Main {     public static void main(String[] args) {         // テストケース         System.out.println(countWords("Hello world"));             // 出力: 2         System.out.println(countWords("Java is fun"));             // 出力: 3         System.out.println(countWords(" Count the words "));       // 出力: 3         System.out.println(countWords("This is a test"));          // 出力: 4         System.out.println(countWords("OneTwoThree"));             // 出力: 1     }      // 与えられた文字列に含まれる単語の数を数えるメソッド     public static int countWords(String str) {                  //ここに実装                       return null;     } }',
        answerCode: "bbbbbbbbbbbbb"
    }

    const handleGame = () => {

        const game = {
            gameId: "1234",
            questionId: questionObject.questionId,
            questionText: questionObject.questionText,
            initialCode: questionObject.initialCode,
            answerCode: questionObject.answerCode,
            players: players,
            editor: questionObject.initialCode,
            missions: [],
            nextMissionIndex: 0,
            presentDay: 1,
            maxDay: 4,
            gamePhase: "night",
            presentCodingTurn: 1,
            maxCodingTurn: 2,
            codingMaxStringNum: 2000,
            codingMaxTime: 60,
            meetingmaxTime: 120
        }

        //問題を設定

        navigate('/nightGame', {state: game}); //本当はDB保管
    }

    return (
        <div className="container">
            <header className="regular-header">
                <h1>コーディング人狼</h1>
            </header>
            <div className="main-content">
                <div className="text-center-content">
                    <p className="message message1">
                        課題
                    </p>
                    <p className="message message1">
                        { }
                    </p>
                    <p className="message message2">
                        コードを邪魔する人狼に気を付けながら、楽しいエンジニアライフを！
                    </p>
                </div>
                <button onClick={handleGame} className="btn-group concept-start-game">
                    ゲーム開始
                </button>
            </div>
        </div>
    );
};