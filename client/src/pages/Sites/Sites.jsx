import React, { useEffect, useState } from 'react'
import './Sites.scss'
import { Link, useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import { Button, InputGroup, FormControl, Toast } from 'react-bootstrap'
import { NavDropdown } from '../../components'
import firebase, { Data, Authen } from '../../services/service'

export const Sites = () => {
  const { path, url } = useRouteMatch()
  const [site, setSite] = useState([])
  const history = useHistory()
  const [input, setInput] = useState("")

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const del = useQuery().get("deleted")

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
  const toggleShowDeleteSuccess = () => setShowDeleteSuccess(!showDeleteSuccess)

  const [showAddSuccess, setShowAddSuccess] = useState(false)
  const toggleShowAddSuccess = () => setShowAddSuccess(!showAddSuccess)

  const [showAddFail, setShowAddFail] = useState(false)
  const toggleShowAddFail = () => setShowAddFail(!showAddFail)

  useEffect(() => {
    Data.getSitesRef().on('value', snapshot => {
      if (snapshot) {
        if (snapshot.val()) {
          const Data = Object.entries(snapshot.val()).map(ele => {
            ele[1].sid = ele[0]
            return ele[1]
          })
          setSite(Data)
        } else setSite([])
      }
    })

    return () => {
      Data.getSitesRef().off()
    }
  }, [])

  useEffect(() => {
    if (del) {
      toggleShowDeleteSuccess()
    }
  }, [del])

  function addSiteHandler(e) {
    e.preventDefault()
    const name = document.getElementById('site-name').value
    setInput(name)
    if (name !== '') {
      if (site.length > 0) {
        if (site.find(ele => ele.sid === name)) {
          document.getElementById('site-name').value = ''
          return toggleShowAddFail()
        }
      }
      Data.addSite(name).then(() => {
        document.getElementById('site-name').value = ''
        toggleShowAddSuccess()
      })
    }
  }

  return (
    <div className="Sites">
      <div className="container">
        <div className="site-container">
          <div className="header">
            <h2 style={{ fontStyle: "Bold" }}>จัดการบ่อ</h2>
            <NavDropdown _disabled={"sites"}></NavDropdown>
          </div>
          <InputGroup className="add-site">
            <FormControl
              id="site-name"
              placeholder="เพิ่มบ่อ"
              aria-label="เพิ่มบ่อ"
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={addSiteHandler}>เพิ่ม</Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="btn-container">
            {site.map((ele, i) => { return <Link key={i} to={`${url}/` + ele.sid}><Button variant="success">{"บ่อ " + ele.sid}</Button></Link> })}
          </div>
        </div>
      </div>
      <Toast show={showDeleteSuccess} onClose={() => { toggleShowDeleteSuccess(); history.replace("/sites") }} delay={3500} autohide
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          backgroundColor: '#17a2b8',
          color: 'white',
          transform: 'translateX(-50%)',
          width: "100%",
          textAlign: "center"
        }}>
        <Toast.Body><b style={{ fontSize: "18px" }}>ลบบ่อ {del} เรียบร้อยแล้ว</b></Toast.Body>
      </Toast>

      <Toast show={showAddSuccess} onClose={toggleShowAddSuccess} delay={3500} autohide
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          backgroundColor: '#28a745',
          color: 'white',
          transform: 'translateX(-50%)',
          width: "100%",
          textAlign: "center"
        }}>
        <Toast.Body><b style={{ fontSize: "18px" }}>เพิ่มบ่อ {input} เรียบร้อยแล้ว</b></Toast.Body>
      </Toast>

      <Toast show={showAddFail} onClose={toggleShowAddFail} delay={5000} autohide
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          backgroundColor: '#dc3545',
          color: 'white',
          transform: 'translateX(-50%)',
          width: "100%",
          textAlign: "center"
        }}>
        <Toast.Body><b style={{ fontSize: "18px" }}>บ่อ {input} มีอยู่แล้วกรุณาตั้งชื่ออื่น</b></Toast.Body>
      </Toast>
    </div>
  )
}