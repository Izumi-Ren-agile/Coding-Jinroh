import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import { Concept } from "./components/page/Concept";
import { Rule } from "./components/page/Rule";
import { InputPlayer } from "./components/page/InputPlayer";
import { ConfirmPlayerPage } from "./components/view/ConfirmPlayerPage";
import { Question } from "./components/page/Question";
import { Top } from "./components/page/Top";
import { GamePage } from "./components/view/GamePage";
import { VotePage } from "./components/view/VotePage";
import { VoteResultPage } from "./components/view/VoteResultPage";
import { ResultPage } from "./components/view/ResultPage";
import { TestPage } from "./components/page/testpage";
import { PMVotePage } from "./components/view/PMVotePage";
import BGM from "./sound/weiredhome.mp3";
import useSound from "use-sound";

function App() {
  const [playBGM, { stop: stopBGM }] = useSound(BGM, {
    volume: 0.3,
    loop: true,
    interrupt: true,
  });
  const [isBGMPlaying, setIsBGMPlaying] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // ctrl+bが押された場合の処理
      if (event.ctrlKey && event.key === "b") {
        if (isBGMPlaying) {
          stopBGM(); // BGMを停止
        } else {
          playBGM(); // BGMを再生
        }
        setIsBGMPlaying(!isBGMPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isBGMPlaying, playBGM, stopBGM]);

  useEffect(() => {
    // ページが読み込まれた時にメッセージを表示し、フェードアウトする
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000); // 3秒後にフェードアウト

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showMessage && (
        <div className="message-box">
          <p>Ctrl + BでBGMを再生/停止します。</p>
        </div>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/concept" element={<Concept />} />
          <Route path="/rule" element={<Rule />} />
          <Route path="/inputPlayer" element={<InputPlayer />} />
          <Route path="/confirmPlayerPage" element={<ConfirmPlayerPage />} />
          <Route path="/question" element={<Question />} />
          <Route path="/gamePage" element={<GamePage />} />
          <Route path="/votePage" element={<VotePage />} />
          <Route path="/voteResultPage" element={<VoteResultPage />} />
          <Route path="/resultPage" element={<ResultPage />} />
          <Route path="/testpage" element={<TestPage />} />
          <Route path="/pmVotePage" element={<PMVotePage />} />
        </Routes>
      </Router>

      <style>{`
        /* メッセージボックスのスタイル */
        .message-box {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          z-index: 1000;
          opacity: 1;
          animation: fadeOut 5s forwards;
        }

        /* フェードアウトのアニメーション */
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
