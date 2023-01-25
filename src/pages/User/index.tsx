import { faHand } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { updateAvatar, updateInfo, updatePassword } from '../../redux/userSlice'
import { IUser } from '../../types/type'
import './style.css'
export default function User() {
  const [userInfo, setUserInfo] = useState<IUser>(JSON.parse(localStorage.getItem("user") || '{}'))
  const userList = useAppSelector((state: RootState) => state.user.users)
  const [confirmPass, setConfirmPass] = useState('')
  const [errorLog, setErrorLog] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const dispatch = useAppDispatch()
  const handleUpdateInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmitInfo = () => {
    if (isDuplicate) {
      setErrorLog('username has exist')
    }
    else {
      dispatch(updateInfo({
        id: userInfo.id,
        name: userInfo.name,
        phone: userInfo.phone,
        username: userInfo.username,
      }))
    }
  }
  const isDuplicate = userList.some(user => user.username === userInfo.username)
  const handleSubmitPassword = () => {
    if (userInfo.password !== confirmPass) {
      setErrorLog('your confirm pass must match your password')
    } else {
      dispatch(updatePassword({
        id: userInfo.id,
        password: userInfo.password
      }))
      setConfirmPass('')
    }
  }
  const handleUpdateAvatar = () => {

    dispatch(updateAvatar({
      id: userInfo.id,
      imgUrl: avatarUrl
    }))
    setAvatarUrl('')
    setTimeout(()=>{
      window.location.reload();
    },1000)

  }
  return (
    <div className='user grid wide'>
      <div className="row no-gutters">
        <div className="col l-6 info table">
          <div className="information">
            <div className="table-row">
              <label htmlFor="">Name:</label>
              <input type="text" name='name' value={userInfo.name} onChange={handleUpdateInfo} />
            </div>
            <div className="table-row">
              <label htmlFor="">Phone Number:</label>
              <input type="text" name='phone' value={userInfo.phone} onChange={handleUpdateInfo} />
            </div>
            <div className="table-row">
              <label htmlFor="">UserName:</label>
              <input type="text" name='username' value={userInfo.username} onChange={handleUpdateInfo} />
            </div>
            <button onClick={handleSubmitInfo}>Update Info</button>
          </div>
          <div className="password">
            <div className="table-row">
              <label htmlFor="">Password:</label>
              <input type="text" name='password' value={userInfo.password} onChange={handleUpdateInfo} />
            </div>
            <div className="table-row">
              <label htmlFor="">Confirm Pass:</label>
              <input type="text" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
            </div>
            <button onClick={handleSubmitPassword}>Update Password</button>
            {errorLog && <p>{errorLog}</p>}
          </div>
        </div>
        <div className="col l-6 avatar">
          <div className="avatar-border">
            <img src={userInfo.imgUrl} alt="" className='avatar-image' />
          </div>
          <div className="btn-avatar">
            <input type="text" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} /> <button onClick={handleUpdateAvatar}>Change avatar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
