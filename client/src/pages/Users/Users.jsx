import React, { useState } from 'react'
import './Users.scss'
import { Link, useHistory } from 'react-router-dom';
import { Button, InputGroup, FormControl, Modal, Form } from 'react-bootstrap'
import { NavDropdown } from '../../components'

export const Users = () => {
  const history = useHistory()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function addUser() {
    // Your function here
  }

  return (
    <>
      <div className="Users">
        <div className="container">
          <div className="users-container">
            <div className="header">
              <h2 style={{ fontStyle: "Bold" }}>จัดการบัญชี</h2>
              <NavDropdown _disabled={"users"}></NavDropdown>
            </div>
            <InputGroup className="search-user">
              <FormControl
                placeholder="&#xF002;  ค้นหาผู้ใช้"
                aria-label="ค้นหาผู้ใช้"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <Button variant="primary" className="add-user-btn" onClick={handleShow}>+ เพิ่มผู้ใช้ใหม่</Button>
            <div className="btn-container">
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered style={{ fontFamily: "IBM Plex Sans Thai" }}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มผู้ใช้</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control type="text" placeholder="กรอกชื่อผู้ใช้" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control type="password" placeholder="กรอกรหัสผ่าน" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="cancel" onClick={() => { handleClose() }}>ยกเลิก</Button>
            <Button variant="primary" type="submit" onClick={() => { addUser(); handleClose() }}>บันทึก</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}