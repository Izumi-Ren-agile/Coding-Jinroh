import { useState,useEffect } from 'react';
import swal from 'sweetalert2';
import { GameHeader } from '../organisms/GameHeader';
import { Card } from '../molecules/Card';
import Alert from "../../sound/alert.mp3";
import useSound from "use-sound";

export const ConfirmPlayer = (props) => {
  const { gameObject, handleFinishTurn, flipped, handleClick } = props;

  const [isPlayAlert, setIsPlayAlert] = useState(true);

  const [playAlert, { stop: stopAlert, pause: pauseAlert }] = useSound(Alert, {
    volume: 1,
    interrupt: true,
  });
  useEffect(() => {
    if (isPlayAlert) {
      console.log("プレイアラート起動してる？");
      playAlert();
    } else {
      stopAlert();
    }
  }, [isPlayAlert]);

  // コンポーネントがマウントされたときに確認ダイアログを表示する
  useEffect(() => {
    setIsPlayAlert(true);
    swal.fire({
      title: `${gameObject.players[gameObject.presentPlayer].name}さん\nですか？`,
      text: '「はい」を押すと役職確認に進みます',
      icon: 'warning',
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
      showCancelButton:true,
    }).then((result) => {
      if (!result.isConfirmed) {
        // ユーザーが「いいえ」をクリックした場合の処理
        window.location.reload();
      }
    });
  }, []);

  return (
    <div className="container" style={{ backgroundColor: '#526D82' }}>
      <GameHeader gameObject={gameObject} handleFinishTurn={handleFinishTurn} />
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "20px" }}>
        <h1>あなたの役職は...</h1>
        <Card nowPlayer={gameObject.players[gameObject.presentPlayer]} flipped={flipped} handleClick={handleClick} />
      </div>
    </div>
  );
};