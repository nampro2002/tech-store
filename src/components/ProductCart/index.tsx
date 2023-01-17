import React from 'react'
import '../../Gridcss/grid.css'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/cartSlice'
import { useAppDispatch } from '../../redux/hooks'
import { IProductCart } from '../../types/type'
import './style.css'

interface ProductCartProps {
    productCart: IProductCart
}

export default function ProductCart({ productCart }: ProductCartProps) {
    const dispatch = useAppDispatch()
    const handleRemoveProductCart = (productCartId: string) => {
        dispatch(removeFromCart(productCartId))
    }
    const handleUpdateQuantity = (productCart: IProductCart, value: string) => {
        if (value === "-") {
            dispatch(decreaseQuantity({
                id: productCart.id,
                name: productCart.name,
                quantity: productCart.quantity - 1
            }))
        } else if (value === "+") {
            dispatch(increaseQuantity({
                id: productCart.id,
                name: productCart.name,
                quantity: productCart.quantity + 1
            }))
        }
    }
    return (
        <div className="product-cart ">
            <div className='grid wide'>
                <div className=" row no-gutters">
                    <div className="col l-2">{productCart.id}</div>
                    <div className="col l-5">{productCart.name}</div>
                    <div className="col l-3">
                        <button onClick={() => handleUpdateQuantity(productCart, "-")}>-</button>
                        {productCart.quantity}
                        <button onClick={() => handleUpdateQuantity(productCart, "+")}>+</button>
                    </div>
                    <div className="col l-2">
                        <button onClick={() => handleRemoveProductCart(productCart.id)}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
