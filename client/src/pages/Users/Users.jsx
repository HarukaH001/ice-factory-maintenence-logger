import React, { useState, useEffect } from 'react'
import './Users.scss'
import { useHistory } from 'react-router-dom';
import { Button, InputGroup, FormControl, Modal, Form, Toast, Table } from 'react-bootstrap'
import { NavDropdown } from '../../components'
import firebase, { Authen } from '../../services/service.js'

export const Users = () => {
  const history = useHistory()
  const [user, setUser] = useState([])
  const [alert, setAlert] = useState('')
  const [edit, setEdit] = useState(false)
  const [userDetail, setUserDetail] = useState({})

  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); setAlert('') }
  const handleShow = () => setShow(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const toggleShowSuccess = () => setShowSuccess(!showSuccess);

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const toggleShowDeleteSuccess = () => setShowDeleteSuccess(!showDeleteSuccess);

  const [showDetail, setShowDetail] = useState(false);
  const handleCloseDetail = () => { setShowDetail(false); setEdit(false) }
  const handleCloseEdit = () => { setEdit(false) }
  const handleShowDetail = (select) => { setShowDetail(true); setUserDetail(select) };

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => { setShowDelete(false); setEdit(false) }
  const handleShowDelete = () => { handleCloseDetail(); setShowDelete(true) }

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
    else if (registerForm.password.length < 6) {
      setAlert("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
    }
    else {
      Authen.addUser(registerForm.username, registerForm.password, registerForm.isAdmin).then(() => {
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
      Authen.getUsersRef().on('value', snapshot => {
        const Data = Object.entries(snapshot.val()).map(ele => {
          ele[1].uid = ele[0]
          return ele[1]
        })
        setUser(Data)
      })
    }
  }, [])

  useEffect(()=>{
    const selectedUser = user.find(ele=>userDetail.uid===ele.uid)
    setUserDetail(selectedUser?selectedUser:{})
  },[user])

  function renderUser() {

    return user.sort((a, b) => sortByTimeStampGeneratedEmail(a, b, 'Asd')).map((ele, i) => {
      return ( //ทำ component มา render ที่นี่
        <tr onClick={() => handleShowDetail(ele)} style={{ cursor: "pointer" }} key={ele.uid}>
          <td>{i + 1}</td>
          <td>{ele.username}</td>
          <td>{ele.password}</td>
        </tr>
      )
    })
  }

  function sortByTimeStampGeneratedEmail(a, b, option = 'Des') {
    if (option === 'Asd') {
      return parseInt((a.email).substring(0, (a.email).indexOf('@'))) - parseInt((b.email).substring(0, (b.email).indexOf('@')))
    } else {
      return parseInt((b.email).substring(0, (b.email).indexOf('@'))) - parseInt((a.email).substring(0, (a.email).indexOf('@')))
    }
  }

  function editUser(e) {
    e.preventDefault()
    handleCloseEdit()
  }

  function deleteUser(e) {
    e.preventDefault()
    Authen.removeUser(userDetail.uid).then(() => {
      handleCloseDelete()
      toggleShowDeleteSuccess()
    })
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
            <div className="table-container">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: "10px" }}>#</th>
                    <th>ชื่อผู้ใช้</th>
                    <th>รหัสผ่าน</th>
                  </tr>
                </thead>
                <tbody>
                  {renderUser()}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered style={{ fontFamily: "IBM Plex Sans Thai" }}>
        <Form onSubmit={(e) => { addUser(e) }}>
          <Modal.Header closeButton>
            <Modal.Title style={{ width: "100%" }}>เพิ่มผู้ใช้ใหม่</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="username">
              <Form.Label style={{ width: "100%" }}>ชื่อผู้ใช้</Form.Label>
              <Form.Control type="text" placeholder="กรอกชื่อผู้ใช้" required={true}
                style={alert.includes("ชื่อผู้ใช้") ? {
                  borderColor: "red",
                  backgroundColor: "#ffe6e6"
                } : {}} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label style={{ width: "100%" }}>รหัสผ่าน</Form.Label>
              <Form.Control type="password" placeholder="กรอกรหัสผ่าน" required={true}
                style={alert.includes("รหัสผ่าน") ? {
                  borderColor: "red",
                  backgroundColor: "#ffe6e6"
                } : {}} />
            </Form.Group>
            <Form.Group controlId="admincheckbox">
              <Form.Check type="checkbox" label="ตั้งเป็นผู้ดูแล" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {alert !== '' ?
              <p style={{ color: "red", fontSize: "16px", marginTop: "10px" }}>{alert}</p> : null}
            <Button variant="secondary" type="button" onClick={() => { handleClose() }}>ยกเลิก</Button>
            <Button variant="primary" type="submit">บันทึก</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Toast show={showSuccess} onClose={toggleShowSuccess} delay={4000} autohide
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
        <Toast.Body><b style={{ fontSize: "18px" }}>เพิ่มผู้ใช้สำเร็จ</b></Toast.Body>
      </Toast>
      <Toast show={showDeleteSuccess} onClose={toggleShowDeleteSuccess} delay={4000} autohide
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
        <Toast.Body><b style={{ fontSize: "18px" }}>ลบผู้ใช้สำเร็จ</b></Toast.Body>
      </Toast>

      <Modal show={showDetail} onHide={handleCloseDetail} centered style={{ fontFamily: "IBM Plex Sans Thai" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%" }}>{edit ? "แก้ไขรายละเอียดผู้ใช้" : "รายละเอียดผู้ใช้"}</Modal.Title>
        </Modal.Header>
        {edit ? <>
          <Form onSubmit={(e) => { editUser(e) }}>
            <Modal.Body>
              <Form.Group controlId="username">
                <Form.Label style={{ width: "100%" }}>ชื่อผู้ใช้</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อผู้ใช้" defaultValue={userDetail.username} required={true}
                  style={alert.includes("ชื่อผู้ใช้") ? {
                    borderColor: "red",
                    backgroundColor: "#ffe6e6"
                  } : {}} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label style={{ width: "100%" }}>รหัสผ่าน</Form.Label>
                <Form.Control type="text" placeholder="กรอกรหัสผ่าน" defaultValue={userDetail.password} required={true}
                  style={alert.includes("รหัสผ่าน") ? {
                    borderColor: "red",
                    backgroundColor: "#ffe6e6"
                  } : {}} />
              </Form.Group>
              <Form.Group controlId="admincheckbox">
                {firebase?.auth().currentUser.uid !== userDetail.uid && <Form.Check type="checkbox" label="ตั้งเป็นผู้ดูแล" defaultChecked={userDetail.role === 'admin' ? true : false} />}
              </Form.Group>
              {firebase?.auth().currentUser.uid !== userDetail.uid && <Button style={{ width: "100%" }} variant="outline-danger" type="button" onClick={handleShowDelete}>ลบผู้ใช้นี้</Button>}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" type="button" onClick={() => setEdit(false)}>ยกเลิก</Button>
              <Button variant="primary" type="submit">บันทึก</Button>
            </Modal.Footer>
          </Form>
        </> : <>
            <Modal.Body>
              <b>ชื่อผู้ใช้</b> : {userDetail.username}<br />
              <b>รหัสผ่าน</b> : {userDetail.password}<br />
              <b>ระดับสิทธิ์</b> : {userDetail.role}<br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="button" onClick={() => { setEdit(true) }}>แก้ไข</Button>
              <Button variant="primary" type="button" onClick={() => { handleCloseDetail() }}>ปิด</Button>
            </Modal.Footer>
          </>
        }
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered style={{ fontFamily: "IBM Plex Sans Thai" }} backdrop="static" keyboard={false}>
        <Form onSubmit={(e) => { deleteUser(e) }}>
          <Modal.Header>
            <Modal.Title style={{ width: "100%" }}>ลบผู้ใช้</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>คุณแน่ใจว่าต้องการลบ {userDetail.username} ?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={() => { handleCloseDelete(); setEdit(true); setShowDetail(true) }}>ยกเลิก</Button>
            <Button variant="danger" type="submit">ลบ</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}