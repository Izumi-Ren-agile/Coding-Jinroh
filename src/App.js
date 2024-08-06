import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import { Concept } from './components/page/Concept';
import { Rule } from './components/page/Rule';
import { InputPlayer } from './components/page/InputPlayer';
import {GamePage} from './components/view/GamePage';
import {VotePage} from './components/view/VotePage';
import {ConfirmPlayerPage} from './components/view/ConfirmPlayerPage';
import {Question} from './components/page/Question';
// import {Vote} from './components/page/Vote';
import {VoteResult} from './components/page/VoteResult';
import {Result} from './components/page/Result';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Concept />} />
        <Route path="/rule" element={<Rule />} />
        <Route path="/inputPlayer" element={<InputPlayer />} />
        <Route path="/gamePage" element={<GamePage />}/>
        {/* <Route path="/confirmPlayer" element={<ConfirmPlayer />}/> */}
        <Route path="/question" element={<Question />} />
        <Route path="/votePage" element={<VotePage />} />
        <Route path="/confirmPlayerPage" element={<ConfirmPlayerPage />} />
        <Route path="/voteResult" element={<VoteResult />} />
        <Route path="/result" element={<Result />} />
        {/* <DataFunc collectionId={"QUESTION_CONTENT"} documentId={"1"} field={"question"}/> */}
        {/* <DataFunc collectionId={"QUESTION_CONTENT"} field={"question"}/>*/}
      </Routes>
    </Router>
  );
}

export default App;
