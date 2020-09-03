import React from 'react'
import './Subsite.scss'
import { Link, useHistory } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap'

export const Subsite = () => {
  const history = useHistory()
  const machineList = ["Compressor", "ปั๊มน้ำ", "พัดลมคูลลิ่ง"]

  return (
    <div className="Subsite">
      <div className="container">
        <div className="header">
          <Button variant="light" onClick={() => history.goBack()}>&#xF053;</Button>
          <h2>บ่อ 1</h2>
        </div>
        <InputGroup className="add-machine">
          <FormControl
            placeholder="เพิ่มเครื่องจักร"
            aria-label="เพิ่มเครื่องจักร"
          />
          <InputGroup.Append>
            <Button variant="primary">เพิ่ม</Button>
          </InputGroup.Append>
        </InputGroup>
        <div className="btn-container">
          {machineList.map((ele, i) => { return <Link key={i} to={"sites/" + ele}><Button variant="success">{ele}</Button></Link> })}
        </div>
      </div>
    </div>
  )
}