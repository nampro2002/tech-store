import '../../Gridcss/grid.css'
import { CheckCart } from '../../redux/cartSlice'
import { useAppDispatch } from '../../redux/hooks'
import { IProduct } from '../../types/type'
import './style.css'

interface ProductProp{
    product: IProduct
}

export default function Product({product}:ProductProp) {
    const dispatch = useAppDispatch()
    const handleAddToCart = (product:IProduct)=>{
        dispatch(CheckCart(product))
    }
    return (
            <div className="main-product">
                <div className="">
                    <img src={product.imageUrl} alt="" className='product-image'/>                 
                </div>
                <div className="product-info">
                    <h4>{product.name}</h4>
                    <span>{product.price}</span>
                    <button onClick={()=>handleAddToCart(product)}>Add to cart</button>
                </div>
            </div>
    )
}
