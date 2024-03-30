import {z, ZodType} from 'zod';
import { INewPassword } from '../interface/IUSerInfo';

const schema: ZodType<INewPassword> = z.object({
    account: z.string().min(1, { message: 'Tài khoản không được để trống' }),
    newPassword: z.string().min(8, { message: 'Mật khẩu phải trên 8 kí tự' }),
  }).refine((data) => data.account.includes('@gmail.com'), {
    message: "Vui lòng nhập địa chỉ email hợp lệ",
    path: ["account"]
  })

export default schema;