import { useState, useEffect } from 'react';
import { CodeEditor } from '../molecules/CodeEditor';
import { Console } from '../molecules/Console';
import { Project } from '../molecules/Project';
import { GameHeader } from '../organisms/GameHeader';
import { Content70 } from '../templates/Content70';
import { Contents } from '../templates/Contents';
import { Compiler } from "../compile/CompilerAsMethod";
import { Tag } from '../molecules/Tag';
import { TabsOfCodeEditor } from '../molecules/TabsOfCodeEditor';

export const Game = (props) => {
    const { gameObject, handleFinishTurn, code, handleChange } = props;
    const [compiledCode, setCompiledCode] = useState('');

    // コンポーネントがマウントされたときに確認ダイアログを表示する
    useEffect(() => {
        const showConfirmationDialog = async () => {
            const confirmed = window.confirm(gameObject.gamePhase === "night" ? `${gameObject.players[gameObject.presentPlayer].name}さんですか？` : "会議を始めますか？");
            if (!confirmed) {
                showConfirmationDialog();
            }
        };
        showConfirmationDialog();
    }, []);

    //const compileResult = Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output; //なんかようわからんけどこの一文あったらPythonでの実行がうまくいく（変数自体は使ってない）

    const handleRunCode = () => {
        setCompiledCode(code);
    };

    return (
        <div className="container" style={{ backgroundColor: gameObject.gamePhase === "night" ? '#526D82' : '#ede4dd' }}>
            <GameHeader gameObject={gameObject} handleFinishTurn={handleFinishTurn} />
            {gameObject.property ? (<></>) : (
                <Contents>
                    <Content70>
                        <Tag secondText={"あと〇文字"}>エディター</Tag>
                        {gameObject.gamePhase === "night" ? (
                            <CodeEditor code={code} onChange={handleChange} handleRunCode={handleRunCode} />) : (<TabsOfCodeEditor editorHistory={gameObject.editorHistory} onChange={handleChange} handleRunCode={handleRunCode} />)}
                        <Tag secondText={""}>実行結果</Tag>
                        <Console consoleCode={Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output ? Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).output : Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).buildErrors ? Compiler({ language: gameObject.codeLanguage, sourceCode: compiledCode }).buildErrors : ''} />
                    </Content70>
                    <Project question={gameObject.questionText} secondText={""} />
                </Contents>
            )}
        </div>
    );
};