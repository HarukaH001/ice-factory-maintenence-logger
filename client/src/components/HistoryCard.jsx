import React, { useReducer, useState } from 'react'
import './HistoryCard.scss'
import { Button, Modal } from 'react-bootstrap'
import { Data } from '../services/service';

export const HistoryCard = ({ data, user }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => { setShowDelete(false) }
  const handleShowDelete = () => { setShowDelete(true); handleClose() }

  function handleDelete(e) {
    e.preventDefault()
    Data.deleteRecord(data.lid)
    handleCloseDelete()
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
          <p>{data.technician + " · " + new Date(data.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' }) + " น."}</p>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered style={{ fontFamily: "IBM Plex Sans Thai" }}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดงาน <small>#{data.lid}</small></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>บ่อ</b> : {data.location}<br />
          <b>เครื่อง</b> : {data.machine}<br />
          <b>ผู้ซ่อม</b> : {data.technician}<br />
          <b>วันที่</b> : {new Date(data.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' }) + " น."}<br />
          <b>ตำแหน่ง</b> : {data.position}<br />
          <b>รายการซ่อม</b> : {data.part.map(ele => ele.status !== "ปกติ" ? ele.status + ele.rid : ele.rid + ele.status).join(", ")}<br />
          <b>หมายเหตุ</b> : {data.note}
        </Modal.Body>
        <Modal.Footer>
          {user.role === 'admin' && <Button variant="danger" onClick={handleShowDelete}>ลบ</Button>}
          <Button variant="primary" onClick={handleClose}>ปิด</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered style={{ fontFamily: "IBM Plex Sans Thai" }} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title style={{ width: "100%" }}>ลบรายการซ่อม</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>คุณแน่ใจว่าต้องการลบรายการซ่อมนี้ ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={() => { handleCloseDelete(); handleShow() }}>ยกเลิก</Button>
          <Button variant="danger" type="button" onClick={(e) => handleDelete(e)}>ลบ</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
