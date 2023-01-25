import Product from '../../components/Product'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import './style.css'
export default function Products() {

  const productList = useAppSelector((state: RootState) => state.productList.productList)
  console.log(productList);
  
  return (
    <div className='all-product'>
      <div className="grid wide">
        <div className="row no-gutters">
          <div className="col l-2">
            <div className="category">
              Category
            </div>
          </div>
          <div className="col l-10">
            <div className="row no-gutters product-list">
              {productList.map(product=>(
                 <div key={product.id} className="col l-4 home-prod"><Product product={product} /></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
