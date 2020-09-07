import React from 'react'
import './NewLocation.scss'
import { Button, InputGroup, Form, FormControl, Divider } from 'react-bootstrap'

export const NewLocation = () => {
  return (
    <div className="NewLocation">
      <div className="container">
        <div className="header">
          <h2>เพิ่มตำแหน่งซ่อม</h2>
        </div>
        <div className="form">
          <Form.Group controlId="location">
            <Form.Label style={{ width: "100%" }}>ตำแหน่ง</Form.Label>
            <Form.Control type="text" placeholder="เพิ่มตำแหน่งที่ซ่อม" required={true} />
          </Form.Group>
          <InputGroup className="list">
            <Form.Label style={{ width: "100%" }}>รายการสิ่งที่จะซ่อม</Form.Label>
            <FormControl
              placeholder="เพิ่มรายการอะไหล่"
              aria-label="เพิ่มรายการอะไหล่"
            />
            <InputGroup.Append>
              <Button variant="primary">เพิ่ม</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <div className="footer">
          <div className="line"></div>
          <div className="btn-container">
            <Button variant="secondary">ยกเลิก</Button>
            <Button>บันทึก</Button>
          </div>
        </div>
      </div>
    </div>
  )
}