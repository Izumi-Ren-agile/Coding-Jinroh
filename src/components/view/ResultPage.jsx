import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Load } from '../page/Load';
import { Result } from '../page/Result';

export const ResultPage = () => {
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
        navigate('/');
    };

    return (
        <>{isLoad ? (
            <Result gameObject={gameObject} handleFinishTurn={handleFinishTurn} />
        ) : <Load backgroundColor='#526D82' />}
        </>
    );
};