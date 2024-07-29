import React, { useEffect, useState } from 'react';
import './css/App.css';
import {DataFunc} from './components/DataFunc';

function App() {

  return (
    <>
      <DataFunc collectionId={"QUESTION_CONTENT"} documentId={"1"} field={"question"}/>
      {/* <DataFunc collectionId={"QUESTION_CONTENT"} field={"question"}/> */}
    </>
  );
}

export default App;
