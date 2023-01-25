import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { register } from '../../redux/userSlice'

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    phone: "",
    username: "",
    password: ""
  })
  const [confirmPass, setConfirmPass] = useState('')
  const [errorLog, setErrorLog] = useState('')
  const userList = useAppSelector((state: RootState) => state.user.users)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleValueForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    })
  }
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isDuplicate = userList.some(user => user.username === registerForm.username)
    if (registerForm.password !== confirmPass) {
      setErrorLog('your confirm pass must match your password')
    } else if (isDuplicate) {
      setErrorLog('username has exist')
    } else if (registerForm.password !== confirmPass && isDuplicate ){
      setErrorLog('username has exist and your confirm pass must match your password')
    }else{
      dispatch(register(registerForm))
      setErrorLog('REGISTER SUCCESS')
      setTimeout(() => {
        return navigate('/login')
      }, 3000)
    }
  }
  return (
    <div>
      <form onSubmit={handleRegister}>
        Name: <input type="text" name="name" value={registerForm.name} onChange={handleValueForm} />
        Phone Number: <input type="text" name="phone" value={registerForm.phone} onChange={handleValueForm} />
        UserName: <input type="text" name="username" value={registerForm.username} onChange={handleValueForm} />
        Password: <input type="text" name="password" value={registerForm.password} onChange={handleValueForm} />
        Confirm Password: <input type="text" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
        <button>Register</button>
      </form>
      {errorLog && (<>
        <span>{errorLog}</span>
      </>)}
    </div>
  )
}
