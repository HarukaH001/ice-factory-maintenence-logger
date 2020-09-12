import React, { useEffect, useState } from 'react'
import './Machine.scss'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap'
import firebase, { Data, Authen } from '../../services/service'

export const Machine = () => {
  const history = useHistory()
  const { path, url } = useRouteMatch()
  const { machine, num } = useParams()

  const locationList = ["ฝั่งมอเตอร์", "ฝั่งวาล์วดูด"]

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => { setShowModal(false) }
  const handleShow = () => { setShowModal(true) }

  function deleteMachineHandler(e) {
    e.preventDefault()
    handleClose()
    Data.deleteMachine(num, machine).then(() => {
      history.push("/sites/" + num + "?deleted=" + machine)
    })
  }

  return (
    <div className="Machine">
      <div className="container">
        <div className="header">
          <Button variant="light" onClick={() => history.goBack()}>&#xF053;</Button>
          <h2>{machine}</h2>
          <Button variant="outline-danger" onClick={handleShow}>ลบ</Button>
        </div>
        <Link to={`${url}/new`}><Button variant="primary" className="add-location" >+ เพิ่มตำแหน่งซ่อม</Button></Link>
        <div className="cards-container">
          {locationList.map((ele, i) => <Card key={i} location={ele} />)}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} centered style={{ fontFamily: "IBM Plex Sans Thai" }} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title style={{ width: "100%" }}>ลบ "{machine}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong style={{ color: "#dc3545", display: "inline" }}>ตำแหน่งซ่อม และรายการอะไหล่ที่เกี่ยวข้องจะถูกลบทั้งหมด</strong>{" "}
          <p style={{ color: "#dc3545", display: "inline" }}>คุณแน่ใจหรือไม่ว่าต้องการลบ "{machine}" ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>ยกเลิก</Button>
          <Button variant="danger" type="button" onClick={deleteMachineHandler}>ลบ</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const Card = ({ location }) => {
  return (
    <div className="card-container">
      <h5 style={{ margin: 0, fontSize: "20px" }}>{location}</h5>
    </div>
  )
}