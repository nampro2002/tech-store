import React, { useEffect } from 'react'
import ProductCart from '../../components/ProductCart';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import '../../Gridcss/grid.css'
import './style.css'
import { getAllCart } from '../../redux/cartSlice';
export default function Cart() {
    const dispatch = useAppDispatch()
    // const userInfo = useAppSelector((state:RootState)=>state.user.userLogged)    
    const cartList = useAppSelector((state: RootState) => state.cart.cartList)
    // console.log(cartList);
    const totalPrice = cartList.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
        0)
    console.log(cartList);
    return (
        <div className='cart-main'>
            <div className='grid wide'>
                <div className="cart row no-gutters">
                    <div className="col l-2">ID</div>
                    <div className="col l-3">Name</div>
                    <div className="col l-3">Quantity</div>
                    <div className="col l-2">Price</div>
                    <div className="col l-2">Remove</div>
                </div>
            </div>
            {cartList.map((productCart) => (
                <ProductCart key={productCart.id} productCart={productCart} />

            ))}
            <div className="footer-cart">
            {totalPrice !== 0 && <div className="">Total Price: {totalPrice}$</div>}
            {cartList.length !== 0 && (<div className="">
                <button>Thanh Toán</button>
            </div>)}
            </div>
        </div>
    )
}
