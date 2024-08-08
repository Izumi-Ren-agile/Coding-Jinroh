/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Tag = (props) => {
    const { children, secondText } = props;

    const tagStyle = css`
  min-height: 25px;
  max-height: 25px;
  margin: 0;
  padding: 0px 20px;
  background: #ede4dd;
  border-radius: 3px;
  border-color: #526D82;
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