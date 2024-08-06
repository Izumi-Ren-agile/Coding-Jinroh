import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Load } from '../page/Load';
import { ConfirmPlayer } from "../page/ConfirmPlayer";

export const VoteResultPage = () => {
    const [gameObject, setGameObject] = useState({ property: "default" });
    const [isLoad, setIsLoad] = useState(false); //useLoad
    const navigate = useNavigate();

    const gameObjectfileRead = async () => {
        console.log(gameObject)
        await fetch("/read-gameObject")
            .then((response) => response.json())
            .then((data) => {
                setGameObject(data);
                setIsLoad(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const gameObjectfileWrite = async (object) => {
        await fetch("/write-gameObject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
        })
            .then((response) => response.text())
            .then((data) => {console.log(data);})
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        gameObjectfileRead();
        console.log("use-Effect");
    }, [isLoad]);

    useEffect(() => {
        console.log("ゲームオブジェクト:", gameObject);
    }, [gameObject]); //確認

    const handleFinishTurn = async () => {
        if (gameObject.presentPlayer < gameObject.players.length - 1) {
            gameObject.presentPlayer++;
            setGameObject(gameObject);
           // setIsLoad(false);
            gameObjectfileWrite(gameObject); //書き込み
            setIsLoad(false);
        } else {
            gameObject.presentPlayer = 0;
            gameObject.gamePhase = "night";
            gameObjectfileWrite(gameObject); //書き込み
            navigate('/question');
        }
    };

    return (
        <>{isLoad ? (
            <ConfirmPlayer gameObject={gameObject} handleFinishTurn={handleFinishTurn} />
        ) : <Load backgroundColor='#526D82' />}
        </>
    );
};