import React from 'react'
import './Users.scss'
import { Link, useHistory } from 'react-router-dom';
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap'

export const Users = () => {
  const history = useHistory()

  function logout() {
    // Logout Code Here
    history.push("/login")
  }

  return (
    <div className="Users">
      <div className="container">
        <div className="users-container">
          <div className="header">
            <h2 style={{ fontStyle: "Bold" }}>จัดการผู้ใช้</h2>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">&#xF0C9;</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/">ประวัติการซ่อม</Dropdown.Item>
                <Dropdown.Item href="/users" disabled>จัดการผู้ใช้</Dropdown.Item>
                <Dropdown.Item href="/machines">จัดการข้อมูลเครื่อง</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#" onClick={logout} style={{ color: "red" }}>ออกจากระบบ</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <InputGroup className="search-user">
            <FormControl
              placeholder="&#xF002;  ค้นหาผู้ใช้"
              aria-label="ค้นหาผู้ใช้"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <div className="btn-container">
            
          </div>
        </div>
      </div>
    </div>
  )
}