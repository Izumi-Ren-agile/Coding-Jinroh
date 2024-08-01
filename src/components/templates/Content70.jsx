/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Content70 = (props) => {
    const { children } = props;

    const contentStyle = css`
        flex-grow: 1;
  display: flex;
  width: 70%;
  flex-direction: column;
  gap: 20px;
`
    return (
        <div css={contentStyle}>
            {children}
        </div>
    );
};