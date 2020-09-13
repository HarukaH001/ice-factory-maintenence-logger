import React, { useEffect, useState } from 'react'
import './Subsite.scss'
import { Link, useHistory, useParams, useRouteMatch, useLocation } from 'react-router-dom';
import { Button, InputGroup, FormControl, Modal, Toast } from 'react-bootstrap'
import firebase, { Data, Authen } from '../../services/service'

export const Subsite = () => {
  const history = useHistory()
  const { num } = useParams()
  const { path, url } = useRouteMatch()
  const [machine, setMachine] = useState([])
  const [input, setInput] = useState("")

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const del = useQuery().get("deleted")

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => { setShowModal(false) }
  const handleShow = () => { setShowModal(true) }

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
  const toggleShowDeleteSuccess = () => setShowDeleteSuccess(!showDeleteSuccess)

  const [showAddSuccess, setShowAddSuccess] = useState(false)
  const toggleShowAddSuccess = () => setShowAddSuccess(!showAddSuccess)

  const [showAddFail, setShowAddFail] = useState(false)
  const toggleShowAddFail = () => setShowAddFail(!showAddFail)

  useEffect(() => {
    Data.getMachineRef(num).on('value', snapshot => {
      if (snapshot) {
        if (snapshot.val()) {
          const Data = Object.entries(snapshot.val()).map(ele => {
            ele[1].mid = ele[0]
            return ele[1]
          })
          setMachine(Data)
        } else setMachine([])
      }
    })

    return () => {
      Data.getMachineRef(num).off()
    }
  }, [])

  function addMachineHandler(e) {
    e.preventDefault()
    const name = document.getElementById('machine-name').value
    setInput(name)
    if (name !== '') {
      if (machine.length > 0) {
        if (machine.find(ele => ele.mid === name)) {
          document.getElementById('machine-name').value = ''
          return toggleShowAddFail()
        }
      }
      Data.addMachine(num, name).then(() => {
        document.getElementById('machine-name').value = ''
        toggleShowAddSuccess()
      })
    }
  }

  function deleteSiteHandler(e) {
    e.preventDefault()
    handleClose()
    Data.deleteSite(num).then(() => {
      history.push("/sites?deleted=" + num)
    })
  }

  useEffect(() => {
    if (del) {
      toggleShowDeleteSuccess()
    }
  }, [del])

  return (
    <div className="Subsite">
      <div className="container">
        <div className="header">
          <Button variant="light" onClick={() => history.push("/sites")}>&#xF053;</Button>
          <h2>บ่อ {num}</h2>
          <Button variant="outline-danger" title="ลบหน้านี้" style={{ fontSize: "20px" }} onClick={handleShow}>&#xf1f8;</Button>
        </div>
        <InputGroup className="add-machine">
          <FormControl
            id="machine-name"
            placeholder="เพิ่มเครื่องจักร"
            aria-label="เพิ่มเครื่องจักร"
          />
          <InputGroup.Append>
            <Button variant="primary" onClick={addMachineHandler}>เพิ่ม</Button>
          </InputGroup.Append>
        </InputGroup>
        <div className="btn-container">
          {machine.map((ele, i) => { return <Link key={i} to={`${url}/` + ele.mid}><Button variant="success">{ele.mid}</Button></Link> })}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} centered style={{ fontFamily: "IBM Plex Sans Thai" }} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title style={{ width: "100%" }}>ลบ "บ่อ {num}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong style={{ color: "#dc3545", display: "inline" }}>เครื่องจักร ตำแหน่งซ่อม และรายการอะไหล่ที่อยู่ในบ่อนี้จะถูกลบทั้งหมด</strong>{" "}
          <p style={{ color: "#dc3545", display: "inline" }}>คุณแน่ใจหรือไม่ว่าต้องการลบ "บ่อ {num}" ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>ยกเลิก</Button>
          <Button variant="danger" type="button" onClick={deleteSiteHandler}>ลบ</Button>
        </Modal.Footer>
      </Modal>

      <Toast show={showDeleteSuccess} onClose={() => { toggleShowDeleteSuccess(); history.replace("/sites/" + num) }} delay={3500} autohide
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
        <Toast.Body><b style={{ fontSize: "18px" }}>ลบ {del} เรียบร้อยแล้ว</b></Toast.Body>
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
        <Toast.Body><b style={{ fontSize: "18px" }}>เพิ่ม {input} เรียบร้อยแล้ว</b></Toast.Body>
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
        <Toast.Body><b style={{ fontSize: "18px" }}>{input} มีอยู่แล้วกรุณาตั้งชื่ออื่น</b></Toast.Body>
      </Toast>
    </div>
  )
}