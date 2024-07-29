import { useNavigate } from "react-router-dom";
import './concept.css'

export const Concept = () => {

    const navigate = useNavigate()

    const handleRule = () => {
        navigate('/rule');
    }
    return (
        <div className="container">
            <div className="header">
                <div className="game-title">コーディング人狼</div>
            </div>
            <div className="content">
                <div className="description">
                    <p className="message message1">満月の綺麗な夜、あなたに一通のメールが…</p>
                    <img src="./images/concept_mail.png" alt="メールアイコン" className="mail-icon" />
                    <p className="message message2">コードを邪魔する人狼に気を付けながら、楽しいエンジニアライフを！</p>
                </div>
                <a href="ゲーム開始のリンク" className="btn-group start-game">ゲーム開始</a>
                <button onClick={handleRule} className="btn-group explain-rules">ルール説明</button>
            </div>
        </div>
    );
};