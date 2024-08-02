/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css } from "@emotion/react";
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
import "./vote.css";

export const Vote = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
 
  // 前の画面からのデータ取得
  const game = location.state || {}; // location.stateがundefinedの場合に備えて空オブジェクトを使用

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isVoteUpdated, setIsVoteUpdated] = useState(false); // 更新が完了したかを示すフラグ
  

  // const initialPlayers = [
  //   {
  //     id: 123456,
  //     name: "ikeda",
  //     isJinroh: false,
  //     color: "red",
  //     isPM: false,
  //     voted: 0,
  //   },
  //   {
  //     id: 123457,
  //     name: "izumi",
  //     isJinroh: false,
  //     color: "blue",
  //     isPM: false,
  //     voted: 0,
  //   },
  //   {
  //     id: 123458,
  //     name: "nishimura",
  //     isJinroh: true,
  //     color: "red",
  //     isPM: false,
  //     voted: 0,
  //   },
  //   {
  //     id: 123459,
  //     name: "takahashi",
  //     isJinroh: false,
  //     color: "red",
  //     isPM: false,
  //     voted: 0,
  //   },
  //   {
  //     id: 123460,
  //     name: "papa",
  //     isJinroh: false,
  //     color: "red",
  //     isPM: false,
  //     vote: 0,
  //   },
  // ];

  // const questionObject = {
  //   questionId: "",
  //   questionText:
  //     "以下の仕様を満たす countWords メソッドの作成\n 仕様： ・与えられた文字列に含まれる単語の数を数えるメソッド ・単語はスペースで区切られているものとする",
  //   initialCode:
  //     'public class Main { public static void main(String[] args) { // テストケース System.out.println(countWords("Hello world")); // 出力: 2 System.out.println(countWords("Java is fun")); // 出力: 3 System.out.println(countWords(" Count the words ")); // 出力: 3 System.out.println(countWords("This is a test")); // 出力: 4 System.out.println(countWords("OneTwoThree")); // 出力: 1 } // 与えられた文字列に含まれる単語の数を数えるメソッド public static int countWords(String str) { //ここに実装 return null; } }',
  //   answerCode: "bbbbbbbbbbbbb",
  // };

//   const game = {
//     gameId: "1234",
//     questionId: questionObject.questionId,
//     questionText: questionObject.questionText,
//     initialCode: questionObject.initialCode,
//     answerCode: questionObject.answerCode,
//     initialplayers: initialPlayers,
//     players: initialPlayers, //変更予定
//     presentPlayer: 0,
//     editor: questionObject.initialCode,
//     missions: [],
//     nextMissionIndex: 0,
//     presentDay: 1,
//     maxDay: 4,
//     gamePhase: "night",
//     presentCodingTurn: 1,
//     maxCodingTurn: 2,
//     codingMaxStringNum: 2000,
//     codingMaxTime: 60,
//     meetingmaxTime: 120,
//     isRandom: false
// }

  const [players, setPlayers] = useState(game.players);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
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
    color:#27374D;
    border-radius: 10px;
    justify-content: space-between;;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin:5px;
  `;
  
  //選択されたユーザーのidを保存する
  const handleSelect = (player) => {
    setSelectedPlayerIndex(player.id);
  };


  //投票
  const handleVote = () => {
    if (selectedPlayerIndex !== null) {
      // votedの値の更新、新しいplayerの配列を定義
      const updatedPlayers = players.map((player, index) => {
        // 選択されたプレイヤーのvotedを更新
        if (player.id === selectedPlayerIndex) {
          return { ...player, voted: player.voted + 1 };
        }
        return player;
      });

      console.log("updatedPlayers",updatedPlayers)
      // プレイヤーを新しいプレイヤーに更新
      setPlayers(updatedPlayers);
      setIsVoteUpdated(true);//更新フラグを立てる
      setSelectedPlayerIndex(null); // 選択を初期化する
    }
  };

  // playersの状態が更新された後に実行する処理
  useEffect(() => {
    if (isVoteUpdated) {
      //presentPlayerの値を更新
      game.presentPlayer+=1;
      if(players.length > presentPlayer){
        //players.length > presentPlayerなら/vote
        navigate("/vote", { state: game }); // 更新が完了した後に遷移する

      }else{
      //players.length < presentPlayerなら/voteResult
      navigate("/voteResult", { state: game }); // 更新が完了した後に遷移する

      }

      // 状態更新後のプレイヤーの状態
      console.log("Players after setPlayers: ", players);

    }
  }, [players, isVoteUpdated, navigate, game]);


  // game.presentPlayer に対応する player.name を取得
const presentPlayer = game.players[game.presentPlayer];
const presentPlayerName = presentPlayer ? presentPlayer.name : null;

// コンポーネントがマウントされたときに確認ダイアログを表示する
useEffect(() => {
  let ignore = false;
  const showConfirmationDialog = async() => {
    const confirmed = window.confirm(`${presentPlayerName}さんですか？`);
    if (confirmed) {
      setIsConfirmed(true);
    } else {
      showConfirmationDialog();
    }
  };

  if(!ignore){
    showConfirmationDialog();
  }
  return()=>{
    ignore=true
  }
},[]);



  return (
    <div className="container">
      {/* <GameHeader game={game} /> */}

      <div className="header">
        <div className="day-indicator">
          <h1>Day {game.presentDay}</h1>
          <p>{game.gamePhase}</p>
        </div>
        <div className="players-container">
          {game.players.map((player, index) => (
            <div className="player" key={index} id={`player${index}`}>
              {player.name}
            </div>
          ))}
        </div>
        <div className="timer">
          <p id="timer">16秒</p>
        </div>
      </div>


      <div className="main-content">
      {isConfirmed ? (
        <div className="text-center-content">
          <h2>{presentPlayerName}さん、人狼だと思う人に投票してください</h2>
          <br />
          <br />
          <div css={playerVoteContainer}>
            {players.map(
              (player, index) =>
                player.id !== presentPlayer.id && ( //現在のプレイヤーを表示しない条件
                  <div css={voteItem} key={index}>
                    <div
                      className="player"
                      key={index}
                      id={player.id}
                    ></div>
                    <p>{player.name}</p>
                    <button
                      className={`btn-group, vote-item-btn, ${
                        player.id === selectedPlayerIndex ? "selected" : "select"
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
        ) : (
          <div>
            <h2>確認中...</h2>
          </div>
        )}
        
      </div>
          
    </div>
  );
};
