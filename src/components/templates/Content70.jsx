/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Content70 = (props) => {
    const { children } = props;

    const contentStyle = css`
    flex-grow: 1;
    height:100%;
    display: flex;
    width: 70%;
    min-height: calc(100vh - 180px);
    max-height: calc(100vh - 180px);
    flex-direction: column;
    gap: 20px;
`
    return (
        <div css={contentStyle}>
            {children}
        </div>
    );
};