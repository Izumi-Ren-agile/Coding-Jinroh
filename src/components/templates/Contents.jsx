/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Contents = (props) => {
    const { children } = props;

    const contentsStyle = css`
    flex-grow: 1; // 余白に合わせて伸張する
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
`
    return (
        <div css={contentsStyle}>
            {children}
        </div>
    );
};