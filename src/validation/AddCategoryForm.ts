import { z } from 'zod';
import { ICategories } from '../interface/ICategory.tsx'

type OmitID = Omit<ICategories, 'id'>


const schema: z.ZodType<OmitID> = z.object({
    name: z.string().min(1, {message: 'Tên danh mục không được để trống!'}),
    description: z.string().min(1, {message: 'Mô tả không được để trống!'})
});

export default schema;