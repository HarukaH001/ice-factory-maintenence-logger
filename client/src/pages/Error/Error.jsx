import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export const Error = () => {
  return (
    <div className="Error">
      <div className="container" style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column wrap"
      }}>
        <h1 style={{ marginBottom: "2rem" }}>ไม่พบหน้าที่ต้องการ</h1>
        <Link to="/"><Button size="lg">กลับหน้าหลัก</Button></Link>
      </div>
    </div>
  )
}