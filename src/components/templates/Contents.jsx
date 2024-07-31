/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Contents = (props) => {
    const { children } = props;

    const contentsStyle = css`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    min-height: 80%;
    box-sizing: border-box;
`
    return (
        <div css={contentsStyle}>
            {children}
        </div>
    );
};