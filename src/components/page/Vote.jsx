/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { GameHedder } from '../organisms/GameHedder';
import "./vote.css";

export const Vote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const gameO = location.state; // DBからのゲームオブジェクト
  // const [gameObject, setGameObject] = useState(gameO || {}); // DBからのゲームオブジェクトの状態管理
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isVoteUpdated, setIsVoteUpdated] = useState(false); // 更新が完了したかを示すフラグ

  // プレイヤーとミッションのサンプルデータ
  const missionContent0 = { mission: "文字列\n'int0'\nを含めろ！", arg: "int" };
  const missionContent1 = { mission: "文字列\n'int'\nを含めろ！", arg: "int" };
  const missionContent2 = { mission: "文字列\n'int2'\nを含めろ！", arg: "int" };

  const player1 = { id: 123456, name: "ikeda", isJinroh: false, color: "lime", isAlive: true, isPM: false, yourMission: [missionContent0] };
  const player2 = { id: 123456, name: "izumi", isJinroh: false, color: "pink", isAlive: true, isPM: false, yourMission: [missionContent1, missionContent2, missionContent2], solvedMissionNum: 0 };
  const player3 = { id: 123456, name: "nishimura", isJinroh: true, color: "aqua", isAlive: true, isPM: false, yourMission: [missionContent1, missionContent1, missionContent2] };
  const player4 = { id: 123456, name: "takahashi", isJinroh: false, color: "purple", isAlive: true, isPM: false, yourMission: [] };
  const player5 = { id: 123456, name: "papa", isJinroh: false, color: "yellow", isAlive: true, isPM: false, yourMission: [] };
  const player6 = { id: 123456, name: "papa", isJinroh: false, color: "orange", isAlive: true, isPM: false, yourMission: [] };

  const initialplayers = [player1, player2, player3, player4, player5];
  const nowplayers = [player1, player2, player3, player4, player5, player6];

  const questionObject = {
    questionId: "",
    questionText: "以下の仕様を満たす countWords メソッドの作成\n 仕様： ・与えられた文字列に含まれる単語の数を数えるメソッド ・単語はスペースで区切られているものとする",
    initialCode: 'public class Main { public static void main(String[] args) { // テストケース System.out.println(countWords("Hello world")); // 出力: 2 System.out.println(countWords("Java is fun")); // 出力: 3 System.out.println(countWords(" Count the words ")); // 出力: 3 System.out.println(countWords("This is a test")); // 出力: 4 System.out.println(countWords("OneTwoThree")); // 出力: 1 } // 与えられた文字列に含まれる単語の数を数えるメソッド public static int countWords(String str) { //ここに実装 return null; } }',
    answerCode: "bbbbbbbbbbbbb",
  };

  const missionContent3 = { mission: "文字列\n'int3'\nを含めろ！", arg: "int" };
  const missionContent4 = { mission: "文字列\n'int4'\nを含めろ！", arg: "int" };
  const missionContent5 = { mission: "文字列\n'int5'\nを含めろ！", arg: "int" };

  let missions = [missionContent1, missionContent2, missionContent3, missionContent4, missionContent5];
  missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4, missionContent5];
  missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4, missionContent5];
  missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4, missionContent5];
  missions = [...missions, missionContent1, missionContent2, missionContent3, missionContent4, missionContent5];

  const gameObject = {
    gameId: "1234",
    questionId: questionObject.questionId,
    questionText: questionObject.questionText,
    initialCode: questionObject.initialCode,
    answerCode: questionObject.answerCode,
    initialPlayers: initialplayers,
    players: nowplayers,
    presentPlayer: 0,
    editor: questionObject.initialCode,
    editorHistory: [{ name: "初期コード", code: questionObject.initialCode }],
    missions: missions,
    nextMissionIndex: 0,
    presentDay: 1,
    maxDay: 4,
    gamePhase: "night",
    presentCodingTurn: 1,
    maxCodingTurn: 2,
    codingMaxStringNum: 2000,
    codingMaxTime: 60,
    meetingmaxTime: 120,
    isRandom: false,
    maxMissionNum: 3,
    codeLanguage: "java"
  };

  const [players, setPlayers] = useState(gameObject.players || []);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);

  // スタイル定義
  const playerVoteContainer = css`
    width: 80%;
    margin: 5px 10%; 
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


  
  
  // 選択されたユーザーのIDを保存する
  const handleSelect = (player) => {
    setSelectedPlayerIndex(player.id);
  };

  // 投票機能
  const handleVote = () => {
    if (selectedPlayerIndex !== null) {
      // votedの値を更新し、新しいプレイヤー配列を定義
      const updatedPlayers = players.map((player) => {
        if (player.id === selectedPlayerIndex) {
          return { ...player, voted: (player.voted || 0) + 1 };
        }
        return player;
      });
      // プレイヤーを新しいプレイヤー配列で更新
      setPlayers(updatedPlayers);
      setIsVoteUpdated(true); // 更新フラグを立てる
      setSelectedPlayerIndex(null); // 選択を初期化
    }
  };

  // gameObject.presentPlayerに対応するプレイヤーの名前を取得
  const presentPlayer = gameObject.players[gameObject.presentPlayer];
  const presentPlayerName = presentPlayer ? presentPlayer.name : null;

  // playersの状態が更新された後に実行する処理
  useEffect(() => {
    if (isVoteUpdated) {
      // presentPlayerの値を更新
      gameObject.presentPlayer += 1;
      if (players.length > gameObject.presentPlayer) {
        // players.length > presentPlayerなら/vote
        navigate("/vote", { state: gameObject }); // 更新が完了した後に遷移
      } else {
        // players.length < presentPlayerなら/voteResult
        navigate("/voteResult", { state: gameObject }); // 更新が完了した後に遷移
      }
      // 状態更新後のプレイヤーの状態をログに出力
      console.log("Players after setPlayers: ", gameObject.players);
    }
  }, [isVoteUpdated, players.length, gameObject.presentPlayer, navigate, gameObject]);

  console.log("gameObject.players", gameObject.players);

  // コンポーネントがマウントされたときに確認ダイアログを表示する
  useEffect(() => {
    // 二回マウントされるのを防ぐための指定
    let ignore = false;
    const showConfirmationDialog = async () => {
      const confirmed = window.confirm(`${presentPlayerName}さんですか？`);
      if (confirmed) {
        setIsConfirmed(true);
      } else {
        showConfirmationDialog();
      }
    };

    if (!ignore) {
      showConfirmationDialog();
    }
    return () => {
      ignore = true;
    };
  }, [presentPlayerName]);

  return (
    <div className="container">
      <GameHedder gameObject={gameObject} />

      <div className="main-content">
        {isConfirmed ? (
          <div className="text-center-content">
            <h2>{presentPlayerName}さん、人狼だと思う人に投票してください</h2>
            <br />
            <br />
            <div css={playerVoteContainer}>
              {gameObject.players.map(
                (player, index) =>
                  gameObject.presentPlayer !== index && (
                    <div css={voteItem} key={index}>
                      <div className="player" key={index} id={player.id}></div>
                      <p>{player.name}</p>
                      <button
                        className={`btn-group vote-item-btn ${
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
            <br />
            <br />
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
