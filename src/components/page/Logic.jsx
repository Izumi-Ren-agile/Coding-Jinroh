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

  // 前回のユーザー入力を保持するための状態
  const [previousUserInput, setPreviousUserInput] = useState("");

  // 2つの文字列の差分を計算する関数
  const diffStrings = (userInput, previousUserInput, answerText) => {
    const userDiff = Diff.diffWords(previousUserInput, userInput); // 前回と今回のユーザー入力の差分を取得
    //map関数の使用をし、userDiffのvalueを取得し、そのvalueをpart.valueで結合した文字列とみなす。それをdiffWordsで差分を出す。
    const diff = Diff.diffWords(userDiff.map(part => part.value).join(""), answerText); // userDiffとanswerTextのDiffを単語単位で比較します
    const isCorrect = diff.every(part => !part.added && !part.removed); // 差分がない場合は正解
    return {
      diff: diff.map(part => ({
        added: part.added || false, // 新しく付け加えられた文字列のこと
        removed: part.removed || false, // 新しく削除された文字列のこと
        value: part.value // 差分のあった文字列のこと
      })),
      isCorrect
    };
  };

  // ミッションポイントを1増やしてDBに更新する関数
  const updateMissionPoint = async () => {
    console.log("updateMissionPoint関数が呼ばれました");
    try {
      // gameObjectに格納されているMissionPointを1増やす
      const updatedGameObject = {
        ...gameObject,
        MissionPoint: gameObject.MissionPoint + 1
      };

      // サーバーにPUTリクエストを送信してDBを更新
      const response = await fetch(`/api/updateGameObject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' // JSON形式でのデータ受け渡し
        },
        body: JSON.stringify(updatedGameObject)
      });
      //エラーハンドリング（MissionPointの更新処理に関するエラーハンドリング）
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

  //このユーズエフェクトでは、今回のユーザー入力値と前回のユーザー入力値が異なっている場合、前回のユーザー入力値を更新する
  //という処理が走るが、ボタンの方に記述した方が良い可能性もある。  
  useEffect(() => {
    if (userInput !== previousUserInput) {
      const { diff, isCorrect } = diffStrings(userInput, previousUserInput, answerText);
      setPreviousUserInput(userInput); // 前回のユーザー入力を更新

      if (isCorrect) {
        // 正解ですの処理を行い、ミッションポイントの数値を1増やしてDBに返却する
        console.log("正解です。値の更新を開始します。");
        console.log("値の更新を完了しました。");
      } else {
        // 不正解ですの処理
        console.log("不正解です。処理を中断します。");
      }
    }
  }, [userInput, answerText]);
}
