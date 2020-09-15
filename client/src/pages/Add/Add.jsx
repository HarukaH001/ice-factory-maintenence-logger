import React, { useState } from 'react'
import './Add.scss'
import { Link, useHistory } from 'react-router-dom'
import { Button, InputGroup, Form, FormControl, Modal, DropdownButton, Dropdown, Table } from 'react-bootstrap'

export const Add = () => {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => { setShowModal(false) }
  const handleShow = () => { setShowModal(true) }

  const [location, setLocation] = useState("เลือกบ่อ")
  const [machine, setMachine] = useState("เลือกเครื่อง")
  const [position, setPosition] = useState("เลือกตำแหน่ง")

  const locationList = [1, 2, 3]
  const machineList = ["Compressor", "ปั๊มน้ำ", "พัดลมคูลลิ่ง"]
  const positionList = ["ฝั่งมอเตอร์", "ฝั่งวาล์วดูด"]
  const statusList = ["ปกติ", "ซ่อม", "เปลี่ยน"]
  const partList = ["ลิ้นไอดี", "ลิ้นไอเสีย", "ก้านสูบ", "ลิ้นไอดี", "ลิ้นไอเสีย", "ก้านสูบ"]

  const [date, setDate] = useState(currentDate)
  const [time, setTime] = useState(currentTime)

  function currentDate() {
    const d = new Date()
    var month = "" + (d.getMonth() + 1)
    var day = "" + d.getDate()
    var year = d.getFullYear()

    if (day.length < 2) day = '0' + day
    if (month.length < 2) month = '0' + month

    return [year, month, day].join("-")
  }

  function currentTime() {
    const d = new Date()
    var hour = "" + d.getHours()
    var minute = "" + d.getMinutes()

    if (hour.length < 2) hour = '0' + hour
    if (minute.length < 2) minute = '0' + minute

    return [hour, minute].join(":")
  }

  function renderTable(part) {
    return (
      <tr onChange={() => console.log("B")}>
        <td>{part}</td>
        <td>
          <Form.Control as="select" className="position-dropdown" style={{ display: "inline", width: '100%' }} variant="info">
            {statusList.map((ele, i) => <option href="#" key={i} >{ele}</option>)}
          </Form.Control>
        </td>
      </tr>
    )
  }

  return (
    <div className="Add">
      <div className="container">
        <div className="header">
          <h2>รายละเอียดการซ่อม</h2>
        </div>
        <div className="form">
          <Form>
            <div className="line-wrapper">
              <div className="inner">
                <p>บ่อ</p>
                <DropdownButton className="location-dropdown" title={location === "เลือกบ่อ" ? location : "บ่อ " + location} style={{ display: "inline", width: '100%' }} variant="light">
                  {locationList.map((ele, i) => <Dropdown.Item href="#" key={i} onClick={() => setLocation(ele)}>{ele}</Dropdown.Item>)}
                </DropdownButton>
              </div>
            </div>
            <div className="line-wrapper">
              <div className="inner">
                <p>เครื่อง</p>
                <DropdownButton className="machine-dropdown" title={machine} style={{ display: "inline", width: '100%' }} variant="light">
                  {machineList.map((ele, i) => <Dropdown.Item href="#" key={i} onClick={() => setMachine(ele)}>{ele}</Dropdown.Item>)}
                </DropdownButton>
              </div>
            </div>
            <div className="line-wrapper">
              <div className="inner">
                <p>ตำแหน่ง</p>
                <DropdownButton className="position-dropdown" title={position} style={{ display: "inline", width: '100%' }} variant="light">
                  {positionList.map((ele, i) => <Dropdown.Item href="#" key={i} onClick={() => setPosition(ele)}>{ele}</Dropdown.Item>)}
                </DropdownButton>
              </div>
            </div>
            <div className="line-wrapper">
              <div className="inner">
                <p style={{ minWidth: "4rem" }}>วัน/เวลา</p>
                <input style={{ flex: "1 1 auto", width: "50px" }} defaultValue={date + "T" + time} type="datetime-local" required />
                {/* <p style={{ margin: "0 0.5rem", minWidth: "1px" }}>เวลา</p> */}
                {/* <input type="time" defaultValue={time} required /> */}
              </div>
            </div>
            <div className="table-container">
              <Table borderless>
                <thead>
                  <tr>
                    <th>อะไหล่ที่ซ่อม</th>
                    <th>ตัวเลือก</th>
                  </tr>
                </thead>
                <tbody>
                  {partList.map((ele, i) => renderTable(ele))}
                </tbody>
              </Table>
            </div>
            <Form.Group controlId="remark">
              <Form.Label style={{ fontWeight: "bold" }}>หมายเหตุ</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
          </Form>
        </div>
        <div className="footer">
          <div className="line"></div>
          <div className="btn-container">
            <Button variant="secondary" onClick={handleShow}>ยกเลิก</Button>
            <Button>บันทึก</Button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} centered style={{ fontFamily: "IBM Plex Sans Thai" }} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title style={{ width: "100%" }}>ละทิ้ง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>คุณแน่ใจหรือไม่ว่าต้องการละทิ้ง?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>ยกเลิก</Button>
          <Link to="/"><Button variant="danger" type="button">ละทิ้ง</Button></Link>
        </Modal.Footer>
      </Modal>
    </div>
  )
}