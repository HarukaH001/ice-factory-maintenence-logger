import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Login.scss'
import { Button, InputGroup, FormControl, Dropdown, Alert } from 'react-bootstrap'
import { FaLock } from 'react-icons/fa'
import Service from '../../services/service.js'

export const Login = () => {
  const history = useHistory()
  const [user, setUser] = useState("เลือกชื่อผู้ใช้")
  const [loginError, setLoginError] = useState(false)
  const userList = [{
    username: "admin",
    password: "admin"
  }, {
    username: "user1",
    password: "1234561"
  }, {
    username: "user2",
    password: "1234562"
  }, {
    username: "user3",
    password: "1234563"
  },]

  function login() {
    setLoginError(true)
    // history.push("/")
  }

  // const readData = () => {
  //   database.ref('user/').once('value').then((snapshot)=>{
  //     const Data = snapshot.val()
  //     console.log(Data)
  //   })
  // }

  useEffect(() => {
    Service.getAuthen().getUserList().then((value) => {
      console.log(value)
    })
    // console.log(Get.getNahee())
  }, [])

  return (
    <div className="Login">
      <div className="container">
        <div className="login-container">
          <h1 className="title">ลงชื่อเข้าใช้</h1>
          <Dropdown className="username">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {user}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                userList.map((ele, i) => <Dropdown.Item key={i} href="#" onClick={() => setUser(ele.username)}>{ele.username}</Dropdown.Item>)
              }
            </Dropdown.Menu>
          </Dropdown>
          <InputGroup className="password">
            <InputGroup.Prepend>
              <InputGroup.Text id="lock"><FaLock /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="password"
              placeholder="รหัสผ่าน"
              aria-label="รหัสผ่าน"
              aria-describedby="password"
            />
          </InputGroup>
          {loginError ? <Alert variant="danger" className="alert">รหัสผ่านไม่ถูกต้อง</Alert> : null}
          <Button variant="primary" className="login-btn" onClick={login}>ลงชื่อเข้าใช้</Button>
          <a href="/" style={{ marginTop: "1vh", fontSize: "14px", textAlign: "center", width: "100%" }}>ไปหน้าหลัก</a>
        </div>
      </div >
    </div>
  )
}