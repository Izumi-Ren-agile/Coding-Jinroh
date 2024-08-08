/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { Buttons } from '../templates/Buttons';
import { Button } from "antd";

export const CodeEditor = (props) => {
  const { code, onChange, handleRunCode,loading } = props;

  const editorBackgroundStyle = css`
  flex-grow: 5;
  padding: 10px;
  background-color: #282c34; /* CodeMirrorのテーマに合わせた色 */
  border-radius: 5px;
  overflow: auto;
  position: relative;
`
  const codeEditorStyle = css`
  width: 100%;
  height: 100%;
  border: none; /* エディターのボーダーを取り除く */
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
        
      />
      <Buttons>
        <Button type="primary" onClick={handleRunCode} disabled={loading}>{loading?"実行中...":"実行"}</Button>
      </Buttons>
    </div>
  );
};

export default CodeEditor;