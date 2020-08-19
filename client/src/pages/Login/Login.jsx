import React from 'react'
// import { Link } from 'react-router-dom';
import './Login.scss'
import { Button, InputGroup, DropdownButton, FormControl, Dropdown } from 'react-bootstrap';
import { FaLock, FaUser } from 'react-icons/fa'

export const Login = () => {
  return (
    <div className="container">
      <div className="login-container">
        <h1 className="title">ลงชื่อเข้าใช้</h1>
        <InputGroup className="username">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1"><FaUser /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="username"
            placeholder="ชื่อผู้ใช้"
            aria-label="ชื่อผู้ใช้"
            aria-describedby="basic-addon2"
          />

          <DropdownButton
            as={InputGroup.Append}
            variant="outline-secondary"
            title=""
            id="input-group-dropdown-2"
          >
            <Dropdown.Item href="#">admin</Dropdown.Item>
            <Dropdown.Item href="#">user1</Dropdown.Item>
            <Dropdown.Item href="#">user2</Dropdown.Item>
            <Dropdown.Item href="#">user3</Dropdown.Item>
          </DropdownButton>
        </InputGroup>

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