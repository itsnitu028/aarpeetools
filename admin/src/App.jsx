import React,{createContext,useState} from 'react'
import "./index.css"
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import { Route, Routes ,useLocation} from 'react-router-dom'
import SideBar from './Components/SideBar/SideBar'
import Home from './Components/Home/Home'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import Update_Details from './Pages/Update_Details/Update_Details'
import UpdateCategory from './Pages/UpdateCategory/UpdateCategory'
import Add_Product from './Pages/Add Product/Add_Product'
import Product_List from './Pages/Product List/Product_List'
import EditProduct from './Pages/EditProduct/EditProduct'
import CustomerHome from './CustomerComponents/CustomerHome/CustomerHome'
import Category from './CustomerPages/Category/Category'
import FilterByCategory from './CustomerPages/FilterByCategory/FilterByCategory'
import Product from './CustomerPages/Product/Product'
import ShowProduct from './CustomerPages/ShowProduct/ShowProduct'
import {Toaster} from "react-hot-toast";
import bg from "../src/assets/image.png"
import About from './CustomerPages/About/About'
import CartPanel from './CustomerPages/CartPanel/CartPanel'
import CheckoutModal from './CustomerPages/Checkout/CheckoutModal'

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CartPage from './CustomerPages/CartPage/CartPage'

import PageNotFound from './PageNotFound'
import {GoogleOAuthProvider} from '@react-oauth/google';



const MyContext= createContext();


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/api/admin');

    const isAuthenticated = !!localStorage.getItem('auth-token');

  const isLoginPage = location.pathname === '/api/admin/login';
  const isAdminHome = location.pathname === '/api/admin/home';
  const shouldShowBg = (isLoginPage || isAdminHome) && !isAuthenticated;

  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user-info");
    return savedUser ? JSON.parse(savedUser) : null;
  });

   const Wrapper = ({ children }) =>
    shouldShowBg ? (
      <div
        style={{
          background: `url(${bg}) no-repeat center center/cover `,
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    ) : (
      <>{children}</>
    );

    const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  const getCartKey = (item) => {
    const parts = [item.productId];
    if (item.variationKey) parts.push(item.variationKey);
    if (item.materialName) parts.push(item.materialName);
    return parts.join('|');
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const key = getCartKey(item);
      const index = prev.findIndex((ci) => getCartKey(ci) === key);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + item.quantity
        };
        return updated;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (keyOrIndex) => {
    setCartItems((prev) => {
      if (typeof keyOrIndex === 'number') {
        return prev.filter((_, i) => i !== keyOrIndex);
      }
      return prev.filter((ci) => getCartKey(ci) !== keyOrIndex);
    });
  };

  const updateCartItemQuantity = (keyOrIndex, quantity) => {
    setCartItems((prev) => {
      const index = typeof keyOrIndex === 'number' ? keyOrIndex : prev.findIndex((ci) => getCartKey(ci) === keyOrIndex);
      if (index === -1) return prev;
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: Math.max(1, quantity) };
      return updated;
    });
  };

  const clearCart = () => setCartItems([]);

  const logout = () => {
    localStorage.removeItem("user-info");     
    localStorage.removeItem("auth-token");    
  
    setUser(null);  
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 0)), 0);

  const value={
    setOpenCartPanel,
    setOpenCheckout,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartItems,
    cartCount,
    cartSubtotal,
    user,
    setUser,
    logout,
  }

  return (
    <>
    <MyContext.Provider value={value}>
    <Wrapper>
       {isAdminRoute && <Navbar />}
       <Toaster />
      <Routes >
         {/* Customer routes */}
      <Route index path='/' element={<CustomerHome /> } />
      <Route index path='/home' element={<CustomerHome /> } />
      <Route path='/category' element={<Category />} />
      <Route path='/product' element={<Product/>} />
      <Route path='/product/:id' element={<ShowProduct/> }/>
      <Route path='/category/:id' element={<FilterByCategory />} />
      <Route path='/about' element={<About/>} />
      <Route path='/cart' element={<CartPage />} />

       {/* Admin routes */}
       
      <Route path='/api/admin/login' element={<Login />}/>
      <Route path='/api/admin/home' element={<Home />} />
      {/* <Route path='/api/admin' element={<Home />} /> */}
      <Route path='/api/admin/change-password' element={<ChangePassword />} />
      <Route path='/api/admin/add' element={<Add />} />
      <Route path='/api/admin/addproduct' element={<Add_Product />} />
      <Route path='/api/admin/list' element={<List />} />
      <Route path='/api/admin/orders' element={<Orders />} />
      <Route path='/api/admin/update-details' element={<Update_Details />} />
      <Route path='/api/admin/update/:id' element={<UpdateCategory />} />
      <Route path='/api/admin/listproduct' element={<Product_List />} />
      <Route path="/api/admin/edit-product/:id" element={<EditProduct />} />

      {/*page not found*/}
      <Route path='*' element={<PageNotFound />} />
      </Routes>  

    </Wrapper>

    <Drawer open={openCartPanel} onClose={toggleCartPanel(false)} anchor='right'
    className='cartPanel '>
        {<CartPanel toggleCartPanel={toggleCartPanel} />}
      </Drawer>

    <CheckoutModal open={openCheckout} onClose={()=>setOpenCheckout(false)} />

    </MyContext.Provider>
   
     </>
  )
}

export default App;
export {MyContext};