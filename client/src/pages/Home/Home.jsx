import React, { useState } from 'react'
import './Home.scss'
// import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'
import { HistoryCard, NavDropdown } from '../../components'

export const Home = () => {
  // const history = useHistory()
  const [search, setSearch] = useState('')

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

  function cardRender(search) {
    return mock.map((ele, i) => {
      if (search) {
        if (ele.machine.includes(search) || ele.location.includes(search)) {
          return (<HistoryCard data={ele} key={i} />)
        }
        else return null
      }
      else {
        return (<HistoryCard data={ele} key={i} />)
      }
    })
  }

  return (
    <div className="Home">
      <div className="container">
        <div className="home-container">
          <div className="header">
            <h2 style={{ fontStyle: "Bold" }}>ประวัติการซ่อม</h2>
            <NavDropdown _disabled={"home"}></NavDropdown>
          </div>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="&#xF002;  ค้นหารายการ" onInput={(e) => setSearch(e.target.value)} />
          </Form.Group>
          <Button variant="primary" className="add-btn">+ เพิ่มรายการซ่อม</Button>
          <div className="card-wrapper">
            {cardRender(search)}
          </div>
        </div>
      </div>
    </div>
  )
}