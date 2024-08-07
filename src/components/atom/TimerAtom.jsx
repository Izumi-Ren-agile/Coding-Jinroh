/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

// TimerAtom スタイルの定義
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
    background-color: #fff; /* 背景色を追加 */
`;



// Phase Style の追加
const phaseStyle = css`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
`;

// Timer コンポーネント
const TimerAtom = ({ startTime, duration, handleFinishTurn, textStyle }) => {

    const timeStyle = css`
    ${textStyle}
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    `

    const [remainingTime, setRemainingTime] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000); // 現在時刻を秒で取得
            const elapsedTime = currentTime - startTime; // 経過時間を計算
            const newRemainingTime = Math.max(Math.floor(duration - elapsedTime), 0); // 残り時間を整数で計算

            setRemainingTime(newRemainingTime);

            if (newRemainingTime <= 0) {
                clearInterval(interval);
                handleFinishTurn();
            }
        }, 1000);

        return () => clearInterval(interval); // クリーンアップ
    }, [startTime, duration, handleFinishTurn]);

    return (
        <>
            <p css={timeStyle}>{remainingTime > 0 ? remainingTime : 0}秒</p>
        </>
    );
};

export default TimerAtom;
