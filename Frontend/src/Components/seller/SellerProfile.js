import React from 'react'
import { useSelector } from 'react-redux';
import SidebarSeller from './SidebarSeller';
import { Link } from 'react-router-dom';

function SellerProfile() {
  const { products, loading } = useSelector((state) => state.productState);
  return (
    <div className="row">
      <div className='col-12 col-md-2'>
        <SidebarSeller />
      </div>
      <div className='d-flex flex-column ml-3 justify-content-between'>
        <header className="d-flex mb-4">
          <img src="https://th.bing.com/th/id/R.35720bbf29a0f0f1d48195bafdbedf7a?rik=1ArMFF%2fGA8AK1g&riu=http%3a%2f%2fshmector.com%2f_ph%2f13%2f188552034.png&ehk=4W3VAJ3Rgszg4unVrkViPToNE%2b15%2bt3SxRm%2b2VYCdIk%3d&risl=&pid=ImgRaw&r=0" alt={`Logo`} className="img-fluid rounded-circle mb-3" style={{ width: '150px', height: '150px' }} />
          <div className="d-flex flex-column ml-2 mt-3">
            <h1 className="display-4">Ebay</h1>
            <p className="lead text-muted">#line</p>
          </div>
          <div class="followers-count text-center mx-5 mt-3">
            <span class="count">123</span> <br/>
            Followers
          </div>
        </header>


        <section className="mb-5">
          <h2 className="mb-3">About</h2>
          <p>our company providing good quality products</p>

          <h2 className="mt-4 mb-3">Contact Information</h2>
          <p>Email: <a href={`mailto:someone@gmail.com`}>someone@gmail.com</a></p>
          <p>Phone: 321323232</p>
          <p>Address: banglore</p>
        </section>

        <h2 className="mb-4">Our Products</h2>
        <div className='row'>
          {products.map(item => (
            <div className="col-sm-12 col-md-6 col-lg-3 my-3 mx-5">
              <div key={item._id} className="card p-3 rounded">
                <img
                  className="card-img-top mx-auto"
                  src={item.images[0].image}
                  alt={item.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <Link to={`/singleproduct/${item._id}`}>{item.name}</Link>
                  </h5>
                  <div className="ratings mt-auto">
                    <div className="rating-outer">
                      <div className="rating-inner" style={{ width: `${(item.ratings / 5) * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({item.numberOfreviews}Reviews)</span>
                  </div>
                  <p className="card-text">${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerProfile
