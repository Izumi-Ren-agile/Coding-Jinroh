import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const testGameObject = {
  id: 1,
  args: "こんにちは!",
  MissionPoint: 0
};

const TestPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const startGame = () => {
    navigate('/nightgame', { state: testGameObject });
  };

  return (
    <div>
      <h2>テストページ</h2>
      <p>以下のテキストを入力してください:</p>
      <p><strong>"こんにちは!"</strong></p>
      <textarea value={input} onChange={handleChange} rows="4" cols="50" />
      <button onClick={startGame}>ゲーム開始</button>
    </div>
  );
};

export default TestPage;
