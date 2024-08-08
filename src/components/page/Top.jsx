/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Suspense } from "react";

const gradientAnimation = keyframes`
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(2);
  }
  100% {
    filter: brightness(1);
  }
`;

const TopImageStyle = css`
  flex-glow: 1;
  width: 50vh;
  animation: ${gradientAnimation} 3s infinite;
`;

const ElementStyle = css`
  flex-glow: 1;
  margin: 20px;
`;
// const forCenterStyle = css`
//   text-align: center;
// `;

export const Top = () => {
  const navigate = useNavigate();

  const handleConcept = () => {
    navigate("/concept");
  };

  return (
    <div className="container">
        <div className="text-center-content">
        <h1 className="title">コーディング人狼</h1>
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
        {/* <p css={forCenterStyle}></p> */}

        {/* 
  <Suspense fallback={<div>...Loading</div>}>
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script><lottie-player src="https://lottie.host/a3d7b0bc-7e5c-493b-96a3-fa2638f7344a/Eheh91Bvzb.json" background="##ffffff" speed="1" style="width: 300px; height: 300px" loop controls autoplay direction="1" mode="normal"></lottie-player>

  </Suspense> */}
      </div>
  );
};
