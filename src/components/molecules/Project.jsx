/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Tag } from '../molecules/Tag';

export const Project = (props) => {
    const { gameObject, question } = props;

    const projectStyle = css`
    flex-grow: 1;
    display: flex;
    width: 30%;
    min-height: calc(100vh - 180px);
    max-height: calc(100vh - 180px);
    height: calc(100% - 180px);
    flex-direction: column;
    gap: 20px;
`
    const projectContainerStyle = css`
    flex-grow: 1; // 余白に合わせて伸張する
    background: white;
    height: 100%;
    padding: 10px;
    border: 5px solid #e0e0e0;
    border-radius: 5px;
    margin-bottom: 20px;
    overflow: auto;
`
    const projectTextStyle = css`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    color: black;
    padding: 20px;
    font-weight: bold;
    white-space: pre-wrap;

`
    return (
        <div css={projectStyle}>
            <Tag secondText={""} colorMode={gameObject.gamePhase === "daytime" ? "daytime" : "night"}>プロジェクト</Tag>
            <div css={projectContainerStyle}>
                <p css={projectTextStyle}>各位<br />急遽のプロジェクトで申し訳ない。クライアントの仕様書通り、以下のメソッドを今日中に納品してほしい。<br /><br />{question}<br /><br />よろしく頼む。<br /><br />偉井上長</p>
            </div>
        </div>
    );
};