import React, { Fragment, useEffect, useState } from 'react';
import ProductCard from '../../Components/products/ProductCard'; 
import MetaData from '../../Components/MetaData';
import { getProducts } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import { toast,ToastContainer } from 'react-toastify';
import Pagination from 'react-js-pagination'
import Errorcomp from '../Errorcomp';
import { useParams } from 'react-router-dom';
import Notfound from '../Notfound';

function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error,productsCount } = useSelector((state) => state.productState);
  const{keyword}=useParams()

  useEffect(() => {
    if(error){
      toast.error("error occurd")
    }else{
    dispatch(getProducts(keyword));
    }
  }, [error,dispatch,keyword]);


  return (
    <Fragment>
      {loading ? (<Loader/>) : error ? (<Errorcomp message={error}/>):
    <Fragment>
      <MetaData title={'Best products'} />

      <section id="products" className="container mt-5">
        <div className="row">
        {products && products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <Notfound/>
              )}
        </div>
      </section>
    </Fragment>
}
    </Fragment>
  );
}

export default ProductSearch;
