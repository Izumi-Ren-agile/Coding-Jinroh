import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Load } from "../page/Load";
import { ConfirmPlayer } from "../page/ConfirmPlayer";
import useSound from "use-sound";
import FlipSound from "../../sound/flip.mp3";
import Alert from "../../sound/alert.mp3";

export const ConfirmPlayerPage = () => {
  const [play, { stop, pause }] = useSound(FlipSound, {
    volume: 0.5,
    interrupt: true,
  });

  const [gameObject, setGameObject] = useState({ property: "default" });
  const [isLoad, setIsLoad] = useState(false); //useLoad
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const gameObjectfileRead = async () => {
    console.log(gameObject);
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
      .then((data) => {
        console.log(data);
      })
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
      gameObject.startingTurn = Math.floor(Date.now() / 1000);
      await gameObjectfileWrite(gameObject); //書き込み
      setFlipped(false);
      setIsLoad(false);
    } else {
      gameObject.presentPlayer = 0;
      gameObject.gamePhase = "question";
      gameObject.startingTurn = Math.floor(Date.now() / 1000);
      await gameObjectfileWrite(gameObject); //書き込み
      navigate("/question");
    }
  };

  const handleClick = () => {
    setFlipped(!flipped);
    play();
  };

  return (
    <>
      {isLoad ? (
        <ConfirmPlayer
          gameObject={gameObject}
          handleFinishTurn={handleFinishTurn}
          flipped={flipped}
          handleClick={handleClick}
        />
      ) : (
        <Load backgroundColor="#526D82" />
      )}
    </>
  );
};
