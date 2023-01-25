import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import './style.css'
export default function MiniCart() {
  const cartList = useAppSelector((state: RootState) => state.cart.cartList)
  return (
    <div className='mini-cart'>
      <div className="main-mini-cart">
        {cartList.map(prod => (
          <div className="mini-product">
            <img src="https://cdn.shopify.com/s/files/1/0618/9744/1465/products/classic3_c722948fd43943ee908b67364d0f27e7_3fac2f89ff74400ca1272b3854ad34f4_master_2048x.jpg?v=1661225560" alt="" className='mini-image' />
            <p>{prod.name}</p>
            <p>{prod.price}$</p>
            <p>{prod.quantity}</p>
          </div>
        ))}
      </div>
      <div className="go-to-cart">
        <Link to='cart'>
          <button>Go to Cart</button>
        </Link>
      </div>
    </div>
  )
}
