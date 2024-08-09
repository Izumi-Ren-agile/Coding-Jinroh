/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PlayerAtom } from "../atom/PlayerAtom";

export const PlayersMolecules = ( props ) => {
  const { headerPlayers } = props;

  console.log(headerPlayers);

  const containerStyle = css`
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* 一行目と二行目のアバター間のギャップ */
    max-width: 300px; /* コンテナの最大幅 */
    height: 140px;
    align-items: center;
    position: relative;
    justify-content: flex-start;
    overflow: hidden; /* コンテナを超えた部分を隠す */
  `;

  const rowStyle = css`
    display: flex;
    gap: 20px; /* 行内のアバター間のギャップ */
    position: absolute;
    width: 100%;
    top: 15px;
  `;

  const rowOffsetStyle = css`
    top: 70px; /* 75px (アバターの高さ) + 15px (上の余白) */
  `;

  return (
    <div css={containerStyle}>
      <div css={rowStyle}>
        {headerPlayers.slice(0, 4).map((player, index) => (
          <PlayerAtom
            name={player.name}
            imagePath={player.imagePath}
            color={player.color}
            isPM={player.isPM && player.isAlive}
            isAlive={player.isAlive}
            key={index}
          />
        ))}
      </div>
      {headerPlayers.length > 4 && (
        <div css={[rowStyle, rowOffsetStyle]}>
          {headerPlayers.slice(4).map((player, index) => (
            <PlayerAtom
              name={player.name}
              imagePath={player.imagePath}
              color={player.color}
              isPM={player.isPM && player.isAlive}
              isAlive={player.isAlive}
              key={index + 4}
            />
          ))}
        </div>
      )}
    </div>
  );
};
