import React, { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import Service from '../services/service.js'
import { useHistory } from 'react-router-dom';

export const NavDropdown = ({ data, _disabled }) => {
    const history = useHistory()

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">&#xF0C9;</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/" disabled={_disabled==="home"}>ประวัติการซ่อม</Dropdown.Item>
                    <Dropdown.Item href="/users" disabled={_disabled==="users"}>จัดการผู้ใช้</Dropdown.Item>
                    <Dropdown.Item href="/machines" disabled={_disabled==="machine"}>จัดการข้อมูลเครื่อง</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={Service.getAuthen().logout()} style={{ color: "red" }}>ออกจากระบบ</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
  