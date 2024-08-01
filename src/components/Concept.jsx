import { useNavigate } from "react-router-dom";
import "./concept.css";
import {SelectData} from "./SelectData";
import {InsertData} from "./InsertData";

export const Concept = () => {
  const navigate = useNavigate();

    const handleRule = () => {
        navigate('/rule');
    }

    const handleInputPlayer=()=>{
        navigate('/inputPlayer');
    }

    const g={
      h:"nkjn",
      k:"hdsj"
    }

    const testObject={
      d:"hgshjd",
      e:"dhsja",
      f:g
    }
  return (
      <div className="container">
        {/* <h1><SelectData collectionId={"QUESTION_CONTENT"} documentId={"10"} field={"answerCode"} /></h1>
        <h1><InsertData collectionId={"killing"} documentId={"変えれてます？"} jsonObject={{a:"hooooo",b:"toBePartiallyChecked",c:"get",d:testObject}}/></h1> */}
      <header class="regular-header">
        <h1>コーディング人狼</h1>
      </header>
        <div className="main-content">
          <div className="text-center-content">
            <p className="message message1">
              満月の綺麗な夜、あなたに一通のメールが…
            </p>
            <img
              src="./images/concept_mail.png"
              alt="メールアイコン"
              className="mail-icon"
            />
            <p className="message message2">
              コードを邪魔する人狼に気を付けながら、楽しいエンジニアライフを！
            </p>
          </div>
          {/* <a href="ゲーム開始のリンク" className="btn-group start-game">
            ゲーム開始
          </a> */}
          <button onClick={handleInputPlayer} className="btn-group concept-start-game">
            ゲーム開始
          </button>
          <button onClick={handleRule} className="btn-group concept-explain-rules">
            ルール説明
          </button>
        </div>
      </div>
    
  );
};
