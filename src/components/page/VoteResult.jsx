/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { Contents } from "../templates/Contents";
import { Content50 } from "../templates/Content50";
import { PlayerAtom } from "../atom/Playeratom"; // PlayerAtomをインポート
import { Playersmol } from "../molecules/Playersmol"; // Playersmolをインポート

export const VoteResult = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 前の画面からのデータ取得
  const game = location.state || {}; // location.stateがundefinedの場合に備えて空オブジェクトを使用

  // プレイヤーデータの中のisAliveを取得するための useEffect
  useEffect(() => {
    if (game.players) {
      setPlayers(game.players);
    }
  }, [game.players]);

  // 生存していないプレイヤーをフィルタリング
  const expelledPlayers = players.filter((player) => !player.isAlive);

  // 生存していないプレイヤーの中で最後のプレイヤー（最も最後に追放されたプレイヤー）を取得
  const expelledPlayer =
    expelledPlayers.length > 0
      ? expelledPlayers[expelledPlayers.length - 1]
      : null;

  // コーディングフェーズページへ遷移する関数
  const toCordingPage = () => {
    navigate("/nightGame"); // ここで遷移先のパスを指定
  };

  return (
    <div className="container">
      <div className="header">
        <div className="day-indicator">
          <h1>Day {game.presentDay || "N/A"}</h1>
          <p>{game.gamePhase || "N/A"}</p>
        </div>
        <div className="players-container">
          {/* Playersmol に players を渡す */}
          <Playersmol players={players} />
        </div>
        <div className="timer">
          <p id="timer">16秒</p>
        </div>
      </div>
      <div className="content">
        <Contents>
          <Content50>
            <div>
              <h2>投票の結果</h2>
            </div>
            <div>
              <h1>追放されたのは</h1>
            </div>
            <div>
              {/* 生存していないプレイヤーの最後のプレイヤーを表示 */}
              {expelledPlayer ? (
                <PlayerAtom name={expelledPlayer.name} index={0} />
              ) : (
                <p>追放されたプレイヤーはいません</p>
              )}
            </div>
          </Content50>
          <Content50>
            <div>
              <img
                src="/images/voteresult_rope(Sample).png"
                alt="Vote Result Rope"
                style={{ width: "50%", height: "50%" }} // スタイル調整
              />
            </div>
          </Content50>
        </Contents>
        <div className="cordingphase_re">
          <Button id="toCordingpage" onClick={toCordingPage}>
            コーディングフェーズへ
          </Button>
        </div>
      </div>
      <script src="hedder.js"></script>
    </div>
  );
};
