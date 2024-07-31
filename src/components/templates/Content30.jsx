/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Content30 = (props) => {
    const { children } = props;

    const contentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  height: 100%;
  width: 30%;
`
    return (
        <div css={contentStyle}>
            {children}
        </div>
    );
};