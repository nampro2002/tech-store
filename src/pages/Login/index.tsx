import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { AcceptLogin } from '../../redux/userSlice'

interface LoginInfo {
    username: string
    password: string
}

export default function Login() {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        username: '',
        password: ''
    })
    const [loginStatus, setLoginStatus] = useState(true)
    const userList = useAppSelector((state: RootState) => state.user.users)
    const dispatch = useAppDispatch()
    const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userLogin = userList.find(user => (user.username === loginInfo.username && user.password === loginInfo.password))
        if (userLogin) {
            dispatch(AcceptLogin(userLogin))

        } else {
            console.log("invalid");

        }

    }
    return (
        <form onSubmit={handleLogin}>
            <div className="">
                Username: <input type="text" name='username' value={loginInfo?.username} onChange={handleSetInput} />
            </div>
            <div className="">
                Password: <input type="text" name='password' value={loginInfo?.password} onChange={handleSetInput} />
            </div>
            <button>Login</button>
        </form>
    )
}
