import React, { useEffect } from 'react'
import './Home.scss'
import { useHistory } from 'react-router-dom';
import { Dropdown, Button, Form } from 'react-bootstrap'
import Service from '../../services/service.js'
import { HistoryCard, NavDropdown } from '../../components'

export const Home = () => {
  const history = useHistory()

  const mock = [{
    machine: "Compressor",
    location: "ลูกสูบฝั่งมอเตอร์",
    number: 1,
    jobNo: "10244",
    technician: "ช่าง ABC",
    list: ["ABC", "DEF"],
    date: "16 สิงหาคม 2563  15:03 น.",
    remark: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  }, {
    machine: "ปั๊มน้ำ",
    location: "คอเพลาซ้าย",
    number: 3,
    jobNo: "ก3092",
    technician: "ช่าง ABC",
    list: ["ABC", "DEF"],
    date: "16 สิงหาคม 2563  15:03 น.",
    remark: "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
  }
  ]

  return (
    <div className="Home">
      <div className="container">
        <div className="home-container">
          <div className="header">
            <h2 style={{ fontStyle: "Bold" }}>ประวัติการซ่อม</h2>
            <NavDropdown _disabled={"home"}></NavDropdown>
          </div>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="&#xF002;  ค้นหารายการ" />
          </Form.Group>
          <Button variant="primary" className="add-btn" >+ เพิ่มรายการ</Button>
          <div className="card-wrapper">
            {mock.map((ele, i) => { return <HistoryCard data={ele} key={i} /> })}
          </div>
        </div>
      </div>
    </div>
  )
}