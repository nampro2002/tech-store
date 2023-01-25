import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Notfound from './pages/NotFound';
import Products from './pages/Products';
import Register from './pages/Register';
import Search from './pages/Search';
import User from './pages/User';
import { getAllCart } from './redux/cartSlice';
import { useAppDispatch } from './redux/hooks';
import { getAllProduct } from './redux/productSlice';
import { getAllUser } from './redux/userSlice';

function App() {
  const dispatch = useAppDispatch()
  const userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  useEffect(() => {
    // localStorage.removeItem("user")
    dispatch(getAllCart(userInfo.id))
    dispatch(getAllProduct())
    dispatch(getAllUser())
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<Notfound />} />
        <Route path='/' element={<MainPage />}>
          <Route path='home' element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products' element={<Products />} />
          <Route path='search' element={<Search />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='user' element={<User />} />
          {/* <Route path='/expenses' element={<ProductDetails />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
