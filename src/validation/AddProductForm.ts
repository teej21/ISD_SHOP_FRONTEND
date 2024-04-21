import { z } from "zod";
import { Product } from "../interface/IProduct.tsx";

type OmitID = Omit<Product, "categoryId">;
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema: z.ZodType<OmitID> = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập địa chỉ tên sản phẩm hợp lệ" }),
  description: z.string().min(1, { message: "Vui lòng nhập miêu tả" }),
  price: z.string().min(1, { message: "Vui lòng nhập giá!" }),
  material: z.string().min(1, { message: "Vui lòng nhập chất liệu!" }),
  width: z.string().min(1, { message: "Vui lòng nhập chiều rộng!" }),
  height: z.string().min(1, { message: "Vui lòng nhập chiều dài!" }),
  publishYear: z.string().min(1, { message: "Vui lòng nhập năm sáng tác!" }),
  thumbnailImage: z.instanceof(FileList, { message: 'Vui lòng gửi file vào đây!.'}),
  status: z.string(),
});

export default schema;
