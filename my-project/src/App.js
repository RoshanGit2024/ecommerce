import { useEffect, useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './pages/Home';
import 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import ConfirmOrder from './Components/cart/ConfirmOrder';
import Payment from './Components/cart/Payment';
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './Components/cart/OrderSuccess';
import UserOrders from './Components/order/UserOrders';
import OrderDetail from './Components/order/OrderDetail';
import Dashboard from './Components/admin/Dashboard';
import ProductList from './Components/admin/ProductList';
import NewProduct from './Components/admin/NewProduct';



function App() {
    const[stripeApiKey,setStripeApiKey]=useState("")
    const[cartItems,setcartitems]=useState([])
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.authState)

    const [attempts,setAttempts]=useState(0)
    const [isLocked,setIsLocked]=useState(false);
    const [timer,setTimer]=useState(0)
    
    useEffect(() => {
      store.dispatch(loaduser)
      async function getStripeApiKey(){
        try{
        const {data} = await axios.get('http://localhost:8000/api/v1/stripeapi')
        setStripeApiKey(data.stripeApiKey)
        }catch(error){
          console.error(error.mess)
        }
      }
      getStripeApiKey()
    },[])

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
          <Route path='/login' element={<Login attempts={attempts} 
                                              setAttempts={setAttempts}
                                              isLocked={isLocked}
                                              setIsLocked={setIsLocked}
                                              timer={timer}
                                              setTimer={setTimer} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
          <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
          <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
          <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
          <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute>}/>
          <Route path='/orders/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute>}/>
          {stripeApiKey &&  <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements> </ProtectedRoute>}/> }
          </Routes>
          <Routes>
          <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
          <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
          <Route path='/admin/products/create' element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />
          </Routes>
          <Footer />
          </HelmetProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
