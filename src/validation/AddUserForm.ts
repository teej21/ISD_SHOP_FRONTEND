import { z } from 'zod';
import { AddUser } from '../interface/IUSerInfo';

type OmitID = Omit<AddUser, 'id'>
const schema: z.ZodType<OmitID> = z.object({
    email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
    gender: z.string().min(1, { message: "Vui lòng nhập giới tính!" }),
    phone_number: z.string().refine(data => data.length === 10, {
        message: 'Số điện thoại không hợp lệ!'
    }),
    role: z.string().min(1, {message: 'Vui lòng nhập role vào đây!'}),
    full_name: z.string().min(1, {message: 'Vui lòng nhập họ và tên vào đây!'}),
    address: z.string().optional(),
    date_of_birth: z.string().optional(),
    password: z.string().min(8, {message: 'Mật khẩu phải trên 8 kí tự'})
});

export default schema;
