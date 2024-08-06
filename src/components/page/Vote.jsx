/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { css } from "@emotion/react";
import { GameHeader } from '../organisms/GameHeader';
import { PlayerAtom } from '../atom/Playeratom'
import "./vote.css";

export const Vote = (props) => {
  const { gameObject, handleVote, selectedPlayerIndex, handleSelect } = props;

  const playerVoteContainer = css`
    width: 80%;
    margin:5px 10% 5px 10%;
    min-height: 60%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-color: #d3d3d3;
    padding: 20px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  `;
  const voteItem = css`
    display: flex;
    align-items: center;
    background-color: white;
    padding: 10px;
    color: #27374D;
    border-radius: 10px;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 5px;
  `;

  // コンポーネントがマウントされたときに確認ダイアログを表示する
  useEffect(() => {
    const showConfirmationDialog = async () => {
      const confirmed = window.confirm(`${gameObject.players[gameObject.presentPlayer].name}さんですか？`);
      if (!confirmed) {
        showConfirmationDialog();
      }
    };
    showConfirmationDialog();
  }, []);

  return (
    <div className="container">
      <GameHeader gameObject={gameObject} />
      <div className="main-content">
        <div className="text-center-content">
          <h2>{gameObject.players[gameObject.presentPlayer].name}さん、人狼だと思う人に投票してください</h2>
          <br />
          <br />
          <div css={playerVoteContainer}>
            {gameObject.players.map(
              (player, index) =>
                player.id !== gameObject.players[gameObject.presentPlayer].id && ( //現在のプレイヤーを表示しない条件
                  <div css={voteItem} key={index}>
                    <PlayerAtom name={player.name} index={index} />
                    <p>{player.name}</p>
                    <button
                      className={`btn-group, vote-item-btn, ${player.id === selectedPlayerIndex ? "selected" : "select"
                        }`}
                      onClick={() => handleSelect(player)}
                    >
                      {player.id === selectedPlayerIndex ? "選択中" : "選択"}
                    </button>
                  </div>
                )
            )}
          </div>
          <br /><br />
          <button
            className="submit btn-group vote-btn"
            onClick={handleVote}
            disabled={selectedPlayerIndex === null}
          >
            {selectedPlayerIndex === null ? (
              <>
                選択
                <br />
                してください
              </>
            ) : (
              "投票"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
