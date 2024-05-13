import React, { useContext } from 'react'
import GridBox from './GridBox.tsx';
import { ClickBarContext } from '../../../context/ClickForHomepage.tsx';
const SpecialPicture = () => {
const click = useContext(ClickBarContext);
  return (
    <div>
      <div className='my-[50px] text-center' id='products' ref={click.introductionRef}>
        <span className='text-[#555868] p-2 text-3xl font-bold'>Các Dòng Tranh Nổi Bật</span>
      </div>
      <div>
        <GridBox/>
    </div>
    </div>
  )
}

export default SpecialPicture