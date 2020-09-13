import React, { useEffect, useState } from 'react'
import './Machine.scss'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Button, Modal, InputGroup, Form, FormControl } from 'react-bootstrap'
import firebase, { Data, Authen } from '../../services/service'

export const Machine = () => {
  const history = useHistory()
  const { path, url } = useRouteMatch()
  const { machine, num } = useParams()

  const locationList = ["ฝั่งมอเตอร์", "ฝั่งวาล์วดูด"]
  const partList = ["ลิ้นไอดี", "ลิ้นไอเสีย", "ลูกสูบ"]

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => { setShowModal(false) }
  const handleShow = () => { setShowModal(true) }

  function deleteMachineHandler(e) {
    e.preventDefault()
    handleClose()
    Data.deleteMachine(num, machine).then(() => {
      history.push("/sites/" + num + "?deleted=" + machine)
    })
  }

  return (
    <div className="Machine">
      <div className="container">
        <div className="header">
          <Button variant="light" onClick={() => history.push("/sites/" + num)}>&#xF053;</Button>
          <h2>{machine}</h2>
          <Button variant="outline-danger" title="ลบหน้านี้" style={{ fontSize: "20px" }} onClick={handleShow}>&#xf1f8;</Button>
        </div>
        <div className="form">
          <InputGroup className="location">
            <Form.Label style={{ width: "100%" }}>เพิ่มตำแหน่งที่ซ่อม</Form.Label>
            <FormControl
              placeholder="เพิ่มตำแหน่งที่ซ่อม"
              aria-label="เพิ่มตำแหน่งที่ซ่อม"
            />
            <InputGroup.Append>
              <Button variant="primary">เพิ่ม</Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="tag-wrapper">
            {locationList.map((ele, i) => <Tag key={i} content={ele} />)}
          </div>
          <InputGroup className="list">
            <Form.Label style={{ width: "100%" }}>รายการสิ่งที่จะซ่อม</Form.Label>
            <FormControl
              placeholder="เพิ่มรายการอะไหล่"
              aria-label="เพิ่มรายการอะไหล่"
            />
            <InputGroup.Append>
              <Button variant="primary">เพิ่ม</Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="tag-wrapper">
            {partList.map((ele, i) => <Tag key={i} content={ele} />)}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} centered style={{ fontFamily: "IBM Plex Sans Thai" }} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title style={{ width: "100%" }}>ลบ "{machine}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong style={{ color: "#dc3545", display: "inline" }}>ตำแหน่งซ่อม และรายการอะไหล่ที่เกี่ยวข้องจะถูกลบทั้งหมด</strong>{" "}
          <p style={{ color: "#dc3545", display: "inline" }}>คุณแน่ใจหรือไม่ว่าต้องการลบ "{machine}" ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>ยกเลิก</Button>
          <Button variant="danger" type="button" onClick={deleteMachineHandler}>ลบ</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const Tag = ({ content }) => {

  function deleteXXXX() {
    alert(content)
  }

  return (
    <div className="Tag">
      <h5>{content}</h5>
      <button title="ลบรายการนี้" onClick={() => deleteXXXX(content)}>&#xf00d;</button>
    </div>
  )
}