import React, { useState } from 'react'
import '../../Gridcss/grid.css'
import './style.css'
import { createSearchParams, Link, redirect, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { Logout } from '../../redux/userSlice'
// import '../'

export default function Navbar() {
  const [inputSearch, setInputSearch] = useState<string>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const logged = useAppSelector((state: RootState) => state.user.userLogged)
  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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

  }
  return (
    <div className="navbar">
      <div className='navbar-main grid wide'>
        <div className="row no-gutters">
          <div className="col l-2">
            <Link to='home'>Logo</Link>
          </div>
          <div className="col l-2 ">
            <Link to='products'>All Product</Link>
          </div>
          <div className="col l-5 ">
            <form onSubmit={handleSubmitSearch}>
              <input type="text" className="navbar-input" value={inputSearch} onChange={handleSetInput} />
              <button className="navbar-search-button">Search</button>
            </form>
          </div>
          <div className="col l-1">
            <button className='navbar-cart-btn'><Link to='cart'>Cart</Link> </button>
          </div>
          {logged.id && (
            <>
              <div className="col l-2">
                <div className="grid">
                  <Link to='user'>User</Link>
                  <button className='logout' onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </>
          )}
          {!logged.id && (
            <div className="col l-1"><Link to='login'>Login</Link></div>
          )}
        </div>
      </div>
    </div>
  )
}
