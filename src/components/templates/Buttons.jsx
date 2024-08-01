/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Buttons = (props) => {
    const { children } = props;

    const buttonsStyle = css`
    position: absolute;
    right: 10px;
    bottom: 10px;
`
    return (
        <div css={buttonsStyle}>
            {children}
        </div>
    );
};