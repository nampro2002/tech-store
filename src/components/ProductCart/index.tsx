import { nanoid } from '@reduxjs/toolkit'
import React from 'react'
import '../../Gridcss/grid.css'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/cartSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { IProductCart } from '../../types/type'
import './style.css'

interface ProductCartProps {
    productCart: IProductCart
}

export default function ProductCart({ productCart }: ProductCartProps) {
    const dispatch = useAppDispatch()
    // const userInfo = useAppSelector((state: RootState) => state.user.userLogged)
    const userInfo = JSON.parse(localStorage.getItem("user") || '{}')
    const handleRemoveProductCart = (productCartId: string) => {
        dispatch(removeFromCart(productCartId))
    }
    const handleUpdateQuantity = (productCart: IProductCart, value: string) => {

        if (value === "-") {
            if (productCart.quantity === 1) {
                dispatch(removeFromCart(productCart.id))
            } else {
                dispatch(decreaseQuantity({
                    id: productCart.id,
                    prodId: productCart.prodId,
                    userId: userInfo.id,
                    price: productCart.price,
                    name: productCart.name,
                    quantity: productCart.quantity - 1
                }))
            }
        } else if (value === "+") {
            dispatch(increaseQuantity({
                id: productCart.id,
                prodId: productCart.prodId,
                userId: userInfo.id,
                price: productCart.price,
                name: productCart.name,
                quantity: productCart.quantity + 1
            }))
        }
    }
    const totalPrice = productCart.quantity * productCart.price
    return (
        <div className="product-cart ">
            <div className='grid wide'>
                <div className=" row no-gutters">
                    <div className="col l-2">{productCart.prodId}</div>
                    <div className="col l-3">{productCart.name}</div>
                    <div className="col l-3">
                        <button onClick={() => handleUpdateQuantity(productCart, "-")}>-</button>
                        {productCart.quantity}
                        <button onClick={() => handleUpdateQuantity(productCart, "+")}>+</button>
                    </div>
                    <div className="col l-2">
                        {totalPrice}
                    </div>
                    <div className="col l-2">
                        <button onClick={() => handleRemoveProductCart(productCart.id)}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
