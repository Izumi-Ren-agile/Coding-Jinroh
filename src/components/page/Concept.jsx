import { useNavigate } from "react-router-dom";
import "./concept.css";
import { Button } from "antd";

export const Concept = () => {
  const navigate = useNavigate();

    const handleRule = () => {
        navigate('/rule');
    }


  return (
      <div className="container">
        
      {/* <header class="regular-header"> */}
        
      {/* </header> */}
        {/* <div className="main-content"> */}
          <div className="text-center-content">
          <h1 className="title">コーディング人狼</h1>
            <p className="message">
              満月の綺麗な夜、あなたに一通のメールが…
            </p>
            <img
              src="./images/concept_mail.png"
              alt="メールアイコン"
              className="mail-icon"
            />
            <p className="message">
              コードを邪魔する人狼に気を付けながら、楽しいエンジニアライフを！
            </p>
          
          {/* <button onClick={handleInputPlayer} className="btn-group concept-start-game">
            ゲーム開始
          </button> */}
          <Button onClick={handleRule} className="btn-group center-button">
            ルール説明
          </Button>
          </div>
        </div>
      // </div>
    
  );
};
