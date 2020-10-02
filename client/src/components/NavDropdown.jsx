import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import firebase, { Authen } from '../services/service.js'
import { firebaseConfig as config } from '../Config.js'

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const NavDropdown = ({ data, _disabled,}) => {
  const [user, setUser] = useState('')
  
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  useEffect(() => {
    if (firebase.auth().currentUser) {
      Authen.getUser().then(res => {
        setUser(res)
      })
    }
  }, [])

  function currentDate() {
    const d = new Date()
    var month = "" + (d.getMonth() + 1)
    var day = "" + d.getDate()
    var year = d.getFullYear()

    if (day.length < 2) day = '0' + day
    if (month.length < 2) month = '0' + month

    return [day, month, year].join("-")
  }

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    let wscols = [
      {wpx: 27},
      {wpx: 75},
      {wpx: 50},
      {wpx: 37},
      {wpx: 100},
      {wpx: 175},
      {wpx: 575},
      {wpx: 100},
    ];
    ws['!cols'] = wscols;
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, 'Report-maintenance-logger-@-'+fileName + fileExtension);
  }

  return (
    <>
      <Dropdown alignRight>
        <Dropdown.Toggle variant="light" id="dropdown-basic">&#xF0C9;</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#" disabled>{user?.username}</Dropdown.Item>
          <Dropdown.Divider />
          {user?.role === 'admin' && <>
            <Dropdown.Item href="/" disabled={_disabled === "home"}>หน้าหลัก</Dropdown.Item>
            <Dropdown.Item href="/users" disabled={_disabled === "users"}>จัดการผู้ใช้</Dropdown.Item>
            <Dropdown.Item href="/sites" disabled={_disabled === "sites"}>จัดการบ่อ</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href={"https://maintenance-logger.firebaseio.com/.json?apiKey=" + config.apiKey + "&download=Backup-maintenance-logger-@-" + currentDate() + ".json&format=export&print=pretty"}>สำรองข้อมูล</Dropdown.Item>
            <Dropdown.Item onClick={()=>{exportToCSV(data,currentDate())}}>รับรายงานซ่อม</Dropdown.Item>
            <Dropdown.Divider />
          </>}
          <Dropdown.Item href="#" onClick={() => Authen.logout()} style={{ color: "red" }}>ออกจากระบบ</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

