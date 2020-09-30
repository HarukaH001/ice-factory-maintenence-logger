import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Sites, Users, Subsite, Machine, Error, Add } from './pages';
import { Data, Authen } from './services/service.js'

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [isAdmin, setAdmin] = useState(false)
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  })

  useEffect(() => {
    Authen.auth().onAuthStateChanged(user => {
      if (user) {
        if (window.location.pathname.includes('/login')) window.location.href = '/'
        Authen.getUser().then(res => {
          if(res.role === 'admin'){
            setAdmin(true)
          }
          setAuthenticated(true)
          if((window.location.pathname.includes('/users') || window.location.pathname.includes('/sites')) &&  res.role === 'user' && !(window.location.pathname.includes('/404'))) {
            console.log(('KUY'));
            window.location.href = '/404'
          }
        })
        console.log('Logged in')
      } else {
        if (!window.location.pathname.includes('/login')) window.location.href = '/login'
        setAuthenticated(false)
        setAdmin(false)
        console.log('Logged out')
      }
    })
  }, [])

  useEffect(() => {
    if(isAuthenticated){
      Data.getSitesRef().on('value', snapshot => {
        if (snapshot) {
          if (snapshot.val()) {
            const Data = Object.entries(snapshot.val()).map(ele => {
              ele[1].sid = ele[0]
              return ele[1]
            })
            const localContent = Data.map(ele=>{
              return ele.sid
            })
            window.localStorage.setItem("site",JSON.stringify(localContent))
          }
          else{
            window.localStorage.removeItem("site")
          }
        }
      })
  
      return () => {
        Data.getSitesRef().off()
      }
    }
  }, [isAuthenticated])


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">{isAuthenticated && <Home />}</Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/users">{isAuthenticated && isAdmin && <Users />}</Route>
          <Route exact path="/sites">{isAuthenticated && isAdmin && <Sites />}</Route>
          <Route exact path="/sites/:num">{isAuthenticated && isAdmin && <Subsite />}</Route>
          <Route exact path="/sites/:num/:machine">{isAuthenticated && isAdmin && <Machine />}</Route>
          <Route exact path="/add">{isAuthenticated && <Add />}</Route>
          <Route path="/"><Error /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
