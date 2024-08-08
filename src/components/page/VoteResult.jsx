import React, { useState, useEffect } from "react";
import swal from 'sweetalert2';
import { Button } from "antd";
import { Content50 } from "../templates/Content50";
import { PlayerAtom } from "../atom/Playeratom";
import { GameHeader } from '../organisms/GameHeader'; // ../organisms/GameHeader に修正

import "./VoteResult.css";

export const VoteResult = (props) => {
  const { gameObject, expelledPlayer, handleFinishTurn } = props;

  // コンポーネントがマウントされたときに確認ダイアログを表示する
  useEffect(() => {
    swal.fire({
      title: `投票の結果追放されたのは．．．`,
      icon: 'question',
      confirmButtonText: '結果を確認する',
      showCancelButton: true,
    });
  }, []);

  return (
    <div className="container">
      <GameHeader gameObject={gameObject} />
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
          <Button id="toCordingpage" onClick={handleFinishTurn}>
            {gameObject.gameResult === "draw" ? "コーディングフェーズへ" : "結果画面へ"}
          </Button>
        </div>
      </div>
    </div>
  );
};