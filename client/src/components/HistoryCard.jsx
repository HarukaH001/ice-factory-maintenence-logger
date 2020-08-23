import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HistoryCard.scss'

export const HistoryCard = ({ data }) => {
  return (
    <div className="card-container">
      <div className="machine">
        <p>เครื่อง</p>
        <h3>{data.machine}</h3>
      </div>
      <div className="location">
        <p>ตำแหน่ง</p>
        <h3>{data.location}</h3>
      </div>
      <div className="number">
        <p>ตัวที่</p>
        <h3>{data.number}</h3>
      </div>
      <div className="date">
        <p>{data.date}</p>
      </div>
    </div>
  )
}
