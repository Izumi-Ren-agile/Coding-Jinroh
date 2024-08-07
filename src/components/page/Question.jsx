/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Load } from '../page/Load';
import { GameHeader } from "../organisms/GameHeader";
import { Button } from "antd/es/radio";

export const Question = () => {
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
            .then((data) => { console.log(data); })
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        gameObjectfileRead();
        console.log("use-Effect");
    }, [isLoad]);

    const handleGame = async () => {
        gameObject.gamePhase = "night";
        gameObject.startingTurn = Math.floor(Date.now() / 1000);
        await gameObjectfileWrite(gameObject); //書き込み
        navigate('/gamePage');
    }

    const contentsStyle = css`
    flex-grow: 1; // 余白に合わせて伸張する
    height:100%;
    max-height: calc(100%-180px);
    display: flex;
    flex-direction: column;
    item-align: center;
    text-align: center;
    gap: 20px;
    width: 100%;
    padding: 0 20px;
`
    const projectContainerStyle = css`
    flex-grow: 1; // 余白に合わせて伸張する
    background: white;
    height: 100%;
    padding: 10px;
    border: 5px solid #e0e0e0;
    border-radius: 5px;
    text-align: left;
    margin-bottom: 20px;
    overflow: auto;
`
    const projectTextStyle = css`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    color: black;
    padding: 20px;
    font-weight: bold;
    white-space: pre-wrap;
`
const messageStyle = css`
font-size: 20px;
font-weight: bold;
`;

    return (
        <>{isLoad ? (
            <div className="container" style={{ backgroundColor: "#526D82" }}>
                <GameHeader gameObject={gameObject} handleFinishTurn={handleGame} />
                <div css={contentsStyle}>
                    <p css={messageStyle}>
                        上長から、一通のメールが…
                    </p>
                    <div css={projectContainerStyle}>
                        <p css={projectTextStyle}>各位<br />急遽のプロジェクトで申し訳ない。クライアントの仕様書通り、以下のメソッドを今日中に納品してほしい。<br /><br />{gameObject.questionText.replace(/\\n/g, '\n')}<br /><br />よろしく頼む。<br /><br />偉井上長</p>
                    </div>
                    <p css={messageStyle}>
                        コードを邪魔する人狼に気を付けながら、楽しいエンジニアライフを！
                    </p>
                    <Button size="large" type="primary" onClick={handleGame}>
                        ゲーム開始
                    </Button>
                </div>
            </div >
        ) : <Load backgroundColor='#526D82' />}
        </>
    );
};