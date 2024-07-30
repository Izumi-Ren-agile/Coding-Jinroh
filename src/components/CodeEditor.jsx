import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./Editor.css"; // CSSファイルをインポート

export const CodeEditor = ( props ) => {
  const { code, onChange } = props;
  return (
    <div className="editor-container">
      <div className="editor-background"></div>
      <CodeMirror
        value={code} // 初期コード
        extensions={[javascript()]}
        theme={oneDark}
        height="100%"
        className="code-editor"
        onChange={onChange}
      />
    </div>
  );
};

export default CodeEditor;