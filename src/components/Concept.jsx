import { useNavigate } from "react-router-dom";
import './concept.css'

export const Concept = () => {

    const navigate = useNavigate()

    const handleRule = () => {
        navigate('/rule');
    }
    return (
        <div class="container">
            <div class="header">
                <div class="game-title">コーディング人狼</div>
            </div>
            <div class="content">
                <div class="description">
                    <p class="message message1">ある晴れた昼下がり、あなたに一通のメールが…</p>
                    <img src="mail.png" alt="メールアイコン" class="mail-icon" />
                    <p class="message message2">コードを邪魔する人狼に気を付けながら、楽しいエンジニアライフを！</p>
                </div>
                <a href="ゲーム開始のリンク" class="btn-group start-game">ゲーム開始</a>
                <button onClick={handleRule} class="btn-group explain-rules">ルール説明</button>
            </div>
        </div>
    );
};