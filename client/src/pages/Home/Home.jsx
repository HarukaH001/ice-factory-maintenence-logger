import React, { useState, useEffect } from 'react'
import './Home.scss'
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Form, Toast } from 'react-bootstrap'
import { HistoryCard, NavDropdown } from '../../components'
import { Authen, Data } from '../../services/service';
import Fuse from 'fuse.js'

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

  function cardRender(search) {
    const presearch = log.map(ele=>{
      const date = new Date(ele.date)
      ele.dateObj = {
        dd: date.getDate(),
        mm: date.getMonth() + 1,
        yyyy: date.getFullYear()
      }
      return ele
    })

    const options = {
      keys: [
        "lid",
        "location",
        "position",
        "technician",
        "machine",
        "part.rid",
        "part.status",
        "dateObj.dd",
        "dateObj.mm",
        "dateObj.yyyy",
        "note",
      ]
    }
    const fuse = new Fuse(presearch, options)

    if(search){
      const result = fuse.search(search)
      // console.log(result)
      return result?result.map((ele,i)=>{
        return (<HistoryCard user={user} data={ele.item} key={i} />)
      }):[]
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