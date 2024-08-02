import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { Content50 } from "../templates/Content50";
import { PlayerAtom } from "../atom/Playeratom";
import { GameHedder } from "../organisms/GameHedder";
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
    }
  }, [game.players]);

  const toCordingPage = () => {
    navigate("/nightGame");
  };

  return (
    <div className="container">
      <GameHedder />
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
