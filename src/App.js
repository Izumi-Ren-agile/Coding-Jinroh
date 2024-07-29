import React, { useEffect, useState } from "react";
import "./css/App.css";
import { DataFunc } from "./components/DataFunc";
import { CompileTest } from "./components/CompilerAsComponent";
import {Compiler} from "./components/CompilerAsMethod"

function App() {
  return (
    <>
      <DataFunc
        collectionId={"QUESTION_CONTENT"}
        documentId={"1"}
        field={"question"}
      />
      {/* <DataFunc collectionId={"QUESTION_CONTENT"} field={"question"}/> */}
      <CompileTest
        language="java"
        sourceCode='public class Main {
    public static void main(String[] args) {
    int a=1;
    int b=10
        System.out.println(a+b+"キリンリキ");
    }
}
'
      />
      <p>{Compiler({language:"python3",sourceCode:'print("jsdhausdnua")'}).output}</p>
    </>
  );
}

export default App;
