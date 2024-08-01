/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export const Console = (props) => {
    const { consoleCode } = props;

    const consoleContainerStyle = css`
    width: 100%;
  flex-grow: 1;
  max-height: 10%;
    display: flex;
    padding: 10px;
    background-color: #282c34; /* CodeMirrorのテーマに合わせた色 */
    border-radius: 5px;
    margin-bottom: 20px;
  `
    const consoleStyle = css`
    width: 100%;
    border: none; /* エディターのボーダーを取り除く */
    white-space: pre-wrap;
    overflow-y: scroll;
  `
    return (
      <div css={consoleContainerStyle}>
        <CodeMirror
          value={consoleCode}
          extensions={[javascript()]}
          theme={oneDark}
          css={consoleStyle}
        /></div>
    );
  };