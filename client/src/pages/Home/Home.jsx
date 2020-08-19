import React from 'react'
import './Home.scss'
// import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';

export const Home = () => {
  return (
    <div className="container">
      <div className="home-container">
        <Jumbotron>
          <h1 style={{ color: "#007bff" }}>หน้าหลัก</h1>
          <p>
            Ice Factory Maintenance WebApp
          </p>
          <a href="https://github.com/HarukaH001/ice-factory-maintenence-logger">
            <Button variant="primary" >GitHub Repository</Button>
          </a>
          <a href="/login">
            <Button variant="secondary" style={{marginLeft: "1rem"}}>ลงชื่อเข้าใช้</Button>
          </a>
        </Jumbotron>
        <p style={{ position: "absolute", bottom: 0, color: "#B9B9B9" }}>WIP // React-Bootstrap v1.3.0</p>
      </div>
    </div>
  )
}