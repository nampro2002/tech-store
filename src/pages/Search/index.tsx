import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Product from '../../components/Product';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

export default function Search() {
  const [searchParam] = useSearchParams()
  const param = searchParam.get("input");
  const productList = useAppSelector((state: RootState) => state.productList.productList)
  const searchList = useAppSelector((state: RootState) => {
    if (param) {
      const searchOut = productList.filter(prod => (prod.name.toLowerCase()).includes(param.toLowerCase()))
      return searchOut
    }
  })
  // console.log("searchList", searchList);
  // console.log("productList", productList);

  return (
    <div className='grid wide'>
      
      {param && (<div>{`Kết quả tìm kiếm cho "${param}"`}</div>)}
      <div className="row no-gutters">
        {searchList?.map((prod) => (
          <div key={prod.id} className="col l-3" style={{marginTop:'20px'}}>
            <Product product={prod} />
          </div>
        ))}
      </div>
    </div>
  )
}
