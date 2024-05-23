import { useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './pages/Home';
import 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Productadd from './pages/Productadd';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import {HelmetProvider} from 'react-helmet-async'
import ProductDetail from './Components/products/ProductDetail';
import ProductSearch from './Components/products/ProductSearch';
import Login from './Components/user/Login';
import Register from './Components/user/Register';


function App() {
    const[cartItems,setcartitems]=useState([])
  return (
    <div className="App">
      <BrowserRouter>

        <div>
          <ToastContainer theme='dark' position='top-center'/>
          <HelmetProvider>
          <Nav cartItems={cartItems}/>
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Home />} />
          <Route path='/search/:keyword' element={<ProductSearch/>}/>
          <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setcartitems={setcartitems}/>} />
          <Route path='/cart' element={<Cart cartItems={cartItems} setcartitems={setcartitems}/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          </Routes>
          <Footer />
          </HelmetProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
