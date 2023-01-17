import Product from '../../components/Product'
import './style.css'
import '../../Gridcss/grid.css'
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
export default function Home() {
  const productList = useAppSelector((state: RootState) => state.productList.productList)
  // console.log(productList);
  return (
    <div className="home">
      <div className='gird'>
        <div className="row no-gutters">
          {productList.map(product => (
            <div key={product.id} className="col l-4 home-prod"><Product product={product} /></div>
          ))}
        </div>
      </div>
    </div>
  )
}
