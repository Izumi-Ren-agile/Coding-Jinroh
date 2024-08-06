/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';

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

const loadingContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const logoStyle = css`
  width: 100px;
  height: 100px;
  animation: ${gradientAnimation} 3s infinite;
`;

const loadingTextStyle = css`
  margin-top: 20px;
  font-size: 1.5em;
  font-weight: bold;
  color: '#ede4dd';
`;

export const Load = (props) => {
    const { backgroungColor } = props;
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div css={loadingContainerStyle} style={{ backgroundColor: backgroungColor }}>
            <img src='/images/coding_jinroh_icon.png' alt="ロゴ" css={logoStyle} />
            <div css={loadingTextStyle}>ロード中{dots}</div>
        </div>
    );
};