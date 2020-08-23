import React from 'react'
import './Home.scss'
import { useHistory } from 'react-router-dom';
import { Dropdown, Button, Form } from 'react-bootstrap'
import { HistoryCard } from '../../components'

export const Home = () => {
  const history = useHistory()
  const mock = [{
    machine: "Compressor",
    location: "ลูกสูบฝั่งมอเตอร์",
    number: 1,
    date: "16 สิงหาคม 2563  15:03 น."
  }, {
    machine: "ปั๊มน้ำ",
    location: "คอเพลาซ้าย",
    number: 3,
    date: "16 สิงหาคม 2563  15:03 น."
  }
  ]

  function logout() {
    // Logout Code Here
    history.push("/login")
  }

  return (
    <div className="container">
      <div className="home-container">
        <div className="header">
        <h2 style={{ fontStyle: "Bold" }}>ประวัติรายการ</h2>
          <Dropdown>
            <Dropdown.Toggle variant="light"  id="dropdown-basic">&#xF0C9;</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/users">จัดการผู้ใช้</Dropdown.Item>
              <Dropdown.Item href="/machines">จัดการข้อมูลเครื่อง</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" onClick={logout}>ออกจากระบบ</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Control type="email" placeholder="&#xf002; ค้นหา..." />
        </Form.Group>
        <Button variant="primary" className="add-btn" >+ เพิ่มรายการ</Button>
        <div className="card-wrapper">
          {mock.map((ele, i) => { return <HistoryCard data={ele} key={i} /> })}
        </div>
      </div>
    </div>
  )
}