import React, { useEffect, useState } from 'react'
import './Subsite.scss'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import firebase, { Data, Authen } from '../../services/service'

export const Subsite = () => {
  const history = useHistory()
  const { num } = useParams()
  const { path, url } = useRouteMatch()
  const [machine, setMachine] = useState([])

  useEffect(()=>{
    Data.getMachineRef(num).on('value', snapshot=>{
        if(snapshot){
          if(snapshot.val()){
            const Data = Object.entries(snapshot.val()).map(ele => {
              ele[1].mid = ele[0]
              return ele[1]
            })
            setMachine(Data)
          } else setMachine([])
        }
      })

    return () => {
      Data.getMachineRef(num).off()
    }
  },[])
  
  function addMachineHandler(e) {
    e.preventDefault()
    const name = document.getElementById('machine-name').value
    if(name !== ''){
      if(machine.length > 0){
        if(machine.find(ele=>ele.mid === name)){
          document.getElementById('machine-name').value = ''
          return
        }
      }
      Data.addMachine(num,name).then(()=>{
        document.getElementById('machine-name').value = ''
      })
    }
  }

  function deleteSiteHandler(e){
    e.preventDefault()
    //ทำอะไรสักอย่างก่อนลบ
    Data.deleteSite(num).then(()=>{
      //ทำอะไรสักอย่างหลังสั่งลบ
      history.goBack()
    })
  }

  return (
    <div className="Subsite">
      <div className="container">
        <div className="header">
          <Button variant="light" onClick={() => history.goBack()}>&#xF053;</Button>
          <h2>บ่อ {num}</h2>
          <Button style={{backgroundColor:'red',border:'none'}} onClick={deleteSiteHandler}>ลบ</Button>
        </div>
        <InputGroup className="add-machine">
          <FormControl
            id="machine-name"
            placeholder="เพิ่มเครื่องจักร"
            aria-label="เพิ่มเครื่องจักร"
          />
          <InputGroup.Append>
            <Button variant="primary" onClick={addMachineHandler}>เพิ่ม</Button>
          </InputGroup.Append>
        </InputGroup>
        <div className="btn-container">
          {machine.map((ele, i) => { return <Link key={i} to={`${url}/` + ele.mid}><Button variant="success">{ele.mid}</Button></Link> })}
        </div>
      </div>
    </div>
  )
}