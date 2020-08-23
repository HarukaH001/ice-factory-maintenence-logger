import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Machine, Users } from './pages';
import Service from './services/service.js'


function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${ vh }px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${ vh }px`);
  })

  useEffect(()=>{
    Service.getAuthen().auth().onAuthStateChanged(user=>{
      // console.log(user)
      if(user){
        // window.location.href = '/'
        console.log('Logged in')
  
      } else {
        // if(!window.location.pathname.includes('/login')) window.location.href = '/login'
        console.log('Logged out')
      }
    })
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
