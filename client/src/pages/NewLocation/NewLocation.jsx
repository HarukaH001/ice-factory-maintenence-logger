import React, { useState } from 'react'
import './NewLocation.scss'
import { useHistory } from 'react-router-dom'
import { Button, InputGroup, Form, FormControl, Modal } from 'react-bootstrap'

export const NewLocation = () => {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => { setShowModal(false) }
  const handleShow = () => { setShowModal(true) }

  return (
    <div className="NewLocation">
      <div className="container">
        <div className="header">
          <h2>เพิ่มตำแหน่งซ่อม</h2>
        </div>
        <div className="form">
          <Form.Group controlId="location">
            <Form.Label style={{ width: "100%" }}>ตำแหน่ง</Form.Label>
            <Form.Control type="text" placeholder="เพิ่มตำแหน่งที่ซ่อม" required={true} />
          </Form.Group>
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
        </div>
        <div className="footer">
          <div className="line"></div>
          <div className="btn-container">
            <Button variant="secondary" onClick={handleShow}>ยกเลิก</Button>
            <Button>บันทึก</Button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} centered style={{ fontFamily: "IBM Plex Sans Thai" }} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title style={{ width: "100%" }}>ละทิ้ัง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>คุณแน่ใจหรือไม่ว่าต้องการละทิ้ง?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>ยกเลิก</Button>
          <Button variant="danger" type="submit" onClick={history.goBack}>ละทิ้ง</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}