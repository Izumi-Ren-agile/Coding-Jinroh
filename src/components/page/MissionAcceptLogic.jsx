import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const Diff = require('diff');

export const MissionAcceptLogic = () => {
  const location = useLocation();
  const gameO = location.state; // DBからの情報取得

  const [gameObject, setGameObject] = useState(gameO); // DBからのゲームオブジェクト
  const [userInput, setUserInput] = useState(""); // ユーザー入力を保持するための状態
  const [previousUserInput, setPreviousUserInput] = useState(""); // 前回のユーザー入力を保持するための状態
  const [diffResult, setDiffResult] = useState([]); // 差分結果を管理するための状態

  const answerText = gameObject.args; // GameObjectのargsから比較対象の文字列を取得

  // 2つの文字列の差分を計算する関数
  const diffStrings = (userInput, previousUserInput, answerText) => {
    const userDiff = Diff.diffWords(previousUserInput, userInput);
    const diff = Diff.diffWords(
      userDiff.map(part => part.value).join(""),
      answerText
    );
    const isCorrect = diff.every(part => !part.added && !part.removed);
    return {
      diff: diff.map(part => ({
        added: part.added || false,
        removed: part.removed || false,
        value: part.value
      })),
      isCorrect
    };
  };

  // ミッションポイントを1増やしてDBに更新する関数
  const updateMissionPoint = async () => {
    console.log("updateMissionPoint関数が呼ばれました");
    try {
      const updatedGameObject = {
        ...gameObject,
        MissionPoint: gameObject.MissionPoint + 1
      };

      const response = await fetch(`/api/updateGameObject`, {
        method: 'PUT',
        headers: {
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

  // 保存ボタンがクリックされたときの処理
  const handleSave = () => {
    const { diff, isCorrect } = diffStrings(userInput, previousUserInput, answerText);
    setDiffResult(diff);
    setPreviousUserInput(userInput); // 前回のユーザー入力を更新

    if (isCorrect) {
      console.log("正解です。値の更新を開始します。");
      updateMissionPoint();
      console.log("値の更新を完了しました。");
    } else {
      console.log("不正解です。処理を中断します。");
    }
  };

  // 入力ハンドラー
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <h2>Mission Accept</h2>
      <p>ここにミッションを受け入れるための内容が表示されます。</p>
      <textarea
        rows="4"
        cols="50"
        placeholder="ここにユーザーの入力を行ってください"
        value={userInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>保存</button>
      <div>
        <h3>現在のMissionPoint: {gameObject.MissionPoint}</h3>
        <h3>差分結果:</h3>
        <ul>
          {diffResult.map((part, index) => (
            <li key={index} style={{ color: part.added ? '新しく加えられた部分' : part.removed ? '減ってしまった部分' : '一致しました' }}>
              {part.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};