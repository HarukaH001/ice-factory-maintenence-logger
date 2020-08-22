import React from 'react'
import './Home.scss'
// import { Link } from 'react-router-dom';
import { Jumbotron, Button, Form } from 'react-bootstrap'

export const Home = () => {
  return (
    <div className="container">
      <div className="home-container">
        <h2 style={{ fontStyle: "Bold" }}>ประวัติรายการ</h2>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Control type="email" placeholder="&#xf002; ค้นหา..." />
        </Form.Group>
        <Button variant="primary" className="add-btn" >+ เพิ่มรายการ</Button>
        <div className="card-wrapper">
          <Jumbotron>
            <h1 style={{ color: "#007bff" }}>หน้าหลัก</h1>
            <p>
              Ice Factory Maintenance WebApp
          </p>
            <a href="https://github.com/HarukaH001/ice-factory-maintenence-logger">
              <Button variant="primary" >GitHub Repository</Button>
            </a>
            <a href="/login">
              <Button variant="secondary" style={{ marginLeft: "1rem" }}>ลงชื่อเข้าใช้</Button>
            </a>
          </Jumbotron>
        </div>
      </div>
    </div>
  )
}