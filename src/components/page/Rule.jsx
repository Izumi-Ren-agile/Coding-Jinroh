import "./rule.css";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import useSound from "use-sound";
import { useState } from "react";
import Slider from "react-slick";
import ButtonSound1 from "../../sound/creep_up_on.mp3";
import { useContext } from "react";
import { Carousel } from 'antd';

// 画像のインポート
import slide1 from "../../images/rule-slide1.jpg";
import slide2 from "../../images/rule-slide2.jpg";
import slide3 from "../../images/rule-slide3.jpg";
import slide4 from "../../images/rule-slide4.jpg";
import slide5 from "../../images/rule-slide5.jpg";

export const Rule = () => {
  const [play, { stop, pause }] = useSound(ButtonSound1);
  // const [currentSlide, setCurrentSlide] = useState(1); // 現在のスライドインデックス

  const navigate = useNavigate();

  const handleInputPlayer = () => {
    navigate("/inputPlayer");
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const slideContentStyle = css`
  margin: 20px auto;
  max-height: 70vh;
  color: #fff;
  line-height: 160px;
  text-align: center;
  background: #526D82;
  `
  const slideImagetStyle = css`
  max-height: 70vh;
  width: auto;
  margin: 0 auto;
  border-radius: 5px;
  `

  return (
    <div class="container">
      <header class="regular-header">
        <h1 className="title">コーディング人狼 - ルール説明</h1>
      </header>
      <div className="main-content" style={{gap: "20px", margin: "0 auto"}}>
        <Carousel arrows infinite={false} afterChange={onChange} arrowSize="30">
          <div css={slideContentStyle}>
            <img src={slide1} alt="スライド1" css={slideImagetStyle} />
          </div>
          <div css={slideContentStyle}>
            <img src={slide2} alt="スライド2" css={slideImagetStyle} />
          </div>
          <div css={slideContentStyle}>
            <img src={slide3} alt="スライド3" css={slideImagetStyle} />
          </div>
          <div css={slideContentStyle}>
            <img src={slide4} alt="スライド4" css={slideImagetStyle} />
          </div>
          <div css={slideContentStyle}>
            <img src={slide5} alt="スライド5" css={slideImagetStyle} />
          </div>
        </Carousel>
        <div class="text-container center-conteiner">
          <Button
            onClick={() => { handleInputPlayer(); play(); setTimeout(stop, 900); }}
            className="btn-group center-button"
          >
            ゲーム開始
          </Button>
        </div>
      </div>
    </div>
  );
};
