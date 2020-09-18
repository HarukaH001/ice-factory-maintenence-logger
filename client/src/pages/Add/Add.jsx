import React, { useState, useEffect } from 'react'
import './Add.scss'
import { Link, useHistory } from 'react-router-dom'
import { Button, InputGroup, Form, FormControl, Modal, DropdownButton, Dropdown, Table } from 'react-bootstrap'
import { Data } from '../../services/service'

export const Add = () => {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => { setShowModal(false) }
  const handleShow = () => { setShowModal(true) }

  const [location, setLocation] = useState("เลือกบ่อ")
  const [machine, setMachine] = useState("เลือกเครื่อง")
  const [position, setPosition] = useState("เลือกตำแหน่ง")

  const [locationList, setLocaltionList] = useState([])
  const [machineList, setMachineList] = useState([])
  // const positionList = ["ฝั่งมอเตอร์", "ฝั่งวาล์วดูด"]
  const [positionList, setPositionList] = useState([])
  const statusList = ["ปกติ", "ซ่อม", "เปลี่ยน"]
  const [partList, setPartList] = useState([])

  const [date, setDate] = useState(currentDate)
  const [time, setTime] = useState(currentTime)

  useEffect(() => {
    Data.getSites().then(value => {
      setLocaltionList(value)
    })
  }, [])

  useEffect(() => {
    setMachine("เลือกเครื่อง")
    if (location) {
      setMachineList(location.machine ? location.machine : [])
    } else {
      setMachineList([])
    }
  }, [location])

  useEffect(() => {
    setPosition("เลือกตำแหน่ง")
    if (machine) {
      setPositionList(machine.position ? machine.position : [])
      setPartList(machine.repairlist ? machine.repairlist : [])
    } else {
      setPositionList([])
      setPartList([])
    }
  }, [machine])



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
      <tr key={part.rid}>
        <td>{part.rid}</td>
        <td>
          <Form.Control as="select" className="position-dropdown" style={{ display: "inline", width: '100%' }} variant="info">
            {statusList.map((ele, i) => <option href="#" key={ele} >{ele}</option>)}
          </Form.Control>
        </td>
      </tr>
    )
  }

  return (
    <div className="Add">
      {locationList.length > 0 && (<div className="container">
        <div className="header">
          <h2>รายละเอียดการซ่อม</h2>
        </div>
        <div className="form">
          <Form>
            <div className="line-wrapper">
              <div className="inner">
                <p>บ่อ</p>
                <DropdownButton className="location-dropdown" title={location.sid || "เลือกบ่อ"} style={{ display: "inline", width: '100%' }} variant="light">
                  {locationList.length !== 0 ? locationList.map((ele, i) => <Dropdown.Item href="#" key={ele.sid} onClick={() => setLocation(ele)}>{ele.sid}</Dropdown.Item>) : <Dropdown.Item href="#" disabled>ไม่พบบ่อ</Dropdown.Item>}
                </DropdownButton>
              </div>
            </div>
            <div className="line-wrapper">
              <div className="inner">
                <p>เครื่อง</p>
                <DropdownButton className="machine-dropdown" title={machine.mid || "เลือกเครื่อง"} style={{ display: "inline", width: '100%' }} variant="light">
                  {location !== "เลือกบ่อ" ? (machineList.length !== 0 ? machineList.map((ele, i) => <Dropdown.Item href="#" key={ele.mid} onClick={() => setMachine(ele)}>{ele.mid}</Dropdown.Item>) : <Dropdown.Item href="#" disabled>ไม่พบเครื่อง</Dropdown.Item>) : <Dropdown.Item href="#" disabled>กรุณาเลือกบ่อก่อน</Dropdown.Item>}
                </DropdownButton>
              </div>
            </div>
            <div className="line-wrapper">
              <div className="inner">
                <p>ตำแหน่ง</p>
                <DropdownButton className="position-dropdown" title={position.pid || "เลือกตำแหน่ง"} style={{ display: "inline", width: '100%' }} variant="light">
                  {machine !== "เลือกเครื่อง" ? (positionList.length !== 0 ? positionList.map((ele, i) => <Dropdown.Item href="#" key={ele.pid} onClick={() => setPosition(ele)}>{ele.pid}</Dropdown.Item>) : <Dropdown.Item href="#" disabled>ไม่พบตำแหน่ง</Dropdown.Item>) : <Dropdown.Item href="#" disabled>กรุณาเลือกเครื่องก่อน</Dropdown.Item>}
                </DropdownButton>
              </div>
            </div>
            <div className="line-wrapper">
              <div className="inner">
                <p style={{ minWidth: "4rem" }}>วัน/เวลา</p>
                <input style={{ flex: "1 1 auto", width: "50px" }} defaultValue={date + "T" + time} type="datetime-local" required />
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
                  {machine !== "เลือกเครื่อง" ? (partList.length !== 0 ? partList.map((ele, i) => renderTable(ele)) : <tr><td>ไม่พบรายการอะไหล่</td><td>-</td></tr>) : <tr><td>กรุณาเลือกข้อมูลให้ครบ</td><td>-</td></tr>}
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
      </div>)}
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