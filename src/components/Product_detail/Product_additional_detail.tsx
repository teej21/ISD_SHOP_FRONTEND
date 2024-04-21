import React from "react";

const Product_additional_detail = () => {
  return (
    <div>
      <hr className="mb-[20px]"></hr>
      <div className="flex flex-col gap-[30px] my-[40px]">
        <h1 className="text-2xl font-bold my-8">THÔNG TIN KĨ THUẬT</h1>
        <div className="flex flex-row items-center text-xl text-[#858888]">
          <span className="mr-[200px]">CHẤT LIỆU</span>
          <span>Acrylic</span>
        </div>
      <hr></hr>
      <div className="flex flex-row items-center text-xl text-[#858888]">
          <span className="mr-[180px]">KÍCH THƯỚC</span>
          <span>80x100</span>
        </div>
      <hr></hr>
      <div className="flex flex-row items-center  text-xl text-[#858888]">
          <span className="mr-[160px]">TRANH HỌA SĨ</span>
          <span>Tranh sáng tác, độc bản và có giấy tác quyền của họa sĩ</span>
        </div>
      </div>
      <hr className="mt-36"></hr>
    </div>
  );
};

export default Product_additional_detail;
