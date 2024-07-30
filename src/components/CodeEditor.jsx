import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./Editor.css"; // CSSファイルをインポート

export const CodeEditor = () => {
  return (
    <div className="editor-container">
      <div className="editor-background"></div>
      <CodeMirror
        value="console.log('Hello, World!');" // 初期コード
        extensions={[javascript()]}
        theme={oneDark}
        height="100%"
        className="code-editor"
      />
    </div>
  );
};

export default CodeEditor;
