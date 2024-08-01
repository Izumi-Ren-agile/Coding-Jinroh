import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createGameObject } from "./InputPlayer";

export const ConfirmPlayer = () => {
  const location = useLocation();

  console.log("確認画面時点", location.state);

  const players = location.state;

  const navigate = useNavigate();

  const handleConfirmRole = () => {
    navigate("/confirmRole");
  };
  return (
    <body>
      <div className="container">
        <div className="question">あなたは田中花子さんですか？</div>
        <button
          onClick={handleConfirmRole}
          className="btn-group concept-explain-rules"
        >
          はい
        </button>
      </div>
    </body>
  );
};
