/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Timer from "../atom/TimerAtom"; // 相対パスを修正

const TimerWrapperAtom = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonAtom = css`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const gamePhaseStyle = css`
  font-size: 13px;
  font-weight: bold;
  color: #666;
  margin-bottom: 10px;
`;

const TimerMol = ({
  startTime,
  duration,
  handleFinishTurn,
  gamePhase,
  gameDescription,
}) => {
  const handleButtonClick = () => {
    handleFinishTurn();
  };

  const showTimer = startTime && duration;
  const showDescription = gameDescription;
  const showButton = gamePhase => {
    return (
      //ゲームフェーズの分岐を行っていますStringで分岐させているので、事前に適切なStringを入力してください。
      //ここではボタンを表示したい画面の値を入力させます。
      gamePhase === "night" ||
      gamePhase === "day" ||
      gamePhase === "confirm" ||
      gamePhase === "vote"
    );
  };

  return (
    <div css={TimerWrapperAtom}>
      {showTimer && (
        <Timer
          startTime={startTime}
          duration={duration}
          handleFinishTurn={handleFinishTurn}
        />
      )}
      {showDescription && (
        <div css={gamePhaseStyle}>
          {gamePhase}
        </div>
      )}
      {showButton(gamePhase) && (
        <button css={ButtonAtom} onClick={handleButtonClick}>
          Finish Turn
        </button>
      )}
    </div>
  );
};

export default TimerMol;
