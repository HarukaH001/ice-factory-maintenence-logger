import React,{useEffect} from 'react'
import './Home.scss'
// import { Link } from 'react-router-dom';
import { Jumbotron, Button, Form } from 'react-bootstrap';
import Service from '../../services/service.js'
import { HistoryCard } from '../../components'

export const Home = () => {
  useEffect(()=>{
    Service.getAuthen().getUserList().then((value)=>{
      console.log(value)
    })
    // console.log(Get.getNahee())
  },[])
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

  return (
    <div className="container">
      <div className="home-container">
        <h2 style={{ fontStyle: "Bold" }}>ประวัติรายการ</h2>
        <div className="menu" style={{ position: "absolute", top: "1em", right: "2.5em" }}>
          <Dropdown>
            <Dropdown.Toggle variant="primary"  id="dropdown-basic">&#xF0C9;</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">จัดการผู้ใช้</Dropdown.Item>
              <Dropdown.Item href="#/action-2">จัดการข้อมูลเครื่อง</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-3">ออกจากระบบ</Dropdown.Item>
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