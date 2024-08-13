import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Load } from '../page/Load';
import { Result } from '../page/Result';

export const ResultPage = () => {
    const [gameObject, setGameObject] = useState({ property: "default" });
    const [isLoad, setIsLoad] = useState(false); //useLoad  
    const [code, setCode] = useState("");
    const [activeTab, setActiveTab] = useState("2");
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
            .then((data) => { console.log(data); })
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

    const handleChange = (value) => {
        setCode(value);
    };

    const setTabCode = (tabIndex) => {
        console.log("hikisuu", tabIndex);
        console.log("editorHistory", gameObject.editorHistory);
        console.log(
            "siteisitayatu",
            gameObject.editorHistory.length - tabIndex + 1
        );
        if (tabIndex === "1") {
            setCode(gameObject.editorHistory[gameObject.editorHistory.length - 1].code);
        } else {
            setCode(
                gameObject.editorHistory[gameObject.editorHistory.length - tabIndex + 1].code
            );
        }

        setActiveTab(tabIndex);
        console.log(
            gameObject.editorHistory[gameObject.editorHistory.length - tabIndex + 1]
                .code
        );
    }

    return (
        <>{isLoad ? (
            <Result
                gameObject={gameObject}
                handleFinishTurn={handleFinishTurn}
                code={code}
                handleChange={handleChange}
                setTabCode={setTabCode}
                activeTab={activeTab}
            />
        ) : <Load backgroundColor='#526D82' />}
        </>
    );
};