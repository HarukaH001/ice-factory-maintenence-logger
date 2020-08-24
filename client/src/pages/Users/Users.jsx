import React, { useState, useEffect } from 'react'
import './Users.scss'
import { useHistory } from 'react-router-dom';
import { Button, InputGroup, FormControl, Modal, Form, Toast } from 'react-bootstrap'
import { NavDropdown } from '../../components'
import firebase, { Authen } from '../../services/service.js'

export const Users = () => {
  const history = useHistory()
  const [user, setUser] = useState([])
  const [alert, setAlert] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); setAlert('')}
  const handleShow = () => setShow(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const toggleShowSuccess = () => setShowSuccess(!showSuccess);

  const addUser = (e) => {
    setAlert('')
    e.preventDefault()
    const registerForm = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      isAdmin: document.getElementById("admincheckbox").checked
    }
    if (user.some(ele => ele.username === registerForm.username)) {
      setAlert("ชื่อผู้ใช้นี้มีผู้ใช้งานอยู่แล้ว")
    }
    else if (registerForm.password.length < 6){
      setAlert("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
    }
    else {
      Authen.addUser(registerForm.username, registerForm.password, registerForm.isAdmin).then(()=>{
        handleClose()
        toggleShowSuccess()
      })
    }
  }

  useEffect(() => {
    if (firebase.auth().currentUser) {
      // Authen.getUserList().then(res => {
      //   setUser(res)
      // })
      Authen.getUsersRef().on('value',snapshot=>{
        const Data = Object.entries(snapshot.val()).map(ele => {
          ele[1].uid = ele[0]
          return ele[1]
        })
        setUser(Data)
      })
    }
  }, [])

  function renderUser(){

    return user.sort((a,b)=>sortByTimeStampGeneratedEmail(a,b,'Asd')).map(ele=> {
      return ( //ทำ component มา render ที่นี่
          <p key={ele.uid}>{"ชื่อผู้ใช้: "+ele.username+" รหัสผ่าน: "+ele.password+" สิทธิ:"+ele.role}</p>
        )
    })
  }

  function sortByTimeStampGeneratedEmail(a,b,option='Des'){
    if(option === 'Asd'){
      return parseInt((a.email).substring(0,(a.email).indexOf('@'))) - parseInt((b.email).substring(0,(b.email).indexOf('@')))
    } else {
      return parseInt((b.email).substring(0,(b.email).indexOf('@'))) - parseInt((a.email).substring(0,(a.email).indexOf('@')))
    }
  }

  return (
    <>
      <div className="Users">
        <div className="container">
          <div className="users-container">
            <div className="header">
              <h2 style={{ fontStyle: "Bold" }}>จัดการผู้ใช้</h2>
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
              {renderUser()}
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered style={{ fontFamily: "IBM Plex Sans Thai" }}>
        <Form onSubmit={(e) => { addUser(e) }}>
          <Modal.Header closeButton>
            <Modal.Title style={{width: "100%"}}>เพิ่มผู้ใช้ใหม่</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="username">
              <Form.Label style={{width: "100%"}}>ชื่อผู้ใช้</Form.Label>
              <Form.Control type="text" placeholder="กรอกชื่อผู้ใช้" required={true} />
              {alert !== '' ?
                <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>{alert}</p> : null}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label style={{width: "100%"}}>รหัสผ่าน</Form.Label>
              <Form.Control type="password" placeholder="กรอกรหัสผ่าน" required={true} />
            </Form.Group>
            <Form.Group controlId="admincheckbox">
              <Form.Check type="checkbox" label="ตั้งเป็นผู้ดูแล" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={() => { handleClose() }}>ยกเลิก</Button>
            <Button variant="primary" type="submit">บันทึก</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Toast show={showSuccess} onClose={toggleShowSuccess} delay={3000} autohide
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          backgroundColor: '#28A745',
          color: 'white',
          transform: 'translateX(-50%)',
          width: "100%",
          textAlign: "center"
        }}>
        <Toast.Body>เพิ่มผู้ใช้สำเร็จ</Toast.Body>
      </Toast>
    </>
  )
}