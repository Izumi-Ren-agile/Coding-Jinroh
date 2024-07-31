/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./Editor.css"; // CSSファイルをインポート

export const CodeEditor = ( props ) => {
  const { code, onChange } = props;

  const editorContainerStyle = css`
  position: relative;
  min-height: 400px;
  /* 10行分の高さ */
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
  const editorBackgroundStyle = css`
  
  width: 100%;
  height: 400px;
  padding: 20px;
  background-color: #282c34;
  /* CodeMirrorのテーマに合わせた色 */
  z-index: -1;
  /* CodeMirrorの背後に配置 */
`
const codeEditorStyle = css`
  height: 100%;
  overflow: auto;
  border: none;
  /* エディターのボーダーを取り除く */
`
  return (
    
      <div css={editorBackgroundStyle}>
      <CodeMirror
        value={code} // 初期コード
        extensions={[javascript()]}
        theme={oneDark}
        css={codeEditorStyle}
        onChange={onChange}
      /></div>
    
  );
};

export default CodeEditor;