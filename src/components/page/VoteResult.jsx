import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { Content50 } from "../templates/Content50";
import { PlayerAtom } from "../atom/Playeratom";
import { GameHeader } from '../organisms/GameHeader'; // ../organisms/GameHeader に修正

import "./VoteResult.css";

export const VoteResult = () => {
  const [players, setPlayers] = useState([]);
  const [expelledPlayer, setExpelledPlayer] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const game = location.state || {};

  useEffect(() => {
    if (game.players) {
      // 投票数が最も多いプレイヤーを見つける
      const mostVotedPlayer = game.players.reduce((max, player) => {
        return player.voted > max.voted ? player : max;
      }, { voted: -1 });

      // 見つけたプレイヤーを排除する
      const updatedPlayers = game.players.filter(player => player !== mostVotedPlayer);

      setPlayers(updatedPlayers);
      setExpelledPlayer(mostVotedPlayer);

      //すべての処理が終わった段階でゲームオーバー条件を満たしているのかのチェックを行う
      checkGameOver(updatedPlayers);

    }
  }, [game.players]);

  const checkGameOver = (updatedPlayers) => {
    // alivePlayersは現状生存しているプレイヤー（全生存者）
    const alivePlayers = updatedPlayers.filter(player => player.isAlive === true);
    
    // aliveWerewolvesは現状生存している人狼の人数（生存している人狼）
    const aliveWerewolves = alivePlayers.filter(player => player.isJinroh === true);
    
    // aliveCiviliansは現状生存している市民の人数（人狼以外の生存者）
    const aliveCivilians = alivePlayers.filter(player => player.isJinroh === false);
  
    if (alivePlayers.length === 2 && aliveWerewolves.length === 1) {
      // 人狼の勝利
      navigate('/Result', { state: { result: '人狼の勝利です！' } });
    } else if (aliveWerewolves.length === 0) {
      // 市民の勝利
      navigate('/Result', { state: { result: '市民の勝利です！' } });
    }
  };
  

  const toCordingPage = () => {
    navigate("/nightGame");
  };

  return (
    <div className="container">
      <GameHeader />
      <div className="content">
        <div className="content_top">
          <h2>投票の結果...</h2>
        </div>
        <div className="content_main">
          <div className="content_left">
            <Content50>
              <div>
                <h1>追放されたのは</h1>
              </div>
              <div>
                {expelledPlayer ? (
                  <PlayerAtom name={expelledPlayer.name} index={0} />
                ) : (
                  <h2>追放されたプレイヤーはいません</h2>
                )}
              </div>
            </Content50>
          </div>
          <div className="content_right">
            <Content50>
                <img
                  src="/images/voteresult_rope(Sample).png"
                  alt="Vote Result Rope"
                />
            </Content50>
          </div>
        </div>
        <div className="cordingphase_re">
          <Button id="toCordingpage" onClick={toCordingPage}>
            コーディングフェーズへ
          </Button>
        </div>
      </div>
    </div>
  );
};