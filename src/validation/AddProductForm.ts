import { z } from "zod";
import { Product } from "../interface/IProduct.tsx";


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema: z.ZodType<Product> = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập địa chỉ tên sản phẩm hợp lệ" }),
  description: z.string().min(1, { message: "Vui lòng nhập miêu tả" }),
  price: z.coerce.number().gte(1, { message: "Vui lòng nhập giá!" }),
  material: z.string().min(1, { message: "Vui lòng nhập chất liệu!" }),
  width: z.coerce.number().gte(1, { message: "Vui lòng nhập chiều rộng!" }),
  height: z.coerce.number().gte(1, { message: "Vui lòng nhập chiều dài!" }),
  publishYear: z.coerce.number().gte(1, { message: "Vui lòng nhập năm sáng tác!" }), 
});

export default schema;
