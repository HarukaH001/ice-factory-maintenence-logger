import React, { useEffect, useState } from 'react'
import './Sites.scss'
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { NavDropdown } from '../../components'
import firebase, { Data, Authen } from '../../services/service'

export const Sites = () => {
  const { path, url } = useRouteMatch()
  const [site, setSite] = useState([])

  useEffect(()=>{
      Data.getSitesRef().on('value', snapshot=>{
        if(snapshot){
          if(snapshot.val()){
            const Data = Object.entries(snapshot.val()).map(ele => {
              ele[1].sid = ele[0]
              return ele[1]
            })
            setSite(Data)
          } else setSite([])
        }
      })

      return () => {
        Data.getSitesRef().off()
      }
  },[])
  
  function addSiteHandler(e) {
    e.preventDefault()
    const name = document.getElementById('site-name').value
    if(name !== ''){
      if(site.length > 0){
        if(site.find(ele=>ele.sid === name)){
          document.getElementById('site-name').value = ''
          return
        }
      }
      Data.addSite(name).then(()=>{
        document.getElementById('site-name').value = ''
      })
    }
  }

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
              id="site-name"
              placeholder="เพิ่มบ่อ"
              aria-label="เพิ่มบ่อ"
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={addSiteHandler}>เพิ่ม</Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="btn-container">
            {site.map((ele, i) => { return <Link key={i} to={`${url}/` + ele.sid}><Button variant="success">{"บ่อ "+ele.sid}</Button></Link> })}
          </div>
        </div>
      </div>
    </div>
  )
}