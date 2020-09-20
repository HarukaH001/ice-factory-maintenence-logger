import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Sites, Users, Subsite, Machine, Error, Add } from './pages';
import { Data, Authen } from './services/service.js'

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false)

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  })

  useEffect(() => {
    Authen.auth().onAuthStateChanged(user => {
      // console.log(user)
      if (user) {
        if (window.location.pathname.includes('/login')) window.location.href = '/'
        Authen.getUser().then(res => {
          setAuthenticated(true)
        })
        console.log('Logged in')

      } else {
        if (!window.location.pathname.includes('/login')) window.location.href = '/login'
        setAuthenticated(false)
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
          // else setSite([])
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
          <Route exact path="/users">{isAuthenticated && <Users />}</Route>
          <Route exact path="/sites">{isAuthenticated && <Sites />}</Route>
          <Route exact path="/sites/:num">{isAuthenticated && <Subsite />}</Route>
          <Route exact path="/sites/:num/:machine">{isAuthenticated && <Machine />}</Route>
          <Route exact path="/add">{isAuthenticated && <Add />}</Route>
          <Route path="/"><Error /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
