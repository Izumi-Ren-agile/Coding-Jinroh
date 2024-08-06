import { useEffect } from 'react';
import { GameHedder } from '../organisms/GameHedder';
import { Card } from '../molecules/Card';

export const ConfirmPlayer = (props) => {
  const { gameObject, handleFinishTurn } = props;

  // コンポーネントがマウントされたときに確認ダイアログを表示する
  useEffect(() => {
    const showConfirmationDialog = () => {
      const confirmed = window.confirm(`${gameObject.players[gameObject.presentPlayer].name}さんですか？`);
      if (!confirmed) {
        showConfirmationDialog();
      }
    };
    showConfirmationDialog();
  }, []);

  return (
    <div className="container" style={{ backgroundColor: '#526D82' }}>
      <GameHedder gameObject={gameObject} handleFinishTurn={handleFinishTurn} yourMission={[]} />
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "20px" }}>
        <h1>あなたの役職は...</h1>
        <Card nowPlayer={gameObject.players[gameObject.presentPlayer]} />
      </div>
    </div>
  );
};