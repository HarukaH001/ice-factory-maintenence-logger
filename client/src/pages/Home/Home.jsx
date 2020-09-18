import React, { useState, useEffect } from 'react'
import './Home.scss'
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'
import { HistoryCard, NavDropdown } from '../../components'
import { Authen, Data } from '../../services/service';

export const Home = () => {
  // const history = useHistory()
  const [search, setSearch] = useState('')
  const [log, setLog] = useState([])
  const [user, setUser] = useState()

  useEffect(()=>{
    Authen.getUser().then(value=>{
      setUser(value)
    })
  },[])

  useEffect(() => {
    if(user){
      Data.getRecordRef().on('value', snapshot => {
        if(snapshot){
          if(snapshot.val()) {
            const Data = Object.entries(snapshot.val()).map(ele=>{
              ele[1].lid = ele[0]
              return ele[1]
            })
            Data.sort((a,b)=>b.lid-a.lid)
            setLog(Data)
          } else setLog([])
        }
      })
  
      return () => {
        Data.getRecordRef().off()
      }
    }
  }, [user])

  function cardRender(search) {
    return log.map((ele, i) => {
      if (search) {
        if (ele.machine.includes(search) || ele.location.includes(search)) {
          return (<HistoryCard user={user} data={ele} key={i} />)
        }
        else return null
      }
      else {
        return (<HistoryCard user={user} data={ele} key={i} />)
      }
    })
  }

  return (
    <div className="Home">
      <div className="container">
        <div className="home-container">
          <div className="header">
            <h2 style={{ fontStyle: "Bold" }}>ประวัติการซ่อม</h2>
            <NavDropdown _disabled={"home"}></NavDropdown>
          </div>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="&#xF002;  ค้นหารายการ" onInput={(e) => setSearch(e.target.value)} />
          </Form.Group>
          <Link to="/add"><Button variant="primary" className="add-btn">+ เพิ่มรายการซ่อม</Button></Link>
          <div className="card-wrapper">
            {cardRender(search)}
          </div>
        </div>
      </div>
    </div>
  )
}