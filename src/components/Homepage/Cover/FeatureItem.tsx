import React from "react";

const FeatureItem = ({ title, description, imageUrl }) => {
  return (
    <div className="flex flex-row items-center gap-[20px] rounded-[10px] border-2 border-solid border-gray-300 p-4 w-full">
      <div className="border-red-500 border-solid border-2 rounded-full">
        <img src={imageUrl} className="w-[40px] h-[40px] p-1" alt="feature" />
      </div>
      <div>
        <h2 className="text-[#555868] text-3xl font-bold mb-2">{title}</h2>
        <span className="text-[#555868] italic">{description}</span>
      </div>
    </div>
  );
};

export default FeatureItem;
