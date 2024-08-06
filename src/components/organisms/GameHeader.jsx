/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "antd";

export const GameHeader = (props) => {
    let { gameObject, handleFinishTurn = () => {} } = props;

    const thisPhaseCalc = (gamePhase) => {
        switch (gamePhase) {
            case 'night':
                return {
                    phaseText: `コーディングフェーズ${gameObject.presentCodingTurn}`,
                    backgroundColor: '#526D82',
                    textColor: '#ede4dd',
                    missions: gameObject.players[gameObject.presentPlayer].yourMission,
                    gameDescription: `${gameObject.players[gameObject.presentPlayer].name}さんのターン`,
                    maxTime: gameObject.codingMaxTime,
                    isButton: true,
                    buttonText: "次の人へ"
                };
            case 'daytime':
                return {
                    phaseText: "会議フェーズ",
                    backgroundColor: '#ede4dd',
                    textColor: "#526D82",
                    missions: [],
                    gameDescription: "人狼を見つけよう",
                    maxTime: gameObject.meetingmaxTime,
                    isButton: true,
                    buttonText: "会議を終える"
                };
            case 'confirmRole':
                return {
                    phaseText: "役職確認フェーズ",
                    backgroundColor: '#526D82',
                    textColor: '#ede4dd',
                    missions: [],
                    gameDescription: "役職を確認しよう",
                    maxTime: 30,
                    isButton: false,
                    buttonText: "次の人へ"
                };
            default:
                return {missions: []};
        }
    }

    const thisPhase = thisPhaseCalc(gameObject.gamePhase);
    console.log(thisPhase)

    const hedderContainerStyle = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-height: 180px;
    flex-grow: 1;
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
    color: ${thisPhase.textColor};
`
    const dayIndicatorStyle = css`
    ${textStyle}
    font-size: 90px;
`
    const phaseIndicatorStyle = css`
    ${textStyle}
    font-size: 20px;
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
    text-align: center;
    font-weight: bold;
`
    const playerIndicatorStyle = css`
    ${textStyle}
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
`
    const missionStyle = css`
    align-items: center;
    padding: 20px 10px;
    border: 5px solid ${gameObject.players[gameObject.presentPlayer].color};
    border-radius: 5px;
    text-align: center;
    font-size: 18px;
    right: 0; /* 右端に配置 */
    top: 0; /* ヘッダー内で上に配置 */
    width: 115px;
    height: 100%;
`
    const missionTextStyle = css`
    ${textStyle}
    color: ${gameObject.players[gameObject.presentPlayer].color};
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
`
    const missionContentStyle = css`
    ${textStyle}
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    white-space: pre-wrap;
`
    return (
        <div css={hedderContainerStyle}>
            <div css={hedderLeftStyle}>
                <div css={dayIndicatorContainerStyle}>
                    <h1 css={dayIndicatorStyle}>Day{gameObject.presentDay}</h1>
                    <p css={phaseIndicatorStyle}>{thisPhase.phaseText}</p>
                </div>
                <div css={playersContainerStyle}>
                    {gameObject.players.map((player, index) => (
                        <div css={playerStyle} key={index} id={`player${index}`}>{player.name}</div>
                    ))}
                </div>
            </div>
            <div css={hedderRightStyle}>
                {thisPhase.missions.map((missionObject) => (
                    <div css={missionStyle}>
                        <p css={missionTextStyle}>MISSION</p>
                        <p css={missionContentStyle}>{missionObject.mission.replace(/\\n/g,'\n')}</p>
                    </div>
                ))}
                <div css={timerStyle}>
                    <p id="timer" css={timeStyle}>120秒</p>
                    <p css={playerIndicatorStyle}>{thisPhase.gameDescription}</p>
                    <Button type="primary" onClick={handleFinishTurn}>{thisPhase.buttonText}</Button>
                </div>
            </div>
        </div>
    );
};