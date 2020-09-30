import React, { useState, useEffect } from 'react'
import './Home.scss'
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Form, Toast } from 'react-bootstrap'
import { HistoryCard, NavDropdown } from '../../components'
import { Authen, Data } from '../../services/service';

import stringSimilarity from 'string-similarity'

export const Home = () => {
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [log, setLog] = useState([])
  const [user, setUser] = useState()

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const del = useQuery().get("deleted")

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
  const toggleShowDeleteSuccess = () => setShowDeleteSuccess(!showDeleteSuccess)

  useEffect(() => {
    Authen.getUser().then(value => {
      setUser(value)
    })
  }, [])

  useEffect(() => {
    if (user) {
      Data.getRecordRef().on('value', snapshot => {
        if (snapshot) {
          if (snapshot.val()) {
            const Data = Object.entries(snapshot.val()).map(ele => {
              ele[1].lid = ele[0]
              return ele[1]
            })
            Data.sort((a, b) => b.lid - a.lid)
            setLog(Data)
          } else setLog([])
        }
      })

      return () => {
        Data.getRecordRef().off()
      }
    }
  }, [user])

  useEffect(() => {
    if (del) toggleShowDeleteSuccess()
  }, [del])



  function customSearch(search, presearch){
    const keyword = search.split(' ');
    const target = ["location","position","machine","technician","dd","mm","yyyy","lid"]
    target.reverse()

    return presearch.map(ele=>{
      let percent = 0
      target.forEach((tg,i)=>{
        let weight = 0
        keyword.forEach(kw=>{
          if(ele[tg]){
              const temp = ele[tg]+""
              if(kw.length > 1){
                weight += stringSimilarity.compareTwoStrings(kw.toLowerCase(), temp.toLowerCase())
              }
              else{

                if(temp.toLowerCase().includes(kw.toLowerCase())){
                  weight += 1/temp.length
                }
              }
            }
        })
        percent += weight*(i+1)
      })
      ele.percent = percent
      return ele
    }).sort((a,b)=>{
      return b.percent - a.percent
    })
    
  }

  function cardRender(search) {
    const presearch = log.map(ele=>{
      const date = new Date(ele.date)
        ele.dd = date.getDate()
        ele.mm = date.getMonth()+ 1
        ele.yyyy = date.getFullYear()
      return ele
    })
    const output = customSearch(search, presearch)

    if(search){
      return output.map((ele,i)=>{
        return (<HistoryCard user={user} data={ele} key={i} />)
      })
    } else {
      return log.map((ele,i)=>{
        return (<HistoryCard user={user} data={ele} key={i} />)
      })
    }
  }

  return (
    <div className="Home">
      <div className="container">
        <div className="home-container">
          <div className="header">
            <h2 style={{ fontStyle: "Bold" }}>การซ่อมบำรุง</h2>
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
      <Toast show={showDeleteSuccess} onClose={() => { toggleShowDeleteSuccess(); history.replace("") }} delay={3500} autohide
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          backgroundColor: '#28a745',
          color: 'white',
          transform: 'translateX(-50%)',
          width: "100%",
          textAlign: "center"
        }}>
        <Toast.Body><b style={{ fontSize: "18px" }}>ลบรายการซ่อม #{del} เรียบร้อยแล้ว</b></Toast.Body>
      </Toast>
    </div>
  )
}