import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Load } from '../page/Load';
import { Game } from "../page/Game";

export const GamePage = () => {
    const [gameObject, setGameObject] = useState({ property: "default" });
    const [isLoad, setIsLoad] = useState(false); //useLoad
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const gameObjectfileRead = () => {
        console.log(gameObject)
        fetch("/read-gameObject")
            .then((response) => response.json())
            .then((data) => {
                setGameObject(data);
                setIsLoad(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const gameObjectfileWrite = (object) => {
        fetch("/write-gameObject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
        })
            .then((response) => response.text())
            .then((data) => { console.log(data); })
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        setTimeout(gameObjectfileRead, 10);
        console.log("aaaaaaaaa", gameObject);
    }, [isLoad]);

    useEffect(() => {
        console.log("ゲームオブジェクト:", gameObject);
        if (!gameObject.property) {
            gameObject.players.map((player) => {
                while (player.yourMission.length < gameObject.maxMissionNum) {
                    player.yourMission.push(gameObject.missions[gameObject.nextMissionIndex]);
                    gameObject.nextMissionIndex++;
                    console.log(gameObject.nextMissionIndex);
                    setGameObject(gameObject);
                }
                gameObjectfileWrite(gameObject); //書き込み
            })
            setCode(gameObject.editor);
        }
    }, [gameObject]);

    const handleFinishTurn = () => {
        setIsLoad(false);

        if (gameObject.gamePhase === "night") {
            gameObject.editor = code;
            gameObject.editorHistory = [...gameObject.editorHistory, { name: `day${gameObject.presentDay}-${gameObject.presentCodingTurn} ${gameObject.players[gameObject.presentPlayer].name}`, code: code }]
        }

        if (gameObject.presentPlayer < gameObject.players.length - 1) {
            gameObject.presentPlayer++;
            gameObjectfileWrite(gameObject); //書き込み
        } else {
            if (gameObject.presentCodingTurn < gameObject.maxCodingTurn) {
                gameObject.presentPlayer = 0;
                gameObject.presentCodingTurn++;
                gameObjectfileWrite(gameObject); //書き込み
            } else {
                if (gameObject.gamePhase === "night") {
                    gameObject.gamePhase = "daytime";
                    gameObjectfileWrite(gameObject); //書き込み
                } else {
                    gameObject.presentPlayer = 0;
                    if (gameObject.presentDay < gameObject.maxDay) {
                        gameObject.presentDay++;
                        gameObjectfileWrite(gameObject); //書き込み
                        navigate('/votePage');
                    } else {
                        gameObjectfileWrite(gameObject); //書き込み
                        navigate('/votePage');
                    }
                }
            }
        }
    };

    const handleChange = (value) => {
        setCode(value);
    };

    return (
        <>{isLoad ? (
            <Game gameObject={gameObject} handleFinishTurn={handleFinishTurn} code={code} handleChange={handleChange} />
        ) : <Load backgroundColor='#526D82' />}
        </>
    );
};