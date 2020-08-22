import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Login.scss'
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap'
import { FaLock } from 'react-icons/fa'

export const Login = () => {
  const history = useHistory()
  const [user, setUser] = useState("เลือกชื่อผู้ใช้")
  const [loginError, setLoginError] = useState(false)
  const userList = ["admin", "user1", "user2", "user3"]

  function login() {
    setLoginError(true)
    // history.push("/")
  }

  return (
    <div className="container">
      <div className="login-container">
        <h1 className="title">ลงชื่อเข้าใช้</h1>
        <Dropdown className="username">
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {user}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {
              userList.map((ele, i) => <Dropdown.Item key={i} href="#" onClick={() => setUser(ele)}>{ele}</Dropdown.Item>)
            }
          </Dropdown.Menu>
        </Dropdown>

        <InputGroup className="password">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1"><FaLock /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="password"
            placeholder="รหัสผ่าน"
            aria-label="รหัสผ่าน"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        {loginError ? <p style={{ color: "red", marginTop: "1vh", fontSize: "14px", textAlign: "end" }}>รหัสผ่านไม่ถูกต้อง</p> : null}
        <Button variant="primary" className="login-btn" onClick={login}>ลงชื่อเข้าใช้</Button>
        <a href="/" style={{ marginTop: "1vh", fontSize: "14px", textAlign: "center", width: "100%" }}>ไปหน้าหลัก</a>
      </div>
    </div >
  )
}