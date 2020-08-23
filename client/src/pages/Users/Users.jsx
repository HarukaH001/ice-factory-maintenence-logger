import React from 'react'
import './Users.scss'
import { Link, useHistory } from 'react-router-dom';
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap'
import { NavDropdown } from '../../components'

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
            <h2 style={{ fontStyle: "Bold" }}>จัดการบัญชี</h2>
            <NavDropdown></NavDropdown>
          </div>
          <InputGroup className="search-user">
            <FormControl
              placeholder="&#xF002;  ค้นหาผู้ใช้"
              aria-label="ค้นหาผู้ใช้"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <Button variant="primary" className="add-user-btn" >+ เพิ่มผู้ใช้ใหม่</Button>
          <div className="btn-container">
            
          </div>
        </div>
      </div>
    </div>
  )
}