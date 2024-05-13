import { z, ZodType } from 'zod';
import { IUserInfo } from '../interface/IUSerInfo';

type OmitRoleId = Omit<IUserInfo, 'role'>;

const schema: ZodType<OmitRoleId> = z.object({
  username: z.string().min(1, {message: 'Trường thông tin này là bắt buộc'}),
  password: z.string().min(2, {message: 'Mật khẩu phải trên 8 kí tự'}),
})

export default schema;