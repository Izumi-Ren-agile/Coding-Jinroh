/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import Countdown from "../../sound/countdown.mp3";
import Creep from "../../sound/creep_up_on.mp3";
import CountdownSound from "../../sound/countdown.mp3";

// TimerAtom スタイルの定義
const timerStyle = css`
  align-items: center;
  margin: 0;
  border: 5px solid #e0e0e0;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  right: 0; /* 右端に配置 */
  top: 0; /* ヘッダー内で上に配置 */
  width: 200px;
  height: 100%;
  background-color: #fff; /* 背景色を追加 */
`;

// Timer コンポーネント
const TimerAtom = ({ startTime, duration, handleFinishTurn, textStyle, textColor }) => {
  const [playCountdown, { stop: stopCountdown, sound }] =
    useSound(CountdownSound);

  const [playCreep, { stop: stopCreep, sound: soundCreep }] = useSound(Creep);

  const [remainingTime, setRemainingTime] = useState(duration);
  const [hasPlayedCountdown, setHasPlayedCountdown] = useState(false); // 効果音が再生されたかどうかを追跡するフラグ
  const [isLastTenSeconds, setIsLastTenSeconds] = useState(false); // 文字色を変えるフラグ

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         const currentTime = Math.floor(Date.now() / 1000); // 現在時刻を秒で取得
  //         const elapsedTime = currentTime - startTime; // 経過時間を計算
  //         const newRemainingTime = Math.max(Math.floor(duration - elapsedTime), 0); // 残り時間を整数で計算

  //         setRemainingTime(newRemainingTime);

  //         if (newRemainingTime <= 0) {
  //             clearInterval(interval);
  //             handleFinishTurn();
  //         }
  //     }, 1000);

  //     return () => clearInterval(interval); // クリーンアップ
  // }, [startTime, duration, handleFinishTurn]);

  useEffect(() => {
    let handle;

    const tick = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime * 1000) / 1000; // ミリ秒から秒に変換
      const newRemainingTime = Math.max(duration - elapsedTime, 0);
      setRemainingTime(Math.floor(newRemainingTime));

      if (newRemainingTime > 0) {
        handle = requestAnimationFrame(tick);
        if (newRemainingTime <= 6) {
          setIsLastTenSeconds(true); // 文字色を変えるフラグを立てる
          if (!hasPlayedCountdown && !sound.playing()) {
            //playCountdown();
            //setHasPlayedCountdown(true); // 効果音が再生されたらフラグを立てる
          }
        } else {
          setIsLastTenSeconds(false); // 10秒以上ならフラグを下げる
        }
      } else {
        //stopCountdown();
        handleFinishTurn();
      }
    };
    //requestAnimationFrame他の描画もキャッチして描画する。
    //コードミラーのほうで更新がかかった時、こちらも変更される。
    handle = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(handle); // クリーンアップ
  }, [startTime, duration, handleFinishTurn]);

  useEffect(() => {
    if(remainingTime<=5){
      playCountdown();
    }
    if (remainingTime === 0) {
      playCreep();
      setTimeout(stopCreep, 900);
    }
  }, [remainingTime]);

  const timeStyle = css`
    ${textStyle}
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    color: ${isLastTenSeconds
      ? "#B22D35"
      : textColor}; // 10秒以下で赤、そうでなければ黒
  `;
  return (
    <>
      <p css={timeStyle}>{remainingTime > 0 ? remainingTime : 0}秒</p>
    </>
  );
};

export default TimerAtom;
