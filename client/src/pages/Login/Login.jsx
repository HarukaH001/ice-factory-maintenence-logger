import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Login.scss'
import { Button, InputGroup, FormControl, Dropdown, Alert, Form } from 'react-bootstrap'
import { FaLock } from 'react-icons/fa'
import firebase, { Authen } from '../../services/service.js'

export const Login = () => {
  const errorMessageList = ["กรุณากรอกรหัสผ่าน", "รหัสผ่านไม่ถูกต้อง", "กรุณาเลือกผู้ใช้", "บัญชีถูกระงับชั่วคราว", "สำหรับนักพัฒนา: อีเมลใช้งานไม่ได้", "สำหรับนักพัฒนา: ไม่พบผู้ใช้"]
  const defaultSelectUser = { username: "เลือกชื่อผู้ใช้" }

  const history = useHistory()
  const [user, setUser] = useState(defaultSelectUser)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(errorMessageList[1])
  const [userList, setUserList] = useState([])

  function login(e) {
    e.preventDefault()
    setLoginError(false)
    if (user.username === "เลือกชื่อผู้ใช้") {
      setErrorMessage(errorMessageList[2])
      setLoginError(true)
    } else {
      if (!password) {
        setErrorMessage(errorMessageList[0])
        setLoginError(true)
        return
      }
      Authen.login(user.email, password).then(value => {
        document.getElementById('password').value = ''
        setPassword('')
        if (value.user) {
          setUser(defaultSelectUser)
          // history.push('/')
        } else {
          console.log(value.code)
          if (value.code === "auth/invalid-email") {
            setErrorMessage(errorMessageList[2])
          } else if (value.code === "auth/user-disabled") {
            setErrorMessage(errorMessageList[3])
          } else if (value.code === "auth/user-not-found") {
            setErrorMessage(errorMessageList[5])
          } else if (value.code === "auth/wrong-password") {
            setErrorMessage(errorMessageList[1])
          }
          setLoginError(true)
        }
      })
    }
  }

  useEffect(() => {
    Authen.getPublicUserList().then((value) => {
      setUserList(value)
    })
  }, [])

  return (
    <div className="Login">
      <div className="container">
        <div className="login-container">
          <h1 className="title">ลงชื่อเข้าใช้</h1>
          <Form>
            <Dropdown className="username">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {user.username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  userList.map((ele, i) => <Dropdown.Item key={i} href="#" onClick={() => setUser(ele)}>{ele.username}</Dropdown.Item>)
                }
              </Dropdown.Menu>
            </Dropdown>
            <InputGroup className="password">
              <InputGroup.Prepend>
                <InputGroup.Text id="lock"><FaLock /></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                placeholder="รหัสผ่าน"
                aria-label="รหัสผ่าน"
                aria-describedby="password"
                onChange={e => setPassword(e.target.value)}
                id="password"
              />
            </InputGroup>
            {loginError ? <Alert variant="danger" className="alert">{errorMessage}</Alert> : null}
            <Button variant="primary" className="login-btn" type="submit" onClick={login}>ลงชื่อเข้าใช้</Button>
          </Form>
        </div>
      </div >
    </div>
  )
}