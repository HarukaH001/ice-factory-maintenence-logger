import React from 'react'
import './Machine.scss'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Button } from 'react-bootstrap'

export const Machine = () => {
  const history = useHistory()
  const { path, url } = useRouteMatch()
  const { machine } = useParams()

  const locationList = ["ฝั่งมอเตอร์", "ฝั่งวาล์วดูด"]

  return (
    <div className="Machine">
      <div className="container">
        <div className="header">
          <Button variant="light" onClick={() => history.goBack()}>&#xF053;</Button>
          <h2>{machine}</h2>
        </div>
        <Link to={`${url}/new`}><Button variant="primary" className="add-location" >+ เพิ่มตำแหน่งซ่อม</Button></Link>
        <div className="cards-container">
          {locationList.map((ele, i) => <Card key={i} location={ele} />)}
        </div>
      </div>
    </div>
  )
}

const Card = ({ location }) => {
  return (
    <div className="card-container">
      <h5 style={{ margin: 0, fontSize: "20px" }}>{location}</h5>
    </div>
  )
}