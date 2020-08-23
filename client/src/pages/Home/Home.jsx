import React,{useEffect} from 'react'
import './Home.scss'
// import { Link } from 'react-router-dom';
import { Jumbotron, Button, Form } from 'react-bootstrap';
import Service from '../../services/service.js'

export const Home = () => {

  useEffect(()=>{
    Service.getAuthen().getUserList().then((value)=>{
      console.log(value)
    })
    // console.log(Get.getNahee())
  },[])


  return (
    <div className="container">
      <div className="home-container">
        <h1 style={{fontStyle: "Bold"}}>ประวัติรายการ</h1>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Control type="email" placeholder="&#xF002; ค้นหา..." />
        </Form.Group>
        {/* <Jumbotron>
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
        </Jumbotron> */}
        <p style={{ position: "absolute", bottom: 0, color: "#B9B9B9" }}>WIP // React-Bootstrap v1.3.0</p>
      </div>
    </div>
  )
}