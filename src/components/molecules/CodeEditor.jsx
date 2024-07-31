/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export const CodeEditor = (props) => {
  const { code, onChange } = props;

  const editorBackgroundStyle = css`
  width: 100%;
  height: 400px;
  padding: 10px;
  background-color: #282c34;
  /* CodeMirrorのテーマに合わせた色 */
  border-radius: 5px;
`
  const codeEditorStyle = css`
  height: 100%;
  overflow: auto;
  border: none;
  /* エディターのボーダーを取り除く */
  white-space: pre-wrap;
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