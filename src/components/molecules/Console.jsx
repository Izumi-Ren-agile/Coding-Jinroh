/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export const Console = (props) => {
    const { consoleCode } = props;

    const consoleContainerStyle = css`
    flex-glow: 1;
    width: 100%;
    height: 120px;
    padding: 10px;
    background-color: #282c34;
    /* CodeMirrorのテーマに合わせた色 */
    border-radius: 5px;
  `
    const consoleStyle = css`
    height: 100%;
    overflow: auto;
    border: none;
    /* エディターのボーダーを取り除く */
    white-space: pre-wrap;
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