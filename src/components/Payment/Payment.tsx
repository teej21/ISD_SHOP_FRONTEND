import React from 'react'
import NavCover from '../Homepage/Navbar/NavCover.tsx';
import ToolBar from '../Homepage/Navbar/Toolbar.tsx';
import NavMain from '../Homepage/Navbar/NavMain.tsx';
import PaymentDetail from './PaymentDetail.tsx';
import Footer from '../Homepage/Footer/Footer.tsx';
const Payment = () => {
  return (
    <div>
      <NavCover></NavCover>
      <ToolBar></ToolBar>
      <NavMain></NavMain>
      <PaymentDetail></PaymentDetail>
      <Footer></Footer>
    </div>
  )
}

export default Payment
