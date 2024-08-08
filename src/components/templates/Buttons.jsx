/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Buttons = (props) => {
    const { children } = props;

    const buttonsStyle = css`
    right: 10px;
    bottom: 10px;
`
    return (
        <div css={buttonsStyle}>
            {children}
        </div>
    );
};