import './App.css';
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen"
import CartScreen from './screens/CartScreen';
import ConfirmPurchase from './screens/ConfirmPurchase';

import Navbar from './components/Navbar'
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';
import Footer from './components/Footer';

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <Navbar click={() => setSideToggle(true)} />
      <main>
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
          <Route path='/passwordreset/:resetToken' element={<ResetPasswordScreen />} />
          <Route path='/' exact element={<HomeScreen />} />
          <Route path='/product/:id' exact element={<ProductScreen />} />
          <Route path='/cart' exact element={<CartScreen />} />
          <Route path='/confirmpurchase' element={<ConfirmPurchase />}/>
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
