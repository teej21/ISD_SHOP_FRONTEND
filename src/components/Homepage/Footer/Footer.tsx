import React from "react";
import TeamIcon from "../../../assets/team_icon.png";
import Badge from "../../../assets/icon_1.png";
import DMCA from "../../../assets/dmca-badge-w100-2x1-04 1.png";
import ConfirmDMCA from '../../../assets/dmca 1.png'
const Footer = () => {
  return (
    <div className="bg-[#ECD2B3] md:flex md:flex-row md:justify-between md:items-center md:gap-[20px] md:px-12 md:mt-12 md:py-4 grid grid-cols-gridFlexible2 p-8 gap-[20px] ">
      <div className="md:w-3/10 w-8/10 h-full flex flex-col gap-[10px]">
        <h1 className="font-bold ">A WEB MADE BY</h1>
        <div className="flex lg:flex-row flex-col lg:items-center gap-[10px]">
          <div>
          <span className="font-beau text-red-500 text-2xl font-bold mr-[5px]">
            <span className="text-[#89A8A4] text-2xl font-aladin">AN</span>NHIÊN
          </span>
          <span>X </span>
          </div>
          <div className="flex flex-row items-center gap-[5px]">
            <img src={TeamIcon} alt="team_icon"></img>
            <span className="font-bold text-[#595C59]">A+ TEAM</span>
          </div>
          </div>
          <div >
            <h1 className="text-[#595C59] text-xl font-bold">Công Ty An Nhiên</h1>
          </div>
        <div>
          <p className="lg:text-base text-xs text-justify">
            An Nhiên cung cấp những bức tranh sơn dầu và sơn mài đẹp từ hàng
            trăm họa sĩ tài năng trên toàn quốc. Chúng tôi cũng nhận vẽ theo yêu
            cầu và cung cấp các loại khung tranh đa dạng, chất lượng cao với giá
            tốt nhất.
          </p>
        </div>
        <div>
          <span className="font-bold text-[#595C59] mr-1 lg:text-base text-xs ">Địa chỉ:</span>
          <span className="text-[#595C59] lg:text-base text-xs">Hà Nội</span>
        </div>
        <div>
          <span className="font-bold text-[#595C59] mr-1 lg:text-base text-xs">Số điện thoại:</span>
          <span className="text-[#595C59] lg:text-base text-xs">0912345678</span>
        </div>
        <div>
          <span className="font-bold text-[#595C59] lg:text-base text-xs">Email:</span>
          <span className="text-[#595C59] lg:text-base text-xs"> AnNhienTranh@gmail.com</span>
        </div>
      </div>
      <div className="flex flex-col justify-evenly gap-[20px] ">
      <div>
          <h1 className="font-bold">Giới thiệu</h1>
        </div>
        <div>
          <span className="lg:text-base text-xs">Điều khoản dịch vụ</span>
        </div>
        <div>
          <span className="lg:text-base text-xs">Chính sách và Quy định chung</span>
        </div>
        <div>
          <span className="lg:text-base text-xs">Chính sách bảo mật</span>
        </div>
        <div>
          <span className="lg:text-base text-xs">Chính sách bảo hành</span>
        </div>
        <div>
          <span className="lg:text-base text-xs">Quy trình đặt hàng</span>
        </div>
        <div>
          <span className="lg:text-base text-xs">Tuyển dụng</span>
        </div>
      </div>
      <div className="flex flex-col justify-evenly gap-[20px]">
      <div>
          <h1 className="font-bold lg:text-base text-sm ">Có thể bạn muốn</h1>
        </div>
        <div>
          <span className="lg:text-base text-xs ">Tranh sơn dầu</span>
        </div>
        <div>
          <span className="lg:text-base text-xs ">Tranh phong cảnh</span>
        </div>
        <div>
          <span className="lg:text-base text-xs ">Tranh nghệ thuật</span>
        </div>
        <div>
          <span className="lg:text-base text-xs ">Tranh trừu tượng</span>
        </div>
        <div>
          <span className="lg:text-base text-xs ">Tranh sơn mài</span>
        </div>
        <div>
          <span className="lg:text-base text-xs ">Khung tranh</span>
        </div>
      </div>
      <div className="flex flex-col justify-evenly gap-[30px]">
        <div>
          <h1 className="font-bold">Chứng nhận</h1>
        </div>
        <div>
          <img src={ConfirmDMCA} alt="dmca-cf"></img>
        </div>
        <div>
          <img src={Badge} alt="confirm"></img>
        </div>
        <div>
          <img src={DMCA} alt="dmca"></img>
        </div>
      </div>
    </div>
  );
};

export default Footer;
