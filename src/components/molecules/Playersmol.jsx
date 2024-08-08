/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PlayerAtom } from '../atom/Playeratom'; // 適切なパスに変更

export const Playersmol = (props) => {
    const { players } = props;

    // プレイヤーリストを2行4列に並べるためのスタイル
    const containerStyle = css`
        display: flex;
        flex-direction: column; /* プレイヤーを縦に並べる */
        gap: 10px; /* 行間のスペース */
        margin-right: 500px; /* 他の要素との整列のために調整 */
        margin-top: 30px;
    `;

    const rowStyle = css`
        display: flex;
        flex-wrap: nowrap; /* 横並びにする */
        gap: 10px; /* プレイヤー間のスペース */
    `;

    // プレイヤーを2行に分ける
    const firstRow = players.slice(0, 4); // 最初の4人を1行目
    const secondRow = players.slice(4, 8); // 次の4人を2行目

    return (
        <div css={containerStyle}>
            <div css={rowStyle}>
                {firstRow.map((player, index) => (
                    <PlayerAtom name={player.name} index={index} key={index} />
                ))}
            </div>
            <div css={rowStyle}>
                {secondRow.map((player, index) => (
                    <PlayerAtom name={player.name} index={index + 4} key={index + 4} />
                ))}
            </div>
        </div>
    );
};
