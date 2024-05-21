import { useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './pages/Home';
import 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Productadd from './pages/Productadd';
import ProductDetail from './pages/ProductDetail';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';


function App() {
    const[cartItems,setcartitems]=useState([])
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <ToastContainer theme='dark' position='top-center'/>
          <Nav cartItems={cartItems}/>
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setcartitems={setcartitems}/>} />
          <Route path='/cart' element={<Cart cartItems={cartItems} setcartitems={setcartitems}/>} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
