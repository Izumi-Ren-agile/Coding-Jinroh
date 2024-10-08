/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { Buttons } from '../templates/Buttons';
import { Button, Tabs } from "antd";
import useSound from 'use-sound';
import Compile from '../../sound/compile.mp3';
import Kacha from '../../sound/kacha.mp3';

export const CodeEditor = (props) => {
  const { gameObject, code, onChange, handleRunCode, loading } = props;
  const { TabPane } = Tabs;

  const [playKacha, { stopKacha, pauseKacha}] = useSound(Kacha, { volume: 0.9 ,interrupt:true});
  const [play, { stop, pause}] = useSound(Compile, { volume: 0.9 ,interrupt:true});
  const jikkouchuu=()=>{
    play();
    return "実行中...";
  }
  const jikkou=()=>{
    stop();
    return "実行(ctrl+Enter)";
  }

  const editorContainerStyle = css`
  flex-grow: 5;
  background-color: #282c34; /* CodeMirrorのテーマに合わせた色 */
  border-radius: 5px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  `
  const editorBackgroundStyle = css`
  flex-grow: 5;
  background-color: #282c34; /* CodeMirrorのテーマに合わせた色 */
  border-radius: 5px;
  position: relative;
`
  const codeEditorStyle = css`
  width: 100%;
  height: 100%;
  border: none; /* エディターのボーダーを取り除く */
  white-space: pre-wrap;
`
  return (
    <div css={editorContainerStyle}>
      <style>
        {
          `:where(.css-1pg9a38).ant-tabs .ant-tabs-tab {
          color: #ffffff;
        }`
        }
      </style>
      <Tabs defaultActiveKey="2" size="small" style={{ color: "#FFF", backgroundColor: "#282c34", flexGrow: "5", padding: "0 10px", borderRadius: "5px", overflow: "auto", display: "flex", position: "relative" }}>
        <TabPane tab="メイン関数" key="1" style={{ color: "#FFF", backgroundColor: "#282c34" }}>
          <div css={editorBackgroundStyle}>
            <CodeMirror
              value={gameObject.main} // 初期コード
              extensions={[javascript()]}
              theme={oneDark}
              css={codeEditorStyle}
            />
          </div>
        </TabPane>
        <TabPane tab="作成メソッド" key="2" style={{ color: "#FFF", backgroundColor: "#282c34" }}>
          <div css={editorBackgroundStyle}>
            <CodeMirror
              value={code} // 初期コード
              extensions={[javascript()]}
              theme={oneDark}
              css={codeEditorStyle}
              onChange={onChange}
            />
          </div>
        </TabPane>
      </Tabs>
      <Buttons>
        <Button type="primary" onClick={()=>{handleRunCode();playKacha();}} disabled={loading}>{loading ? jikkouchuu() : jikkou()}</Button>
      </Buttons>
    </div>
  );
};

export default CodeEditor;