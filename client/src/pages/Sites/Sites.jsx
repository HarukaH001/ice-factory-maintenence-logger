import React from 'react'
import './Sites.scss'
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { NavDropdown } from '../../components'

export const Sites = () => {
  const { path, url } = useRouteMatch()
  const siteList = [1, 2, 3, "..."]


  return (
    <div className="Sites">
      <div className="container">
        <div className="site-container">
          <div className="header">
            <h2 style={{ fontStyle: "Bold" }}>จัดการบ่อ</h2>
            <NavDropdown _disabled={"sites"}></NavDropdown>
          </div>
          <InputGroup className="add-site">
            <FormControl
              placeholder="เพิ่มบ่อ"
              aria-label="เพิ่มบ่อ"
            />
            <InputGroup.Append>
              <Button variant="primary">เพิ่ม</Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="btn-container">
            {siteList.map((ele, i) => { return <Link key={i} to={`${url}/` + ele}><Button variant="success">{"บ่อ " + ele}</Button></Link> })}
          </div>
        </div>
      </div>
    </div>
  )
}