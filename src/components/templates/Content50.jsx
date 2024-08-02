/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Content50 = (props) => {
    const { children } = props;

    const contentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
  width: 100%;
`
    return (
        <div css={contentStyle}>
            {children}
        </div>
    );
};