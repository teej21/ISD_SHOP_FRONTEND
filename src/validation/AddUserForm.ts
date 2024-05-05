import { z } from 'zod';
import { AddUser } from '../interface/IUSerInfo';

type OmitID = Omit<AddUser, 'id'>
type OmitPassword = Omit<OmitID, 'password'>
type OmitDoB = Omit<OmitPassword, 'date_of_birth'>
const schema: z.ZodType<OmitDoB> = z.object({
    email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
    gender: z.string().min(1, { message: "Vui lòng nhập giới tính!" }),
    phone_number: z.string().refine(data => data.length === 10, {
        message: 'Số điện thoại không hợp lệ!'
    }),
    role: z.string().min(1, {message: 'Vui lòng nhập role vào đây!'}),
    full_name: z.string().min(1, {message: 'Vui lòng nhập họ và tên vào đây!'}),
    address: z.string(),
});

export default schema;
