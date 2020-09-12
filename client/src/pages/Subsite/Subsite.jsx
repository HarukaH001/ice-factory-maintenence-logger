import React, { useEffect, useState } from 'react'
import './Subsite.scss'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Button, InputGroup, FormControl, Modal } from 'react-bootstrap'
import firebase, { Data, Authen } from '../../services/service'

export const Subsite = () => {
  const history = useHistory()
  const { num } = useParams()
  const { path, url } = useRouteMatch()
  const [machine, setMachine] = useState([])

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => { setShowModal(false) }
  const handleShow = () => { setShowModal(true) }

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
    if (name !== '') {
      if (machine.length > 0) {
        if (machine.find(ele => ele.mid === name)) {
          document.getElementById('machine-name').value = ''
          return
        }
      }
      Data.addMachine(num, name).then(() => {
        document.getElementById('machine-name').value = ''
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

  return (
    <div className="Subsite">
      <div className="container">
        <div className="header">
          <Button variant="light" onClick={() => history.goBack()}>&#xF053;</Button>
          <h2>บ่อ {num}</h2>
          <Button variant="outline-danger" onClick={handleShow}>ลบ</Button>
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
          <strong style={{ color: "red", display: "inline" }}>เครื่องจักร ตำแหน่งซ่อม และรายการอะไหล่ที่อยู่ในบ่อนี้จะถูกลบทั้งหมด</strong>{" "}
          <p style={{ color: "red", display: "inline" }}>คุณแน่ใจหรือไม่ว่าต้องการลบ "บ่อ {num}" ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>ยกเลิก</Button>
          <Button variant="danger" type="button" onClick={deleteSiteHandler}>ลบ</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}