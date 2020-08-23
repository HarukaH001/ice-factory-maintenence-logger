import React, { useState } from 'react'
import './HistoryCard.scss'
import { Button, Modal } from 'react-bootstrap'

export const HistoryCard = ({ data }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="card-container" onClick={handleShow}>
        <div className="machine">
          <p>เครื่อง</p>
          <h3>{data.machine}</h3>
        </div>
        <div className="location">
          <p>ตำแหน่ง</p>
          <h3>{data.location}</h3>
        </div>
        <div className="number">
          <p>ตัวที่</p>
          <h3>{data.number}</h3>
        </div>
        <div className="date">
          <p>{data.date}</p>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered style={{fontFamily: "IBM Plex Sans Thai"}}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดงาน <small>#{data.jobNo}</small></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          เครื่อง : <b>{data.machine}</b><br/>
          ผู้ซ่อม : <b>{data.technician}</b><br/>
          วันที่ : <b>{data.date}</b><br/>
          ตำแหน่ง : <b>{data.location}</b><br/>
          รายการซ่อม : <b>{data.list.join(", ")}</b><br/>
          หมายเหตุ : <b>{data.remark}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>ปิด</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
