import { useEffect, useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './pages/Home';
import 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Productadd from './pages/Productadd';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Components/cart/Cart';
import {HelmetProvider} from 'react-helmet-async'
import ProductDetail from './Components/products/ProductDetail';
import ProductSearch from './Components/products/ProductSearch';
import Login from './Components/user/Login';
import Register from './Components/user/Register';
import store from './Store'
import { loaduser } from './actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './Components/user/Profile';
import ProtectedRoute from './Components/routes/ProtectedRoute';
import UpdateProfile from './Components/user/UpdateProfile';
import UpdatePassword from './Components/user/UpdatePassword';
import Shipping from './Components/cart/Shipping';



function App() {
    const[cartItems,setcartitems]=useState([])
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.authState)
    
    useEffect(()=>{
      if(!isAuthenticated){
      store.dispatch(loaduser)
      }
    },[isAuthenticated,dispatch])

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
          <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
          <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
          </Routes>
          <Footer />
          </HelmetProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
