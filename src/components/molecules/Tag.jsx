/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Tag = (props) => {
    const { children, secondText } = props;

    const tagStyle = css`
  max-width: 100%;
  min-height: 18px;
  margin: 20px 0;
  padding: 0px 20px;
  background: #e0e0e0;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
`
    const tagTextStyle = css`
  width: auto;
  height: auto;
  color: black;
  font-size: 18px;
  font-weight: bold;
`

    return (
        <div css={tagStyle}>
            <p css={tagTextStyle}>{children}</p>
            <p css={tagTextStyle}>{secondText}</p>
        </div>
    );
};