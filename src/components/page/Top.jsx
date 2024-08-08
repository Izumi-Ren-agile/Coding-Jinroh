/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Suspense } from "react"

const TopImageStyle = css`
  flex-glow: 1;
`;

const ElementStyle = css`
  width: 500px;
  flex-glow: 1;
  margin: 20px;
`;
const forCenterStyle = css`
  text-align: center;
`;

export const Top = () => {
  const navigate = useNavigate();

  const handleConcept = () => {
    navigate("/concept");
  };

  return (
    <div className="container">
      <div className="main-content">
        <header class="regular-header">
          <h1>コーディング人狼</h1>
        </header>
        <div className="text-center-content">
          <img
            css={[TopImageStyle, ElementStyle]}
            src="./images/coding_jinroh_icon.png"
            alt="ゲームロゴ"
            class="logo"
          />
          <Button
            css={ElementStyle}
            onClick={handleConcept}
            className="btn-group center-button"
          >
            ゲーム開始
          </Button>
        </div>
        <p css={forCenterStyle}></p>
        {/* <button onClick={handleInputPlayer} className="btn-group concept-start-game">
              ゲーム開始
            </button> */}
{/* 
  <Suspense fallback={<div>...Loading</div>}>
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script><lottie-player src="https://lottie.host/a3d7b0bc-7e5c-493b-96a3-fa2638f7344a/Eheh91Bvzb.json" background="##ffffff" speed="1" style="width: 300px; height: 300px" loop controls autoplay direction="1" mode="normal"></lottie-player>

  </Suspense> */}
     </div>
    </div>

    // <div class="container">
    //     <h1 css={ElementStyle}>コーディング人狼</h1>
    //     <img css={[TopImageStyle,  ElementStyle]} src="./images/coding_jinroh_icon.png" alt="ゲームロゴ" class="logo" />
    // <Button css={ElementStyle} onClick={handleConcept} className="btn-group concept-start-game">
    //         ゲーム開始
    //       </Button>
    // </div>
  );
};
