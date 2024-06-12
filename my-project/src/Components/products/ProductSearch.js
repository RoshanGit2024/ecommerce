import React, { Fragment, useEffect, useState } from 'react';
import ProductCard from '../../Components/products/ProductCard';
import MetaData from '../../Components/MetaData';
import { getProducts } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import { toast } from 'react-toastify';
import Errorcomp from '../Errorcomp';
import { useParams } from 'react-router-dom';
import Notfound from '../Notfound';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';


function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.productState);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState();
  const [rating, setRating] = useState(0);


  const { keyword } = useParams()

  const Categories = [
    'Electronics',
    'Mobile phones',
    'Laptops',
    'Food',
    'Books',
    'cloths/shoes',
    'Sports',
    'Outdoor',
    'Home',
    'Accessories'
  ]

  useEffect(() => {
    if (error) {
      toast.error("error occurd")
    } else {
      dispatch(getProducts(keyword, price, category, rating, currentPage));
    }
  }, [error, dispatch, keyword, priceChanged, category, rating]);


  return (
    <Fragment>
      {loading ? (<Loader />) : error ? (<Errorcomp message={error} />) :
        <Fragment>
          <MetaData title={'search products'} />
          <h1 id='product_heading'>search result</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className='col-6 col-md-3 mb-5 mt-5'>

                {/*filtering with price*/}
                <div className='mt-1'> 
                <h3 className='mb-3'>Price</h3>
                <div className='px-5' onMouseUp={() => setPriceChanged(price)}>
                  <Slider
                    range={true}
                    marks={
                      {
                        1: "$1",
                        1000: "$1000"
                      }
                    }
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price)
                    }}
                    handleRender={
                      renderProps => {
                        return (
                          <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                            <div {...renderProps.props}></div>
                          </Tooltip>
                        )
                      }
                    }
                  />
                </div>
                </div>
                <hr className='my-5' />

                {/*filtering with category*/}
                <div className='mt-5'>
                  <h3 className='mb-3'>Categories</h3>
                  <ul className='pl-0'>
                    {Categories.map(category =>
                      <li
                        style={{
                          cursor: 'pointer',
                          listStyleType: 'none',
                        }}
                        key={category}
                        onClick={() => {
                          setCategory(category)
                        }}
                      >
                        {category}
                      </li>
                    )}
                  </ul>
                </div>
                <hr className='my-5'/>
                {/*filtering with ratings*/}
                <div className='mt-5'>
                  <h3 className='mb-2'>Ratings</h3>
                  <ul className='pl-0'>
                    {[5,4,3,2,1].map(star =>
                      <li
                        style={{
                          cursor: 'pointer',
                          listStyleType: 'none',
                        }}
                        key={star}
                        onClick={() => {
                          setRating(star)
                        }}
                      >
                        <div className='rating-outer'>
                           <div 
                           className='rating-inner'
                           style={{
                            width:`${star * 20}%`
                           }}
                           >

                           </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className='col-6 col-md-9'>
                <div className='row'>
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <ProductCard col={4} key={product._id} product={product} />
                    ))
                  ) : (
                    <Notfound />
                  )}
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      }
    </Fragment>
  );
}

export default ProductSearch;
