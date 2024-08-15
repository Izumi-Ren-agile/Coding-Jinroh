/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { css } from "@emotion/react";
import { GameHeader } from '../organisms/GameHeader';
import { PlayerAtom } from '../atom/PlayerAtom'
import { Button } from "antd";
import swal from 'sweetalert2';
import "./vote.css";

  export const VoteResult = (props) => {
    const { gameObject, expelledPlayer, handleFinishTurn } = props;

  // コンポーネントがマウントされたときに確認ダイアログを表示する
  useEffect(() => {
    swal.fire({
      title: `投票の結果追放されたのは...`,
      icon: 'question',
      confirmButtonText: '結果を確認する',
    }).then((result) => {
      swal.fire({
        title: `${expelledPlayer.name}さん\nでした...`,
        imageUrl: "/images/voteResult-image.jpg",
        imageWidth: 400,
        imageHeight: 400,
        confirmButtonText: '投票数を確認する',
      });
    });
  }, []);

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

  return (
       <div className="container" style={{ backgroundColor: "#ede4dd" }}>
      <GameHeader gameObject={gameObject} handleFinishTurn={handleFinishTurn}/>
      <div className="main-content">
        <div className="text-center-content">
          <h2 style={{ color: "#27374D" }}>投票結果</h2>
          <br />
          <br />
          <div css={playerVoteContainer}>
                    <div css={voteItem} >
                    <PlayerAtom name={expelledPlayer.name} />
                    <p>{expelledPlayer.name}</p>
                    <p>{expelledPlayer.voted}票</p>
                  </div>
            {gameObject.players.map(
              (player, index) =>
                  <div css={voteItem} key={index}>
                    <PlayerAtom
                      name={player.name}
                      imagePath={player.imagePath}
                      color={player.color}
                      isPM={player.isPM}
                      isAlive={true}
                      isPresent={false}
                      index={index} />
                    <p>{player.name}</p>
                    <p>{player.voted}票</p>
                  </div>
            )}
          </div>
          <br /><br />
          <Button className="btn-group center-button-vr" onClick={handleFinishTurn}>
            {gameObject.gameResult === "draw" ? "コーディングフェーズへ" : "結果画面へ"}
          </Button>
        </div>
      </div>
    </div>
  );
};
