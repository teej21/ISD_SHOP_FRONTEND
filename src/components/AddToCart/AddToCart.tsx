import React from 'react'
import NavCover from '../Homepage/Navbar/NavCover.tsx'
import ToolBar from '../Homepage/Navbar/Toolbar.tsx'
import NavMain from '../Homepage/Navbar/NavMain.tsx'
import AddToCartDetail from './AddToCartDetail.tsx'

const AddToCart = () => {
  return (
    <div>
      <NavCover></NavCover>
      <ToolBar></ToolBar>
      <NavMain></NavMain>
      <AddToCartDetail></AddToCartDetail>
    </div>
  )
}

export default AddToCart
