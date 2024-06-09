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
import { useSelector } from 'react-redux';
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
import UpdateProduct from './Components/admin/UpdateProduct';
import OrderList from './Components/admin/OrderList';
import UpdateOrder from './Components/admin/UpdateOrder';
import UserList from './Components/admin/UserList';
import UpdateUser from './Components/admin/UpdateUser';
import ReviewList from './Components/admin/ReviewList';



function App() {
    const[stripeApiKey,setStripeApiKey]=useState("")
    const { isAuthenticated } = useSelector(state => state.authState)
    
    useEffect(() => {
      store.dispatch(loaduser)
      async function getStripeApiKey(){
        try{
        const {data} = await axios.get('http://localhost:8000/api/v1/stripeapi')
        setStripeApiKey(data.stripeApiKey)
        }catch(error){
          console.error(error)
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
          <Nav/>

          {/* Normal users routes */}
          <Routes>
          <Route 
             path='/' 
             element={<Home />} 
          />

          <Route 
             path='/search' 
             element={<Home />} 
          />

          <Route 
             path='/search/:keyword' 
             element={<ProductSearch/>}
          />

          <Route 
             path='/product/:id' 
             element={<ProductDetail/>} 
          />

          <Route 
                 path='/cart' 
                 element={<Cart/>} 
          />

          <Route 
                 path='/login' 
                 element={<Login/>} 
          />

          <Route 
                path='/register' 
                element={<Register />} 
          />

          <Route 
                path='/myprofile' 
                element={<ProtectedRoute>
                           <Profile />
                        </ProtectedRoute>} 
          />

          <Route 
                path='/myprofile/update' 
                element={<ProtectedRoute>
                           <UpdateProfile />
                        </ProtectedRoute>} 
          />

          <Route 
              path='/myprofile/update/password' 
              element={<ProtectedRoute>
                        <UpdatePassword/>
                       </ProtectedRoute>}
          />

          <Route 
              path='/shipping' 
              element={<ProtectedRoute>
                         <Shipping/>
                      </ProtectedRoute>}
          />

          <Route 
              path='/order/confirm' 
              element={<ProtectedRoute>
                        <ConfirmOrder/>
                      </ProtectedRoute>}
          />

          <Route 
              path='/order/success' 
              element={<ProtectedRoute>
                         <OrderSuccess/>
                       </ProtectedRoute>}
          />

          <Route 
              path='/orders' 
              element={<ProtectedRoute>
                        <UserOrders/>
                      </ProtectedRoute>}
          />

          <Route 
              path='/orders/:id' 
              element={<ProtectedRoute>
                        <OrderDetail/>
                      </ProtectedRoute>}/>

          {stripeApiKey && <Route 
                             path='/payment' 
                             element={<ProtectedRoute>
                                        <Elements stripe={loadStripe(stripeApiKey)}>
                                          <Payment/>
                                        </Elements> 
                                      </ProtectedRoute>}
                            />
         }
          </Routes>
          
         {/*admin routes*/}
          <Routes>
          <Route 
           path='/admin/dashboard'
           element={<ProtectedRoute isAdmin={true}>
                      <Dashboard />
                    </ProtectedRoute>} 
           />

          <Route 
             path='/admin/products' 
             element={<ProtectedRoute isAdmin={true}>
                       <ProductList />
                      </ProtectedRoute>} 
          />

          <Route 
             path='/admin/products/create' 
             element={<ProtectedRoute isAdmin={true}>
                         <NewProduct />
                      </ProtectedRoute>} 
          />
          <Route 
               path='/admin/product/:id' 
               element={<ProtectedRoute isAdmin={true}>
                           <UpdateProduct />
                        </ProtectedRoute>} 
          />

          <Route 
              path='/admin/orders' 
              element={<ProtectedRoute isAdmin={true}>
                           <OrderList />
                        </ProtectedRoute>}
          />

          <Route 
               path='/admin/order/:id' 
               element={<ProtectedRoute isAdmin={true}>
                            <UpdateOrder />
                        </ProtectedRoute>} 
          />

          <Route 
               path='/admin/users' 
               element={<ProtectedRoute isAdmin={true}>
                            <UserList />
                        </ProtectedRoute>} 
          />

          <Route 
              path='/admin/user/:id' 
              element={<ProtectedRoute isAdmin={true}>
                          <UpdateUser />
                        </ProtectedRoute>} 
          />

          <Route 
              path='/admin/reviews' 
              element={<ProtectedRoute isAdmin={true}>
                           <ReviewList />
                       </ProtectedRoute>} 
          />

           </Routes>
            <Footer />
          </HelmetProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
