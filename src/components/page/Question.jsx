import { useNavigate } from "react-router-dom";
import "./concept.css";

export const Question = (props) => {
    //const { players, questionObject } = props;
    const navigate = useNavigate();

    const missionContent0 = {
        mission: "文字列\n\'int0'\n\を含めろ！",
        arg: "int"
    }

    const missionContent1 = {
        mission: "文字列\n\'int'\n\を含めろ！",
        arg: "int"
    }

    const missionContent2 = {
        mission: "文字列\n\'int2'\n\を含めろ！",
        arg: "int"
    }

    const player1 = {
        id: 123456,
        name: "ikeda",
        isJinroh: false,
        color: "lime",
        //isAlive: true,
        isPM: false,
        yourMission: [missionContent0],//初期値はから配列でOK
        voted:0,
        imagePath:'/images/image'
    }

    const player2 = {
        id: 123456,
        name: "izumi",
        isJinroh: false,
        color: "pink",
        isAlive: true,
        isPM: false,
        yourMission: [missionContent1, missionContent2, missionContent2],
        voted:0,
        solvedMissionNum: 0
    }

    const player3 = {
        id: 123456,
        name: "nishimura",
        isJinroh: true,
        color: "aqua",
        isAlive: true,
        isPM: false,
        yourMission: [missionContent1, missionContent1, missionContent2],
        voted:0,
        solvedMissionNum: 0
    }

    const player4 = {
        id: 123456,
        name: "takahashi",
        isJinroh: false,
        color: "purple",
        isAlive: true,
        isPM: false,
        yourMission: [],
        voted:0,
        solvedMissionNum: 0
    }

    const player5 = {
        id: 123456,
        name: "papa",
        isJinroh: false,
        color: "yellow",
        isAlive: true,
        isPM: false,
        yourMission: [],
        voted:0,
        solvedMissionNum: 0
    }

    const player6 = {
        id: 123456,
        name: "papa",
        isJinroh: false,
        color: "orange",
        isAlive: true,
        isPM: false,
        yourMission: [],
        voted:0,
        solvedMissionNum: 0
    }

    const players = [
        player1,
        player2,
        player3,
        player4,
        player5
    ]

    const nowplayers = [
        player1,
        player2,
        player3,
        player4,
        player5,
        player6
    ]

    const questionObject = {
        questionId: "",
        questionText: '以下の仕様を満たす countWords メソッドの作成\n 仕様：\n\<br /> ・与えられた文字列に含まれる単語の数を数えるメソッド ・単語はスペースで区切られているものとする',
        initialCode: 'public class Main {\npublic static void main(String[] args) {\n        // テストケース\n        System.out.println(countWords("Hello world"));             // 出力: 2\n        System.out.println(countWords("Java is fun"));             // 出力: 3\n        System.out.println(countWords(" Count the words "));       // 出力: 3\n        System.out.println(countWords("This is a test"));          // 出力: 4\n        System.out.println(countWords("OneTwoThree"));             // 出力: 1\n    }\n\n    // 与えられた文字列に含まれる単語の数を数えるメソッド\n    public static int countWords(String str) {\n        // 文字列がnullまたは空の場合、単語数は0\n        if (str == null || str.isEmpty()) {\n            return 0;\n        }\n        \n        // 文字列をトリムして前後の空白を取り除く\n        str = str.trim();\n\n        // 文字列が再び空の場合（空白のみの文字列だった場合）、単語数は0\n        if (str.isEmpty()) {\n            return 0;\n        }\n        \n        // 文字列をスペースで分割して単語の配列を作成\n        String[] words = str.split("\\s+");\n\n        // 配列の長さを返す（これが単語数になる）\n        return words.length;\n}\n}\n\n',
        answerCode: "bbbbbbbbbbbbb"
    }

    const questionObjectPy = {
        questionId: "",
        questionText: '以下の仕様を満たす countWords メソッドの作成\n 仕様：\n\<br /> ・与えられた文字列に含まれる単語の数を数えるメソッド ・単語はスペースで区切られているものとする',
        initialCode: 'print(10)\n',
        answerCode: "bbbbbbbbbbbbb"
    }

    



    const missionContent3 = {
        mission: "文字列\n'int3'\nを含めろ！",
        arg: "int"
    }

    const missionContent4 = {
        mission: "文字列\n'int4'\nを含めろ！",
        arg: "int"
    }

    const missionContent5 = {
        mission: "文字列\n'int5'\nを含めろ！",
        arg: "int"
    }

    let missions = [missionContent1, missionContent2, missionContent3, missionContent4,  missionContent5];

    missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4,  missionContent5];

    missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4,  missionContent5];

    missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4,  missionContent5];

    missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4,  missionContent5];

    const handleGame = () => {

        const game = {
            gameId: "1234",
            questionId: questionObject.questionId,
            questionText: questionObject.questionText,
            initialCode: questionObject.initialCode,
            answerCode: questionObject.answerCode,
            initialPlayers: players,
            players: nowplayers,
            presentPlayer: 0,
            editor: questionObject.initialCode,
            editorHistory: [{name: "初期コード", code: questionObject.initialCode}],
            missions: missions,
            nextMissionIndex: 0,
            presentDay: 0,
            maxDay: 4,
            gamePhase: "confirmRole",
            presentCodingTurn: 1,
            maxCodingTurn: 2,
            codingMaxStringNum: 2000,
            codingMaxTime: 60,
            meetingmaxTime: 120,
            isRandom: false,
            maxMissionNum: 3,
            codeLanguage: "java"
        }

        const gamePy = {...game};

        gamePy.initialCode = questionObjectPy.initialCode;
        gamePy.editor = questionObjectPy.initialCode;
        gamePy.codeLanguage = "python3";


        //問題を設定

        navigate('/gamePage');
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