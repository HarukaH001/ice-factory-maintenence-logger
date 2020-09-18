import React, { useReducer, useState } from 'react'
import './HistoryCard.scss'
import { Button, Modal } from 'react-bootstrap'
import { Data } from '../services/service';

export const HistoryCard = ({ data, user }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete(e){
    e.preventDefault()
    Data.deleteRecord(data.lid)
    handleClose()
  }

  return (
    <>
      <div className="card-container" onClick={handleShow}>
        <div className="machine">
          <p>เครื่อง</p>
          <h3>{data.machine}</h3>
        </div>
        <div className="location">
          <p>ตำแหน่ง</p>
          <h3>{data.position}</h3>
        </div>
        <div className="number">
          <p>บ่อที่</p>
          <h3>{data.location}</h3>
        </div>
        <div className="date">
          <p>{new Date(data.date).toLocaleString()}</p>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered style={{fontFamily: "IBM Plex Sans Thai"}}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดงาน <small>#{data.lid}</small></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          เครื่อง : <b>{data.machine}</b><br/>
          ผู้ซ่อม : <b>{data.technician}</b><br/>
          วันที่ : <b>{new Date(data.date).toLocaleString()}</b><br/>
          ตำแหน่ง : <b>{data.position}</b><br/>
          รายการซ่อม : <b>{data.part.map(ele=>ele.status!=="ปกติ"?ele.status+ele.rid:ele.rid+ele.status).join(", ")}</b><br/>
          หมายเหตุ : <b>{data.note}</b>
        </Modal.Body>
        <Modal.Footer>
          {user.role === 'admin' && <Button variant="primary" style={{backgroundColor: "red",border:"1px solid red"}} onClick={handleDelete}>ลบ</Button>}
          <Button variant="primary" onClick={handleClose}>ปิด</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
