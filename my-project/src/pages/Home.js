import React, { Fragment, useEffect, useState } from 'react';
import ProductCard from '../Components/products/ProductCard'; 
import MetaData from '../Components/MetaData';
import { getProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import { toast,ToastContainer } from 'react-toastify';
import Errorcomp from '../Components/Errorcomp';
import Pagination from 'react-js-pagination'

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error,productsCount } = useSelector((state) => state.productState);

  useEffect(() => {
    if(error){
      toast.error("error occurd")
    }else{
    dispatch(getProducts(null));
    }
  }, [error,dispatch]);

  return (
    <Fragment>
      {loading ? (<Loader/>) : error ? (<Errorcomp message={error.message}/>):
    <Fragment>
      <MetaData title={'Best products'} />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products && products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      </section>
    </Fragment>
}
    </Fragment>
  );
}

export default Home;
