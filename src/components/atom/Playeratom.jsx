/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 色の配列
const colors = ["#FE2727", "#FF5733", "#FFC300", "#DAF7A6", "#33FF57", "#33FFCC", "#3375FF", "#8C33FF"];

const playerStyle = (index) => css`
    width: 50px;
    height: 50px;
    background-color: #D9D9D9;
    border: 3px solid ${colors[index % colors.length]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 12px;
`;

export const PlayerAtom = ({ name, index }) => {
    return (
        <div css={playerStyle(index)} id={`player${index}`}>
            {name}
        </div>
    );
};