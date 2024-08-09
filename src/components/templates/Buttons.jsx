/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Buttons = (props) => {
    const { children } = props;

    const buttonsStyle = css`
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: right;
`
    return (
        <div css={buttonsStyle}>
            {children}
        </div>
    );
};