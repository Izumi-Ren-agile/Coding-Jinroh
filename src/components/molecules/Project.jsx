/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Project = (props) => {
    const { question } = props;

    const projectContainerStyle = css`
    flex-grow: 1; // 余白に合わせて伸張する
    background: white;
    padding: 20px;
    border: 5px solid #e0e0e0;
    border-radius: 5px;
    margin-bottom: 20px;
`
    const projectTextStyle = css`
    height: 100%;
    background: white;
    color: black;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    font-weight: bold;
    white-space: pre-wrap;
`
    return (
        <div css={projectContainerStyle}>
            <p css={projectTextStyle}>〇〇君<br />急遽のプロジェクトで申し訳ない。クライアントの仕様書通り、以下のメソッドを今日中に納品してほしい。<br /><br />{question}<br /><br />よろしく頼む。<br /><br />〇〇課長</p>
        </div>
    );
};