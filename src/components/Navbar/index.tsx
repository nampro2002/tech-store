import React, { useState } from 'react'
import '../../Gridcss/grid.css'
import './style.css'
import { createSearchParams, Link, redirect, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { Logout } from '../../redux/userSlice'
import MiniCart from '../MiniCart'
// import '../'

export default function Navbar() {
  const [inputSearch, setInputSearch] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const logged = useAppSelector((state: RootState) => state.user.userLogged)
  // console.log("logged", logged);
  const userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  console.log(userInfo);
  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputSearch === "") {
      return;
    }
    const input = inputSearch
    setInputSearch('')
    return navigate({
      pathname: "search",
      search: createSearchParams({
        input: input as string
      }).toString()
    });
  }
  const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value)

  }
  const handleLogout = () => {
    dispatch(Logout())
    return navigate('/login')

  }
  return (
    <div className="navbar">
      <div className='navbar-main grid wide'>
        <div className="row no-gutters center item-center">
          <div className="logo col l-2">
            <Link to='home'>
              <img src="https://cdn.elly.vn/uploads/2021/01/06205934/y-nghia-logo-thuong-hieu-chanel.png"
                alt="logo"
                className='logo-image' />
            </Link>
          </div>
          <div className="col l-1 ">
            <Link to='products'>All Product</Link>
          </div>
          <div className="col l-6 ">
            <form onSubmit={handleSubmitSearch}>
              <input type="text" className="navbar-input" value={inputSearch} onChange={handleSetInput} />
              <button className="navbar-search-button">Search</button>
            </form>
          </div>
          <div className="col l-1 navbar-cart-btn">
            <Link to='cart'>
              <button className='btn-cart'>Cart</button>
            </Link>
            <div className="mini-cart-hover">
              <MiniCart />
            </div>
          </div>
          {userInfo.id && (
            <>
              <div className="col l-2">
                <div className="grid">
                  <Link to='user'>User</Link>
                  <button className='logout' onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </>
          )}
          {!userInfo.id && (
            <>
              <div className="col l-1"><Link to='login'><button>Login</button></Link></div>
              <div className="col l-1"><Link to='register'><button>Register</button></Link></div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
