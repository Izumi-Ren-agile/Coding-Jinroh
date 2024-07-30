import { useNavigate } from "react-router-dom";

export const ConfirmPlayer=()=>{
    const navigate = useNavigate();

    const handleConfirmRole = () => {
        navigate('/confirmRole');
    }
    return(
        <body>
    <div className="container">
        <div className="question">あなたは田中花子さんですか？</div>
        <button onClick={handleConfirmRole} className="btn-group concept-explain-rules">
            はい
          </button>
    </div>
</body>
    );
}