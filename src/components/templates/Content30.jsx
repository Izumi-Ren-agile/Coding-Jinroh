/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Content30 = (props) => {
    const { children } = props;

    const contentStyle = css`
    flex-grow: 1;
  display: flex;
  width: 30%;
  flex-direction: column;
  gap: 20px;
`
    return (
        <div css={contentStyle}>
            {children}
        </div>
    );
};