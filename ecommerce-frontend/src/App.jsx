import { Routes, Route} from 'react-router'
import { useState, useEffect } from 'react'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import './App.css'
import { OrdersPage } from './pages/orders/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import axios from 'axios'



function App() {
    const [cart, setCart] = useState([]);

    const loadCart = async () => {
        const res = await axios.get('api/cart-items?expand=product');

        setCart(res.data)
      }

    useEffect(()=>{
      loadCart();
    },[])
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage cart={cart} loadCart={loadCart}/>}/> 
        <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart}/>}/>
        <Route path='orders' element={<OrdersPage cart={cart}/>} />
        <Route path='tracking' element={<TrackingPage/>} />
      </Routes>
      
    </>
  )
}

export default App
