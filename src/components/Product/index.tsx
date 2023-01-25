import { useNavigate } from 'react-router-dom'
import '../../Gridcss/grid.css'
import { CheckCart } from '../../redux/cartSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { IProduct } from '../../types/type'
import './style.css'

interface ProductProp {
    product: IProduct
}

export default function Product({ product }: ProductProp) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    // const userInfo = useAppSelector((state: RootState) => state.user.userLogged)
    const userInfo = JSON.parse(localStorage.getItem("user")||'{}')
    const handleAddToCart = (product: IProduct) => {
        if (!userInfo) {
            return navigate('/login')
        }
        else {
            dispatch(CheckCart({
                product: product,
                userId: userInfo.id
            }))
        }
    }
    return (
        <div className="main-product">
            <div className="">
                <img src={product.imageUrl} alt="" className='product-image' />
            </div>
            <div className="product-info">
                <h4>{product.name}</h4>
                <span>{product.price}</span>
                <button onClick={() => handleAddToCart(product)}>Add to cart</button>
            </div>
        </div>
    )
}
