import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const Diff = require('diff');

export const NightGame = () => {
  const location = useLocation();
  const gameO = location.state; // DBからの情報取得
  const [gameObject, setGameObject] = useState(gameO); // DBからのゲームオブジェクト

  // ユーザー入力を保持するための状態
  const [userInput, setUserInput] = useState("");

  // GameObjectのargsから比較対象の文字列を取得し格納（gameObjectの一部を想定）
  const answerText = gameObject.args;

  const [diffResult, setDiffResult] = useState([]);

  // 2つの文字列の差分を計算する関数
  const diffStrings = (userInput, answerText) => {
    const diff = Diff.diffWords(userInput, answerText);//useinputとanswerTextのDiffを単語単位で比較します。
    const isCorrect = diff.every(part => !part.added && !part.removed); // 差分がない場合は正解(returnに書かれているaddedとremovedがなければ正解)
    return {
      diff: diff.map(part => ({
        added: part.added || false,//新しく付け加えられた文字列のこと
        removed: part.removed || false,//新しく削除された文字列のこと
        value: part.value //差分のあった文字列のこと
      })),
      isCorrect
    };
  };

  // ミッションポイントを1増やしてDBに更新する関数
  const updateMissionPoint = async () => {
    console.log("upDateMissionPoint関数が呼ばれました");
    try {
      //gameObjectに格納されているMissionPointを1増やす
      const updatedGameObject = {
        ...gameObject,
        MissionPoint: gameObject.MissionPoint + 1
      };

      // サーバーにPUTリクエストを送信してDBを更新
      const response = await fetch(`/api/updateGameObject`, {
        method: 'PUT',
        headers: {
            //JSON形式でのデータ受け渡し
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedGameObject)
      });

      if (response.ok) {
        console.log('MissionPointが更新されました');
        setGameObject(updatedGameObject); // 更新されたゲームオブジェクトを状態に設定
      } else {
        console.error('MissionPointの更新に失敗しました');
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };

  useEffect(() => {
    if (userInput) {
      const { diff, isCorrect } = diffStrings(userInput, answerText);
      setDiffResult(diff);

      if (isCorrect) {
        // 正解ですの処理を行い、ミッションポイントの数値を1増やしてDBに返却する
        console.log("正解です。値の更新を開始します。");
        updateMissionPoint(); // GameObjectのMissionPointを更新する処理を呼び出し
        response();//responseをDBに返却する。
        console.log("値の更新を完了しました。");
      } else {
        // 不正解ですの処理
        console.log("不正解です。処理を中断します。");
      }
    }
  }, [userInput, answerText]);
};


//動作確認済み（サーバーサイドで問題はあったものの、ロジックの稼働が出来なかった等のトラブルは無かった）
//ボタンテスト=>差分が合致すると正解の方に自動でタブが切り替わることを確認=>差分判定ロジックは完成していると思われる。
//判定のボタンに紐づけるとupdateMissionPoint関数が呼ばれる。