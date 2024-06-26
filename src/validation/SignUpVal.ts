import { z } from 'zod';
import { IUserSignUp } from '../interface/IUSerInfo';

type OmitRoleId = Omit<IUserSignUp, 'role'>;

const schema: z.ZodType<OmitRoleId> = z.object({
  full_name: z.string().min(1, { message: 'Tất cả các trường thông tin là bắt buộc' }).max(100, { message: 'Tên không được vượt quá 100 kí tự' }),
  email: z.string().email({ message: "Tất cả các trường thông tin là bắt buộc" }),
  gender: z.string().min(1, { message: "Tất cả các trường thông tin là bắt buộc" }),
  phone_number: z.string().min(9, { message: 'Số điện thoại không hợp lệ!' }).max(10, {message: 'Số điện thoại không hợp lệ!'}),

  password: z.string().min(8, { message: 'Mật khẩu phải trên 8 kí tự' }).max(200, { message: 'Mật khẩu quá 200 kí tự' }),
  confirm_password: z.string().min(8, { message: 'Mật khẩu phải trên 8 kí tự' }).max(200, { message: 'Mật khẩu quá 200 kí tự' }),
}).refine(data => data.password === data.confirm_password, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirm_password']
}).refine(data => data.phone_number.charAt(0) === '0', {
  message: 'Số điện thoại không hợp lệ!'
});

export default schema;
