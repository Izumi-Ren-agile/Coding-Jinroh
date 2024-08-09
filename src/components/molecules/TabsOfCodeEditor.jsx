/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { Buttons } from '../templates/Buttons';
import { Button, Tabs } from "antd";

export const TabsOfCodeEditor = (props) => {
  const { gameObject, editorHistory, onChange, handleRunCode, loading, setTabCode, activeTab } = props;
  const { TabPane } = Tabs;

  const editorContainerStyle = css`
  flex-grow: 5;
  background-color: #282c34; /* CodeMirrorのテーマに合わせた色 */
  border-radius: 5px;
  overflow: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  `
  const editorBackgroundStyle = css`
  margin-top: -13px;
  flex-grow: 1;
  background-color: #282c34; /* CodeMirrorのテーマに合わせた色 */
  border-radius: 5px;
  overflow: auto;
  position: relative;
`
  const tabsStyle = css`
  background-color: #282c34; /* CodeMirrorのテーマに合わせた色 */
  min-height: 100%;
  min-width: 100%;
  position: relative;
`
  const codeEditorStyle = css`
  width: 100%;
  height: 100%;
  border: none; /* エディターのボーダーを取り除く */
  white-space: pre-wrap;
`
  editorHistory.map((oneOfHistory, index) => {
    console.log(oneOfHistory.name)
  })
  return (
    <div css={editorContainerStyle}>
      <Tabs defaultActiveKey="2" size="small" style={{ color: "#FFF", backgroundColor: "#282c34", flexGrow: "5", padding: "0 10px", borderRadius: "5px", overflow: "auto", display: "flex", position: "relative" }} onChange={(e) => {console.log(e); setTabCode(e === "1" ? 2 : e)}} activeKey={activeTab}>
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
        {editorHistory.reverse().map((oneOfHistory, index) => (
          <TabPane tab={oneOfHistory.name} key={index + 2} style={{ color: "#FFF", backgroundColor: "#282c34" }}>
            <div css={editorBackgroundStyle}>
              <CodeMirror
                value={oneOfHistory.code} // 初期コード
                extensions={[javascript()]}
                theme={oneDark}
                css={codeEditorStyle}
                onChange={onChange}
              />
            </div>
          </TabPane>
        ))}
      </Tabs>
      <Buttons>
        <Button type="primary" onClick={handleRunCode} disabled={loading}>{loading ? "実行中..." : "実行"}</Button>
      </Buttons>
    </div>
  );
};