import React, { Fragment, useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard'
import { useSearchParams } from 'react-router-dom'

function Home() {
  const [products, setproducts] = useState([])
  const[searchparams,setsearchparams]=useSearchParams()

  /*const handleClick=()=>{
    console.log(searchparams)
  }*/
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/products?'+searchparams)
      .then(res => res.json())
      .then(res => setproducts(res.products))
      .catch(err => console.error("error occurd:" + err.message))
  }, [searchparams])
  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.map(product =><ProductCard product={product}/>)}
        </div>
      </section>
    </Fragment>
  )
}

export default Home
