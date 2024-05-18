import { z, ZodType } from 'zod';
interface InputBody{
    name: string;
    address: string;
    phoneNumber: string;
    note?: string;
}

const schema: ZodType<InputBody> = z.object({
    name: z.string().min(1, { message: 'Đây là trường thông tin là bắt buộc' }),
    address: z.string().min(1, {message: 'Đây là trường thông tin là bắt buộc'}),
    phoneNumber: z.string().min(9, { message: 'Số điện thoại không hợp lệ!' }).max(10, {message: 'Số điện thoại không hợp lệ!'}),
    note: z.string().optional(),
});

export default schema;