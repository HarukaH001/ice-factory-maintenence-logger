import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Sites, Users, Subsite } from './pages';
import { Authen } from './services/service.js'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false)

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${ vh }px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${ vh }px`);
  })

  useEffect(()=>{
    Authen.auth().onAuthStateChanged(user=>{
      // console.log(user)
      if(user){
        if(window.location.pathname.includes('/login')) window.location.href = '/'
        Authen.getUser().then(res=>{
          setAuthenticated(true)
        })
        console.log('Logged in')
  
      } else {
        if(!window.location.pathname.includes('/login')) window.location.href = '/login'
        setAuthenticated(false)
        console.log('Logged out')
      }
    })
  },[])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">{isAuthenticated && <Home />}</Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/users">{isAuthenticated && <Users />}</Route>
          <Route exact path="/sites">{isAuthenticated && <Sites />}</Route>
          <Route exact path="/test"><Subsite /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
