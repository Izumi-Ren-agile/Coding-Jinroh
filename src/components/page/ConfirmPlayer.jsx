/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { GameHedder } from '../organisms/GameHedder';
import { Card } from '../molecules/Card';

export const ConfirmPlayer = () => {
  const location = useLocation();
  const gameO = location.state; //DB
  const [gameObject, setGameObject] = useState(gameO); //DB
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [presentPlayerIndex, setPresentPlayerIndex] = useState(0);
  const navigate = useNavigate();

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

  const roleCardPath = gameObject.players[presentPlayerIndex].isJinroh ? "/images/card-jinroh.png" : "/images/card-citizen.png";

  const contentsStyle = css`
  display: flex;
  flex-direction: column;
  `

  return (
    <div className="container" style={{ backgroundColor: '#526D82' }}>
      <GameHedder gameObject={gameObject} handleFinishTurn={handleFinishTurn} yourMission={[]} />
      <div style={{flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "20px"}}>
        <h1>あなたの役職は...</h1>
        <Card roleCardPath={roleCardPath} />
      </div>
    </div>
  );
};