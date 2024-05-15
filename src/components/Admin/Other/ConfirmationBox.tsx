import React from 'react'
import { Button } from '@mui/material'
const ConfirmationBox = () => {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-2 border-solid shadow-shadow_primary w-[400px] h-[200px] bg-white'>
      <h1>Bạn có muốn xóa hàng này?</h1>
      <div className='flex flex-row justify-between items-center'>
        <Button>Có</Button>
        <Button onClick={}>Không</Button>
      </div>
    </div>
  )
}

export default ConfirmationBox
