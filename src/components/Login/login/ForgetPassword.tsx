import React from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { Container, Card, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemeContext } from '../../../context/ClickTheme.tsx'
import SuccessfulMessage from './SuccessfulMessage.tsx'
import { INewPassword } from '../../../interface/IUSerInfo.ts'
import { submitForgetPassword } from '../../../composables/submitForgetPassword.ts'
import schema from '../../../validation/ForgetPwVal.ts';

const ForgetPassword = () => {
  const theme = useContext(ThemeContext)
  const form = useRef<HTMLFormElement | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<INewPassword>({ resolver: zodResolver(schema) })

  const submitNewPassword = async (data: INewPassword) => {
   await submitForgetPassword(data, theme, form);
  };

  return (
    <div>
      <Container>
        <Card className='px-[30px] py-[20px] md:w-[600px] w-8/10 absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]'>
          <div>
            <h1 className='font-bold text-3xl text-center mb-8'>QUÊN MẬT KHẨU</h1>
            <form className='flex flex-col gap-[30px]' onSubmit={handleSubmit(submitNewPassword)} ref={form}>
              <div className='flex flex-col gap-[10px]'>
                <label htmlFor='Nhập địa chỉ tài khoản' className='text-lg'>Nhập lại địa chỉ Email của tài khoản *</label>
                <TextField className='bg-login_input' id="filled-basic" placeholder="Địa chỉ Email" variant="outlined" type='text' {...register('account')} name="account" />
                {errors.account?.message && <span className='text-red-500 font-bold'>{errors.account?.message}</span>}
              </div>
              <div className='flex flex-col gap-[10px]'>
                <label htmlFor='Nhập mật khẩu mới' className='text-lg'> Mật khẩu mới *</label>
                <TextField className='bg-login_input' id="filled-basic" placeholder="Mật khẩu mới" variant="outlined" type='password' {...register('newPassword')} name="newPassword">
                
                </TextField>
                {errors.newPassword?.message && <span className='text-red-500 font-bold'>{errors.newPassword?.message}</span>}
              </div>
              <Button type="submit" variant="contained" className='mx-auto my-4' style={{ backgroundColor: '#9A917A' }} disabled={isSubmitting}>Xác nhận</Button>
            </form>
          </div>
        </Card>
        {theme.clickSignUp && <SuccessfulMessage></SuccessfulMessage>}
      </Container>
    </div>
  )
}

export default ForgetPassword
