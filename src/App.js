import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import { Concept } from './components/page/Concept';
import { Rule } from './components/page/Rule';
import { InputPlayer } from './components/page/InputPlayer';
import {ConfirmPlayerPage} from './components/view/ConfirmPlayerPage';
import {Question} from './components/page/Question';
import {GamePage} from './components/view/GamePage';
import {VotePage} from './components/view/VotePage';
import {VoteResultPage} from './components/view/VoteResultPage';
import {Result} from './components/page/Result';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Concept />} />
        <Route path="/rule" element={<Rule />} />
        <Route path="/inputPlayer" element={<InputPlayer />} />
        <Route path="/confirmPlayerPage" element={<ConfirmPlayerPage />} />
        <Route path="/question" element={<Question />} />
        <Route path="/gamePage" element={<GamePage />}/>
        <Route path="/votePage" element={<VotePage />} />
        <Route path="/voteResultPage" element={<VoteResultPage />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
