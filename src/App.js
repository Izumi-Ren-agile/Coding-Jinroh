import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import { Concept } from './components/Concept';
import { Rule } from './components/Rule';
import { InputPlayer } from './components/InputPlayer';
import { DataFunc } from './components/DataFunc';
import {NightGame} from './components/NightGame';
import {ConfirmPlayer} from './components/ConfirmPlayer';
import {Question} from './components/Question';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Concept />} />
        <Route path="/rule" element={<Rule />} />
        <Route path="/inputPlayer" element={<InputPlayer />} />
        <Route path="/nightGame" element={<NightGame />}/>
        <Route path="/confirmPlayer" element={<ConfirmPlayer />}/>
        <Route path="/question" element={<Question />} />
        {/* 
        <Route path="/confirmPlayer" element={<ConfirmPlayer />} />
        
        <Route path="/naightGame" element={<NightGame />} />
        <Route path="/dayGame" element={<DayGame />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/voteResult" element={<VoteResult />} />
        <Route path="/result" element={<Result />} /> */} 
        {/* <DataFunc collectionId={"QUESTION_CONTENT"} documentId={"1"} field={"question"}/> */}
        {/* <DataFunc collectionId={"QUESTION_CONTENT"} field={"question"}/>*/}
      </Routes>
    </Router>
  );
}

export default App;
