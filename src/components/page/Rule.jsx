import "./rule.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { Button } from "antd";
import useSound from "use-sound";
import ButtonSound1 from "../../sound/creep_up_on.mp3";
import { useContext } from "react";

export const Rule = () => {
  const [play, { stop, pause }] = useSound(ButtonSound1);

  const navigate = useNavigate();

  const handleInputPlayer = () => {
    navigate("/inputPlayer");
  };

  return (
    <div class="container">
      <header class="regular-header">
        <h1 className="title">コーディング人狼 - ルール説明</h1>
      </header>
      <div class="main-content">
        <div class="text-container">
          <h2 className="rule-h2 text-center-content">
            ようこそ「コーディング人狼」へ！ <br />
            このゲームは、プレイヤーが市民と人狼に分かれ、プログラミングの課題を解決するゲームです！
          </h2>
        </div>
        <div className="rule-container">
          <div className="rule-text">
            <h2>【勝利条件】</h2>
            <ul>
              <li>市民: 人狼を全員追放する or コードが正しく完成する</li>
              <li>人狼: コードが正しく動かない</li>
            </ul>
            <br />
            <h2>【ゲームの流れ】</h2>
            <p>
              ゲームはコーディングフェーズ2回と会議フェーズを繰り返して進みます。
            </p>
            <br />
            <h3>[コーディングフェーズ]</h3>
            <ul>
              <li>各プレイヤーが順番にコードを書きます。</li>
              <li>各プレイヤーのコーディング時間は60秒の制限があります。</li>
            </ul>
            <br />
            <h3>[会議フェーズ]</h3>
            <ul>
              <li>
                プレイヤー全員で、完成したコードを見ながら120秒話し合います。
              </li>
              <li>
                会議の最後に投票を行い、最も怪しいプレイヤーを追放します。
              </li>
              <li>
                投票の結果、同数の場合は「PM（後述）」が追放者を決定します。
              </li>
            </ul>
            <br />
            <h3>[ミッション]</h3>
            <ul>
              <li>各プレイヤーにはランダムに「ミッション」が配布されます。</li>
              <li>
                「ミッション」達成数が一番多いプレイヤーが「PM」になります。
              </li>
            </ul>
            <br />
          </div>

          <div class="rule-image">
            <img src="./images/game_display.jpeg" alt="説明画像" />
          </div>
        </div>
        <div class="text-container">
          <h2 className="rule-h2 text-center-content">
            「コーディング人狼」ではプログラミングスキルを磨きながら、推理力やコミュニケーション能力も試されます。
            <br />
            市民としてコードを完成させるか、人狼としてうまくバグを仕込むか、あなたのスキルを試してみましょう！
          </h2>
        </div>
        <div class="text-container center-conteiner">
          <Button
            onClick={()=>{handleInputPlayer();play();setTimeout(stop,900);}}
            className="btn-group center-button"
          >
            ゲーム開始
          </Button>
        </div>
      </div>
    </div>
  );
};
