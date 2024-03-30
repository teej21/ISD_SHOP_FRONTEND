import React from 'react'
import GridBox from './GridBox.tsx';
const SpecialPicture = () => {
    const gridItems = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div>
      <div className='my-[50px] text-center'>
        <span className='text-[#555868] p-2 text-3xl font-bold'>Tranh Sơn Dầu Nổi Bật</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mx-auto my-8 w-8/10 max-w-[1200px]">
      {gridItems.map((item) => (
        <GridBox key={item} />
      ))}
    </div>
    </div>
  )
}

export default SpecialPicture