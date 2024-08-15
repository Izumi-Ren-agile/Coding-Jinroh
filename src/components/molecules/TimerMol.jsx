/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "antd";
import React from "react";
import Timer from "../atom/TimerAtom"; // 相対パスを修正
import useSound from 'use-sound';
import NextSound from '../../sound/next.mp3';

export const TimerMol = (props) => {
  const [play, { stop, pause}] = useSound(NextSound, { volume: 0.5 ,interrupt:true});
  
  const {
    startTime,
    duration,
    handleFinishTurn,
    gameDescription,
    isButton,
    isTimer,
    buttonText,
    textStyle,
    textColor
  } = props;

  const timerStyle = css`
align-items: center;
padding: 10px;
border: 5px solid ${textColor};
border-radius: 5px;
text-align: center;
font-size: 18px;
right: 0; /* 右端に配置 */
top: 0; /* ヘッダー内で上に配置 */
width: 200px;
height: 100%;

display: flex;
  flex-direction: column;
  justify-content: center; /* 縦方向の中央揃え */
  
`

  const ButtonAtom = css`
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
text-align: center;
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
          textColor={textColor}
        />
      )}
      <div css={playerIndicatorStyle}>
        {gameDescription}
      </div>
      {isButton && (
        <Button className="btn-group-g" type="primary" onClick={()=>{handleFinishTurn();play();props.setIsPlayBGM(false);}}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};
