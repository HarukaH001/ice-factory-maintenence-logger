import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Machine, Users } from './pages';


function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${ vh }px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${ vh }px`);
  })


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/users"><Users /></Route>
          <Route exact path="/machines"><Machine /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
