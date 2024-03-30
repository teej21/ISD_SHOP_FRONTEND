import { z, ZodType } from 'zod';
import { IUserInfo } from '../interface/IUSerInfo';

type OmitRoleId = Omit<IUserInfo, 'role'>;

const schema: ZodType<OmitRoleId> = z.object({
  username: z.string().min(1, {message: 'Xin vui lòng nhập tài khoản!'}),
  password: z.string().min(8, {message: 'Mật khẩu phải trên 8 kí tự'}),
})

export default schema;