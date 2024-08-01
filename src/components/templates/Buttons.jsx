/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Buttons = (props) => {
    const { children } = props;

    const buttonsStyle = css`
    display: flex;
    justify-content: right;
    gap: 10px;
    width: 100%;
    margin: 20px 0 auto;
    min-height: 80%;
    box-sizing: border-box;
`
    return (
        <div css={buttonsStyle}>
            {children}
        </div>
    );
};