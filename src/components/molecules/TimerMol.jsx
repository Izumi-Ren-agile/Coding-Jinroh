/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "antd";
import React from "react";
import Timer from "../atom/TimerAtom"; // 相対パスを修正



export const TimerMol = (props) => {
  const {
    startTime,
    duration,
    handleFinishTurn,
    gameDescription,
    isButton,
    isTimer,
    buttonText,
    textStyle
  } = props;

  const timerStyle = css`
align-items: center;
padding: 20px;
border: 5px solid #e0e0e0;
border-radius: 5px;
text-align: center;
font-size: 18px;
right: 0; /* 右端に配置 */
top: 0; /* ヘッダー内で上に配置 */
width: 200px;
height: 100%;
`

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
  const playerIndicatorStyle = css`
${textStyle}
font-size: 13px;
font-weight: bold;
text-align: center;
margin-bottom: 10px;
`

  // const showTimer = startTime && duration;
  // const showDescription = gameDescription;
  // const showButton = gamePhase => {
  //   return (
  //     //ゲームフェーズの分岐を行っていますStringで分岐させているので、事前に適切なStringを入力してください。
  //     //ここではボタンを表示したい画面の値を入力させます。
  //     gamePhase === "night" ||
  //     gamePhase === "day" ||
  //     gamePhase === "confirm" ||
  //     gamePhase === "vote"
  //   );
  // };

  return (
    <div css={timerStyle}>
      {isTimer && (
        <Timer
          startTime={startTime}
          duration={duration}
          handleFinishTurn={handleFinishTurn}
          textStyle={textStyle}
        />
      )}
      <div css={playerIndicatorStyle}>
        {gameDescription}
      </div>
      {isButton && (
        <Button type="primary" onClick={handleFinishTurn}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};
