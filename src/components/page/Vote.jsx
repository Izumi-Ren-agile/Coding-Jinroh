/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { css } from "@emotion/react";
import { GameHeader } from '../organisms/GameHeader';
import { PlayerAtom } from '../atom/Playeratom'
import { Button } from "antd";
import swal from 'sweetalert2';
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
  const voteButtonStyle = css`
  background: #27374D;
    color:#ede4dd;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    
  `;

  // コンポーネントがマウントされたときに確認ダイアログを表示する
    useEffect(() => {
      swal.fire({
        title: `${gameObject.players[gameObject.presentPlayer].name}さんですか？`,
        text: '「はい」を押すと投票確認に進みます',
        icon: 'warning',
        confirmButtonText: 'はい',
        cancelButtonText: 'いいえ',
        showCancelButton:true,
      }).then((result) => {
        if (!result.isConfirmed) {
          // ユーザーが「いいえ」をクリックした場合の処理
          window.location.reload();
        }
      });
    }, []);

  return (
       <div className="container" style={{ backgroundColor: "#ede4dd" }}>
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
                    <Button css={voteButtonStyle}
                      className={`vote-item-btn, ${player.id === selectedPlayerIndex ? "selected" : "select"
                        }`}
                      onClick={() => handleSelect(player)}
                    >
                      {player.id === selectedPlayerIndex ? "選択中" : "選択"}
                    </Button>
                  </div>
                )
            )}
          </div>
          <br /><br />
          <Button
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
          </Button>
        </div>
      </div>
    </div>
  );
};
