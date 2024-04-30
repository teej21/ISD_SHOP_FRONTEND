import React from 'react'
import NavMain from './Navbar/NavMain.tsx'
import NavCover from './Navbar/NavCover.tsx'
import ToolBar from './Navbar/Toolbar.tsx'
import Cover from './Cover/Cover.tsx'
import Description from './Cover/Description.tsx'
import SpecialPicture from './Items/SpecialPicture.tsx'
import Orders from './Options/Orders.tsx'
import Footer from './Footer/Footer.tsx'
const Homepage = () => {
  return (
    <div>
    <NavCover></NavCover>
    <ToolBar></ToolBar>
    <NavMain></NavMain>
    <Cover></Cover>
    <Description></Description>
    <SpecialPicture></SpecialPicture>
    <Orders></Orders>
    <Footer></Footer>
    </div>
  )
}

export default Homepage