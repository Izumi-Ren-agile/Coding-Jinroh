/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GameHedder } from '../organisms/GameHedder';
import { Card } from '../molecules/Card';

export const ConfirmPlayer = () => {
  const [gameObject, setGameObject] = useState({ property: "default" });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [presentPlayerIndex, setPresentPlayerIndex] = useState(0);
  const [roleCardPath, setRoleCardPath] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();

  const gameObjectfileRead = () => {
    fetch("/read-gameObject")
      .then((response) => response.json())
      .then((data) => {
        if (gameObject.property === "default") {
          setGameObject(data);
          console.log("data-read", data);
          setIsLoad(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    gameObjectfileRead();
    console.log("use-Effect");
  }, []);

  useEffect(() => {
    console.log("ゲームオブジェクト:", gameObject);
  }, [gameObject]);

  const handleFinishTurn = () => {
    if (gameObject.presentPlayer < gameObject.players.length - 1) {
      gameObject.presentPlayer++;
    } else {
      gameObject.gamePhase = "daytime";
      setGameObject(state => { return { ...gameObject } }); //いらん？
      navigate('/question');
    }
    setGameObject(state => { return { ...gameObject } });
  };

  useEffect(() => {
    if (gameObject.presentPlayer !== presentPlayerIndex) {
      setPresentPlayerIndex(gameObject.presentPlayer);
    }
    setRoleCardPath(gameObject ? "" : gameObject.players[presentPlayerIndex].isJinroh ? "/images/card-jinroh.png" : "/images/card-citizen.png");
  }, [gameObject])

  console.log(gameObject)

  // コンポーネントがマウントされたときに確認ダイアログを表示する
  useEffect(() => {
    let ignore = false;
    const showConfirmationDialog = async () => {
      const confirmed = window.confirm(`${gameObject.players[presentPlayerIndex].name}さんですか？`);
      if (confirmed) {
        setIsConfirmed(true);
      } else {
        showConfirmationDialog();
      }
    };

    if (!ignore) {
      showConfirmationDialog();
    }
    return () => {
      ignore = true
    }
  }, [presentPlayerIndex]);

  return (
        <div className="container" style={{ backgroundColor: '#526D82' }}>
          <GameHedder gameObject={gameObject} handleFinishTurn={handleFinishTurn} yourMission={[]} />
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "20px" }}>
            <h1>あなたの役職は...</h1>
            <Card roleCardPath={roleCardPath} />
          </div>
        </div>
  );
};