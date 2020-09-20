import React, { useEffect, useState } from 'react'
import './Machine.scss'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Button, Modal, InputGroup, Form, FormControl } from 'react-bootstrap'
import firebase, { Data, Authen } from '../../services/service'

export const Machine = () => {
  const history = useHistory()
  const { path, url } = useRouteMatch()
  const { machine, num } = useParams()

  const [position, setPosition] = useState([])
  const [repairlist, setRepairList] = useState([])

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => { setShowModal(false) }
  const handleShow = () => { setShowModal(true) }

  useEffect(() => {

    const localStr = JSON.parse(window.localStorage.getItem("site"))
    
    if(localStr !== null){
      if(!localStr.find(ele=>ele===num)){
        history.push('/404')
      }
    }else{
      history.push('/404')
    }


    Data.getPositionRef(num, machine).on('value', snapshot => {
      if (snapshot) {
        if (snapshot.val()) {
          const Data = Object.entries(snapshot.val()).map(ele => {
            ele[1].pid = ele[0]
            return ele[1]
          })
          setPosition(Data)
        } else setPosition([])
      }
    })

    Data.getRepairListRef(num, machine).on('value', snapshot => {
      if (snapshot) {
        if (snapshot.val()) {
          const Data = Object.entries(snapshot.val()).map(ele => {
            ele[1].rid = ele[0]
            return ele[1]
          })
          setRepairList(Data)
        } else setRepairList([])
      }
    })

    return () => {
      Data.getPositionRef(num, machine).off()
      Data.getRepairListRef(num, machine).off()
    }
  }, [])

  function deleteMachineHandler(e) {
    e.preventDefault()
    handleClose()
    Data.deleteMachine(num, machine).then(() => {
      history.push("/sites/" + num + "?deleted=" + machine)
    })
  }

  function addPositionHandler(e){
    e.preventDefault()
    const name = document.getElementById('position-name').value
    if (name !== '') {
      if (position.length > 0) {
        if (position.find(ele => ele.pid === name)) {
          document.getElementById('position-name').value = ''
          return
        }
      }
      Data.addPosition(num, machine, name).then(() => {
        document.getElementById('position-name').value = ''
      })
    }
  }

  function addRepairListHandler(e){
    e.preventDefault()
    const name = document.getElementById('repl-name').value
    if (name !== '') {
      if (repairlist.length > 0) {
        if (repairlist.find(ele => ele.rid === name)) {
          document.getElementById('repl-name').value = ''
          return
        }
      }
      Data.addRepairList(num, machine, name).then(() => {
        document.getElementById('repl-name').value = ''
      })
    }
  }

  const Tag = ({ content, type }) => {
    function deleteTag(e) {
      e.preventDefault()
      if(type === 'pos'){
        Data.deletePosition(num, machine, content)
      } else if(type === 'repl'){
        Data.deleteRepairList(num, machine, content)
      }
    }
  
    return (
      <div className="Tag">
        <h5>{content}</h5>
        <button title="ลบรายการนี้" onClick={deleteTag}>&#xf00d;</button>
      </div>
    )
  }

  return (
    <div className="Machine">
      <div className="container">
        <div className="header">
          <Button variant="light" onClick={() => history.push("/sites/" + num)}>&#xF053;</Button>
          <h2>{machine}</h2>
          <Button variant="outline-danger" title="ลบหน้านี้" style={{ fontSize: "20px" }} onClick={handleShow}>&#xf1f8;</Button>
        </div>
        <div className="form">
          <InputGroup className="location">
            <Form.Label style={{ width: "100%" }}>เพิ่มตำแหน่งที่ซ่อม</Form.Label>
            <FormControl
              id="position-name"
              placeholder="กรอกตำแหน่งที่ซ่อม"
              aria-label="กรอกตำแหน่งที่ซ่อม"
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={addPositionHandler}>เพิ่ม</Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="tag-wrapper">
            {position.map((ele, i) => <Tag key={i} content={ele.pid} type={"pos"}/>)}
          </div>
          <InputGroup className="list">
            <Form.Label style={{ width: "100%" }}>เพิ่มรายการอะไหล่</Form.Label>
            <FormControl
              id="repl-name"
              placeholder="กรอกชื่ออะไหล่"
              aria-label="กรอกชื่ออะไหล่"
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={addRepairListHandler}>เพิ่ม</Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="tag-wrapper">
            {repairlist.map((ele, i) => <Tag key={i} content={ele.rid} type={"repl"}/>)}
          </div>
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