import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import firebase, { Authen } from '../services/service.js'
import { useHistory } from 'react-router-dom';

export const NavDropdown = ({ data, _disabled }) => {
    const [user, setUser] = useState('')
    const history = useHistory()

    useEffect(()=>{
        Authen.auth().onAuthStateChanged(user=>{
            if(user){
                Authen.getUser().then(res=>{
                    setUser(res)
                })
            }
        })
    },[])

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">&#xF0C9;</Dropdown.Toggle>
                <Dropdown.Menu>
                    {user?.role == 'admin' && <Dropdown.Item href="/" disabled={_disabled==="home"}>ประวัติการซ่อม</Dropdown.Item>}
                    {user?.role == 'admin' && <Dropdown.Item href="/users" disabled={_disabled==="users"}>จัดการผู้ใช้</Dropdown.Item>}
                    {user?.role == 'admin' && <Dropdown.Item href="/machines" disabled={_disabled==="machine"}>จัดการข้อมูลเครื่อง</Dropdown.Item>}
                    {user?.role == 'admin' && <Dropdown.Divider />}
                    <Dropdown.Item href="#" onClick={()=>Authen.logout()} style={{ color: "red" }}>ออกจากระบบ</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
  