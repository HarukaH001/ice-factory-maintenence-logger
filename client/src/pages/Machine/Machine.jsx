import React from 'react'
import './Machine.scss'
import { Link } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { NavDropdown } from '../../components'

export const Machine = () => {
  // const history = useHistory()
  const machineList = ["Compressor", "ปั๊มน้ำ", "พัดลมคูลลิ่ง"]

  return (
    <div className="Machine">
      <div className="container">
        <div className="machine-container">
          <div className="header">
            <h2 style={{ fontStyle: "Bold" }}>จัดการข้อมูลเครื่อง</h2>
            <NavDropdown _disabled={"machine"}></NavDropdown>
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
            {machineList.map((ele, i) => { return <Link key={i} to={"machines/" + ele}><Button variant="success">{ele}</Button></Link> })}
          </div>
        </div>
      </div>
    </div>
  )
}