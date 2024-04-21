import React from "react";
import { Link } from "react-router-dom";
const Error_page = () => {
  return (
    <div>
      <div className="p-8">
        <span className="font-beau text-red-500 text-3xl font-bold mr-[5px]">
          <span className="text-[#89A8A4] text-3xl font-aladin">AN</span>NHIÊN
        </span>
      </div>
      <h1 className="text-6xl font-bold text-center my-28">Page not found!</h1>
      <div className="mx-auto flex justify-center items-center text-2xl border border-solid border-2 border-gray-500 w-[400px] p-8 font-bold">
        <Link to="/">Return to homepage</Link>
      </div>
    </div>
  );
};

export default Error_page;
