import React from 'react'
import './Machine.scss'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap'

export const Machine = () => {
  const history = useHistory()
  const { machine } = useParams()

  return (
    <div className="Machine">
      <div className="container">
        <div className="header">
          <Button variant="light" onClick={() => history.goBack()}>&#xF053;</Button>
          <h2>{machine}</h2>
        </div>
        <Button variant="primary" className="add-location" >+ เพิ่มตำแหน่งซ่อม</Button>
        <div className="card-container">
        </div>
      </div>
    </div>
  )
}