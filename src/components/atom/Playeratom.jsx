/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { Tooltip, Avatar } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

// 点滅するアニメーション
const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

export const PlayerAtom = ({
  name,
  imagePath,
  color,
  isPM,
  isAlive,
  isPresent
}) => {
  const playerStyle = css`
    border: 3px solid ${color};
    background-color: ${imagePath ? "transparent" : color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px; // さらに大きく太字
    font-weight: bold;
    width: 50px;
    height: 50px;
    filter: ${isAlive ? "none" : "grayscale(100%)"};
    opacity: ${isAlive ? 1 : 0.5};
    box-shadow: ${isPresent ? `0 0 8px ${color}` : "none"};
    animation: ${isPresent ? `${blinkAnimation} 1s infinite` : "none"};
  `;

  const overlayStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${isAlive ? "none" : "flex"};
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 0, 0, 0.7); /* 赤いオーバーレイ */
    border-radius: 50%;
  `;

  const xMarkStyle = css`
    font-size: 24px;
    color: rgba(255, 255, 255, 1); /* ×マーク */
  `;

  const pmPlateStyle = css`
    position: absolute;
    top: -12px; /* アバターの上部中央に少し重なるように調整 */
    left: 50%;
    transform: translateX(-50%);
    background-color: #8b0000; /* 特別感のある色 */
    color: white;
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: bold;
    z-index: 1;
  `;

  const tooltipTitle = () => {
    let title = name;
    if (isPM && isAlive) title += " (PM)";
    if (!isAlive) title += " - 追放されています";
    return title;
  };

  return (
    <Tooltip title={tooltipTitle()} placement="top">
      <div css={{ position: "relative", display: "inline-block" }}>
        {!isAlive && (
          <div css={overlayStyle}>
            <CloseCircleOutlined css={xMarkStyle} />
          </div>
        )}
        {isPM && isAlive && <div css={pmPlateStyle}>PM</div>}
        <Avatar src={imagePath} css={playerStyle}>
          {!imagePath && name[0]}
        </Avatar>
      </div>
    </Tooltip>
  );
};
