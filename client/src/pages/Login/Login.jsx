import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import './Login.scss'
import { Button, InputGroup, DropdownButton, FormControl, Dropdown } from 'react-bootstrap';
import { FaLock, FaUser } from 'react-icons/fa'

export const Login = () => {
  const [user, setUser] = useState("เลือกชื่อผู้ใช้");

  return (
    <div className="container">
      <div className="login-container">
        <h1 className="title">ลงชื่อเข้าใช้</h1>
        <Dropdown className="username">
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {user}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => setUser("admin")}>admin</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => setUser("user1")}>user1</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => setUser("user2")}>user2</Dropdown.Item>
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
        <a href="/"><Button variant="primary" className="login-btn">ลงชื่อเข้าใช้</Button></a>
      </div>
    </div >
  )
}