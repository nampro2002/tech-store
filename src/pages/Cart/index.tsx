import React, { useEffect } from 'react'
import ProductCart from '../../components/ProductCart';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import '../../Gridcss/grid.css'
import './style.css'
import { getAllCart } from '../../redux/cartSlice';
export default function Cart() {
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(getAllCart())
    },[dispatch])
    const cartList = useAppSelector((state: RootState) => state.cart.cartList)
    // console.log(cartList);
    return (
        <div>
            <div className='grid wide'>
                <div className="cart row no-gutters">
                    <div className="col l-2">ID</div>
                    <div className="col l-5">Name</div>
                    <div className="col l-3">Quantity</div>
                    <div className="col l-2">Remove</div>
                </div>
            </div>
            {cartList.map((productCart) => (
                <ProductCart key={productCart.id} productCart={productCart} />

            ))}
        </div>
    )
}
