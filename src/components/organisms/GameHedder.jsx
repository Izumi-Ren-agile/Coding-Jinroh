/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "antd";

export const GameHedder = (props) => {
    const { gameObject, handleFinishTurn } = props;

    const hedderContainerStyle = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 180px;
    flex-basis: 180px;
    padding: 20px;
`
    const hedderLeftStyle = css`
    display: flex;
    justify-content: left;
    gap: 20px;
    width: 100%;
    height: 100%;
`
    const hedderRightStyle = css`
    display: flex;
    justify-content: right;
    gap: 20px;
    width: 100%;
    height: 100%;
`
    const dayIndicatorContainerStyle = css`
    text-align: center;
    display: flex;
    flex-direction: column;
`
    const textStyle = css`
    color: ${gameObject.gamePhase === "night" ? 'white' : 'black'};
`
    const dayIndicatorStyle = css`
    ${textStyle}
    font-size: 90px;
`
    const phaseIndicatorStyle = css`
    ${textStyle}
    font-size: 23px;
    font-weight: bold;
    margin-top: -20px;
`
    const playersContainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`
    const playerStyle = css`
    width: 60px;
    height: 60px;
    background-color: #D9D9D9;
    border: 3px solid #FE2727;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 12px;
`
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
    const timeStyle = css`
    ${textStyle}
    font-size: 25px;
    font-weight: bold;
`
    const playerIndicatorStyle = css`
    ${textStyle}
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;
`
    const missionStyle = css`
    align-items: center;
    padding: 20px;
    border: 5px solid ${gameObject.players[gameObject.presentPlayer].color};
    border-radius: 5px;
    text-align: center;
    font-size: 18px;
    right: 0; /* 右端に配置 */
    top: 0; /* ヘッダー内で上に配置 */
    width: 130px;
    height: 100%;
`
    const missionTextStyle = css`
    ${textStyle}
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;
`
    const missionContentStyle = css`
    ${textStyle}
    font-size: 13px;
    font-weight: bold;
    white-space: pre-wrap;
`
    return (
        <div css={hedderContainerStyle}>
            <div css={hedderLeftStyle}>
                <div css={dayIndicatorContainerStyle}>
                    <h1 css={dayIndicatorStyle}>Day{gameObject.presentDay}</h1>
                    <p css={phaseIndicatorStyle}>{gameObject.gamePhase === "night" ? "コーディングフェーズ" : "会議フェーズ"}</p>
                </div>
                <div css={playersContainerStyle}>
                    {gameObject.players.map((player, index) => (
                        <div css={playerStyle} key={index} id={`player${index}`}>{player.name}</div>
                    ))}
                </div>
            </div>
            <div css={hedderRightStyle}>
                <div css={missionStyle}>
                    <p css={missionTextStyle}>MISSION</p>
                    <p css={missionContentStyle}>{gameObject.players[gameObject.presentPlayer].yourMission[0].mission}</p>
                </div>
                <div css={missionStyle}>
                    <p css={missionTextStyle}>MISSION</p>
                    <p css={missionContentStyle}>{gameObject.players[gameObject.presentPlayer].yourMission[1].mission}</p>
                </div>
                <div css={missionStyle}>
                    <p css={missionTextStyle}>MISSION</p>
                    <p css={missionContentStyle}>{gameObject.players[gameObject.presentPlayer].yourMission[2].mission}</p>
                </div>
                <div css={timerStyle}>
                    <p id="timer" css={timeStyle}>120秒</p>
                    <p css={playerIndicatorStyle}>{gameObject.players[gameObject.presentPlayer].name}さんのターン</p>
                    <Button type="primary" onClick={handleFinishTurn}>次の人へ</Button>
                </div>
            </div>
        </div>
    );
};