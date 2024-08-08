import { useNavigate } from "react-router-dom";
import "./concept.css";
import {SelectData} from "../database/SelectData";
import {UpdateData} from "../database/UpdateData";
import InsertData from "../database/InsertData";
import { CountData } from "../database/CountData";
import CompileTest from "../compile/CompilerAsComponent";
import { Compiler } from "../compile/CompilerAsMethod";
import { SimpleCompiler } from "../compile/SimpleCompiler";
import { Button } from "antd";

export const Concept = () => {
  const navigate = useNavigate();

    const handleRule = () => {
        navigate('/rule');
    }


  return (
      <div className="container">
        
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
          {/* <button onClick={handleInputPlayer} className="btn-group concept-start-game">
            ゲーム開始
          </button> */}
          <Button onClick={handleRule} className="btn-group center-button">
            ルール説明
          </Button>
        </div>
      </div>
    
  );
};
