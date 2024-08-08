/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Contents = (props) => {
    const { children } = props;

    const contentsStyle = css`
    flex-grow: 1; // 余白に合わせて伸張する
    height:100%;
    max-height: calc(100%-180px);
    display: flex;
    gap: 20px;
    width: 100%;
    padding: 0 20px;
`
    return (
        <div css={contentsStyle}>
            {children}
        </div>
    );
};