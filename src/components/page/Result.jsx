import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { GameHeader } from '../organisms/GameHeader'; // GameHeader のパスを適切に設定してください
import { Button } from 'antd'; // Ant Design の Button コンポーネントをインポート
import './Result.css'; // CSSをインポート

export const Result = () => {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate フックを使ってページ遷移を行う
    const resultMessage = location.state?.result || '結果がありません';

    // コーディングフェーズページへの遷移関数
    const toCordingPage = () => {
        navigate('/AnswerPage'); // コーディングフェーズページのパスに変更
    };

    return (
        <div className="container">
            <GameHeader />
            <div className="content">
                <h2>ゲーム結果: {resultMessage}</h2>
                <div className="cordingphase_re">
                    <Button id="toAnswerPage" onClick={toCordingPage}>
                        解答
                    </Button>
                </div>
            </div>
        </div>
    );
};
