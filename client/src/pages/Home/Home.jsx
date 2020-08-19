import React from 'react'
import './Home.scss'
// import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';

export const Home = () => {
  return (
    <div className="container">
      <div className="home-container">
        {/* <h1 style={{ color: "#42a4f5" }}>หน้าหลัก</h1> */}
        <Jumbotron>
          <h1 style={{ color: "#42a4f5" }}>หน้าหลัก</h1>
          <p>
            Ice Factory Maintenance WebApp
            
          </p>
          <a href="https://github.com/HarukaH001/ice-factory-maintenence-logger">
            <Button variant="primary" >GitHub Repository</Button>
          </a>
        </Jumbotron>
        <p>WIP // React-Bootstrap v1.3.0</p>
      </div>
    </div>
  )
}