import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import firebase, { Authen } from '../services/service.js'
// import { useHistory } from 'react-router-dom';

export const NavDropdown = ({ data, _disabled }) => {
  const [user, setUser] = useState('')
  // const history = useHistory()

  useEffect(() => {
    if (firebase.auth().currentUser) {
      Authen.getUser().then(res => {
        setUser(res)
      })
    }
  }, [])

  return (
    <>
      <Dropdown alignRight>
        <Dropdown.Toggle variant="light" id="dropdown-basic">&#xF0C9;</Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#" disabled>{user?.username}</Dropdown.Item>
            <Dropdown.Divider />
            {user?.role === 'admin' && <Dropdown.Item href="/" disabled={_disabled === "home"}>หน้าหลัก</Dropdown.Item>}
            {user?.role === 'admin' && <Dropdown.Item href="/users" disabled={_disabled === "users"}>จัดการผู้ใช้</Dropdown.Item>}
            {user?.role === 'admin' && <Dropdown.Item href="/sites" disabled={_disabled === "sites"}>จัดการบ่อ</Dropdown.Item>}
            {user?.role === 'admin' && <Dropdown.Divider />}
            <Dropdown.Item href="#" onClick={() => Authen.logout()} style={{ color: "red" }}>ออกจากระบบ</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

