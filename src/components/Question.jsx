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
        questionText: '以下の仕様を満たす countWords メソッドの作成\n 仕様：\n\<br /> ・与えられた文字列に含まれる単語の数を数えるメソッド ・単語はスペースで区切られているものとする',
        initialCode: 'public class Main {\npublic static void main(String[] args) {\n        // テストケース\n        System.out.println(countWords("Hello world"));             // 出力: 2\n        System.out.println(countWords("Java is fun"));             // 出力: 3\n        System.out.println(countWords(" Count the words "));       // 出力: 3\n        System.out.println(countWords("This is a test"));          // 出力: 4\n        System.out.println(countWords("OneTwoThree"));             // 出力: 1\n    }\n\n    // 与えられた文字列に含まれる単語の数を数えるメソッド\n    public static int countWords(String str) {\n        // 文字列がnullまたは空の場合、単語数は0\n        if (str == null || str.isEmpty()) {\n            return 0;\n        }\n        \n        // 文字列をトリムして前後の空白を取り除く\n        str = str.trim();\n\n        // 文字列が再び空の場合（空白のみの文字列だった場合）、単語数は0\n        if (str.isEmpty()) {\n            return 0;\n        }\n        \n        // 文字列をスペースで分割して単語の配列を作成\n        String[] words = str.split("\\s+");\n\n        // 配列の長さを返す（これが単語数になる）\n        return words.length;\n}\n}\n\n',
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
            presentPlayer: 0,
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

        navigate('/voteResult', {state: game}); //本当はDB保管
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