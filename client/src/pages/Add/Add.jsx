import React, { useState, useEffect } from 'react'
import './Add.scss'
import { Link, useHistory } from 'react-router-dom'
import { Button, InputGroup, Form, FormControl, Modal, DropdownButton, Dropdown, Table, Toast } from 'react-bootstrap'
import { Authen, Data } from '../../services/service'

export const Add = () => {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => { setShowModal(false) }
  const handleShow = () => { setShowModal(true) }

  const [user, setUser] = useState()

  const [location, setLocation] = useState("เลือกบ่อ")
  const [machine, setMachine] = useState("เลือกเครื่อง")
  const [position, setPosition] = useState("เลือกตำแหน่ง")
  const [alert, setAlert] = useState([false, false, false])
  const [selectedDate, setSelectedDate] = useState()

  const [locationList, setLocaltionList] = useState([])
  const [machineList, setMachineList] = useState([])
  const [positionList, setPositionList] = useState([])
  const statusList = ["ปกติ", "ซ่อม", "เปลี่ยน"]
  const [partList, setPartList] = useState([])

  const [date, setDate] = useState(currentDate)
  const [time, setTime] = useState(currentTime)

  const [showAddFail, setShowAddFail] = useState(false)
  const toggleShowAddFail = () => setShowAddFail(!showAddFail)

  useEffect(() => {
    Authen.getUser().then(value => {
      setUser(value)
    })
  }, [])

  useEffect(() => {
    if (user) {
      Data.getSites().then(value => {
        setLocaltionList(value)
      })
      setSelectedDate(date + "T" + time)
    }
  }, [user])

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
          <Form.Control as="select" id="parts-form" className="position-dropdown" style={{ display: "inline", width: '100%' }} variant="info">
            {statusList.map((ele, i) => <option href="#" key={i} value={ele}>{ele}</option>)}
          </Form.Control>
        </td>
      </tr>
    )
  }

  function submitHandler() {
    const formData = {
      createdTime: Date.now(),
      location: location.sid,
      machine: machine.mid,
      position: position.pid,
      date: selectedDate,
      part: partList.map((ele, i) => {
        delete ele["createdTime"];
        ele.status = document.querySelectorAll("#parts-form")[i].value
        return ele
      }),
      note: document.getElementById("remark").value,
      technician: user.username
    };
    console.log(formData);
    Data.addRecord(formData).then(() => {
      console.log('Log Updated')
      history.push('/')
    })
  }

  function formCheck(e) {
    e.preventDefault()
    if (location === "เลือกบ่อ") {
      setAlert([true, false, false])
      toggleShowAddFail()
    }
    else if (machine === "เลือกเครื่อง") {
      setAlert([false, true, false])
      toggleShowAddFail()
    }
    else if (position === "เลือกตำแหน่ง") {
      setAlert([false, false, true])
      toggleShowAddFail()
    }
    else {
      setAlert([false, false, false])
      submitHandler()
    }
  }

  return (
    <div className="Add">
      {locationList.length > 0 && (<div className="container">
        <div className="header">
          <h2>รายละเอียดการซ่อม</h2>
        </div>
        <div className="form">
          <Form onSubmit={e => formCheck(e)}>
            <div className="line-wrapper">
              <div className="inner">
                <p>บ่อ</p>
                <DropdownButton className="location-dropdown a" title={location.sid || "เลือกบ่อ"} style={{ display: "inline", width: '100%' }} variant={alert[0] === true ? "danger" : "light"}>
                  {locationList.length !== 0 ? locationList.map((ele, i) => <Dropdown.Item href="#" key={ele.sid} onClick={() => setLocation(ele)}>{ele.sid}</Dropdown.Item>) : <Dropdown.Item href="#" disabled>ไม่พบบ่อ</Dropdown.Item>}
                </DropdownButton>
              </div>
            </div>
            <div className="line-wrapper">
              <div className="inner">
                <p>เครื่อง</p>
                <DropdownButton className="machine-dropdown" title={machine.mid || "เลือกเครื่อง"} style={{ display: "inline", width: '100%' }} variant={alert[1] === true ? "danger" : "light"}>
                  {location !== "เลือกบ่อ" ? (machineList.length !== 0 ? machineList.map((ele, i) => <Dropdown.Item href="#" key={ele.mid} onClick={() => setMachine(ele)}>{ele.mid}</Dropdown.Item>) : <Dropdown.Item href="#" disabled>ไม่พบเครื่อง</Dropdown.Item>) : <Dropdown.Item href="#" disabled>กรุณาเลือกบ่อ</Dropdown.Item>}
                </DropdownButton>
              </div>
            </div>
            <div className="line-wrapper">
              <div className="inner">
                <p>ตำแหน่ง</p>
                <DropdownButton className="position-dropdown" title={position.pid || "เลือกตำแหน่ง"} style={{ display: "inline", width: '100%' }} variant={alert[2] === true ? "danger" : "light"}>
                  {machine !== "เลือกเครื่อง" ? (positionList.length !== 0 ? positionList.map((ele, i) => <Dropdown.Item href="#" key={ele.pid} onClick={() => setPosition(ele)}>{ele.pid}</Dropdown.Item>) : <Dropdown.Item href="#" disabled>ไม่พบตำแหน่ง</Dropdown.Item>) : <Dropdown.Item href="#" disabled>กรุณาเลือกเครื่อง</Dropdown.Item>}
                </DropdownButton>
              </div>
            </div>
            <div className="line-wrapper">
              <div className="inner">
                <p style={{ minWidth: "4rem" }}>วัน/เวลา</p>
                <Form.Control as="input" type="datetime-local" defaultValue={date + "T" + time} onChange={e => setSelectedDate(e.target.value)} required />
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
            <div className="footer">
              <div className="btn-container">
                <Button variant="secondary" onClick={handleShow}>ยกเลิก</Button>
                <Button type="submit">บันทึก</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>)}
      <Modal show={showModal} onHide={handleClose} centered style={{ fontFamily: "IBM Plex Sans Thai" }} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title style={{ width: "100%" }}>ละทิ้ง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>คุณแน่ใจหรือไม่ว่าต้องการละทิ้งรายการนี้?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>ยกเลิก</Button>
          <Link to="/"><Button variant="danger" type="button">ละทิ้ง</Button></Link>
        </Modal.Footer>
      </Modal>

      <Toast show={showAddFail} onClose={toggleShowAddFail} delay={3500} autohide
        style={{
          position: 'fixed',
          bottom: '5rem',
          left: '50%',
          backgroundColor: '#dc3545',
          color: 'white',
          transform: 'translateX(-50%)',
          width: "100%",
          textAlign: "center",
          zIndex: "101"
        }}>
        <Toast.Body><b style={{ fontSize: "18px" }}>กรุณากรอกข้อมูลให้ครบ</b></Toast.Body>
      </Toast>
    </div>
  )
}