/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TimerMol } from "../molecules/TimerMol";

export const GameHeader = (props) => {
    let { gameObject, handleFinishTurn = () => { } } = props;

    const thisPhaseCalc = (gamePhase) => {
        switch (gamePhase) {
            case 'confirmRole':
                return {
                    phaseText: "役職確認フェーズ",
                    dayText: `Day${gameObject.presentDay}`,
                    backgroundColor: '#526D82',
                    textColor: '#ede4dd',
                    missions: [],
                    gameDescription: "役職を確認しよう",
                    isTimer: true,
                    startTime: gameObject.startingTurn,
                    maxTime: 30,
                    isButton: true,
                    buttonText: "次の人へ"
                };
            case 'question':
                return {
                    phaseText: "問題確認フェーズ",
                    dayText: `Day${gameObject.presentDay}`,
                    backgroundColor: '#526D82',
                    textColor: '#ede4dd',
                    missions: [],
                    gameDescription: "問題を確認しよう",
                    isTimer: true,
                    startTime: gameObject.startingTurn,
                    maxTime: 60,
                    isButton: true,
                    buttonText: "ゲーム開始"
                };
            case 'night':
                return {
                    phaseText: `コーディングフェーズ${gameObject.presentCodingTurn}`,
                    dayText: `Day${gameObject.presentDay}`,
                    backgroundColor: '#526D82',
                    textColor: '#ede4dd',
                    missions: gameObject.players[gameObject.presentPlayer].yourMission,
                    gameDescription: `${gameObject.players[gameObject.presentPlayer].name}さんのターン`,
                    isTimer: true,
                    startTime: gameObject.startingTurn,
                    maxTime: gameObject.codingMaxTime,
                    isButton: true,
                    buttonText: "次の人へ"
                };
            case 'daytime':
                return {
                    phaseText: "会議フェーズ",
                    dayText: `Day${gameObject.presentDay}`,
                    backgroundColor: '#ede4dd',
                    textColor: "#526D82",
                    missions: [],
                    gameDescription: "人狼を見つけよう",
                    isTimer: true,
                    startTime: gameObject.startingTurn,
                    maxTime: gameObject.meetingmaxTime,
                    isButton: true,
                    buttonText: "会議を終える"
                };
            case 'vote':
                return {
                    phaseText: "投票フェーズ",
                    dayText: `Day${gameObject.presentDay}`,
                    backgroundColor: '#ede4dd',
                    textColor: "#526D82",
                    missions: [],
                    gameDescription: "怪しい人に投票しよう",
                    isTimer: true,
                    startTime: gameObject.startingTurn,
                    maxTime: 30,
                    isButton: false,
                    buttonText: "次の人へ"
                };
            case 'result':
                return {
                    phaseText: "勝敗結果",
                    dayText: `Result`,
                    backgroundColor: '#526D82',
                    textColor: '#ede4dd',
                    missions: [],
                    gameDescription: "もう一回遊んでね",
                    isTimer: false,
                    startTime: gameObject.startingTurn,
                    maxTime: 30,
                    isButton: true,
                    buttonText: "TOPへ戻る"
                };
            default:
                return { missions: [] };
        }
    }

    const headerInf = thisPhaseCalc(gameObject.gamePhase);
    console.log(headerInf)

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
    color: ${headerInf.textColor};
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
                    <h1 css={dayIndicatorStyle}>{headerInf.dayText}</h1>
                    <p css={phaseIndicatorStyle}>{headerInf.phaseText}</p>
                </div>
                <div css={playersContainerStyle}>
                    {gameObject.players.map((player, index) => (
                        <div css={playerStyle} key={index} id={`player${index}`}>{player.isPM?<p>PM</p>:<></>}{player.name}</div>
                    ))}
                </div>
            </div>
            <div css={hedderRightStyle}>
                {headerInf.missions.map((missionObject) => (
                    <div css={missionStyle}>
                        <p css={missionTextStyle}>MISSION</p>
                        <p css={missionContentStyle}>{missionObject.mission.replace(/\\n/g, '\n')}</p>
                    </div>
                ))}
                <TimerMol startTime={headerInf.startTime} duration={headerInf.maxTime} handleFinishTurn={handleFinishTurn} gameDescription={headerInf.gameDescription} isButton={headerInf.isButton} isTimer={headerInf.isTimer} textStyle={textStyle} buttonText={headerInf.buttonText} />
            </div>
        </div>
    );
};