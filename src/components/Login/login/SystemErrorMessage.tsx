import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface MessageProps {
    message: string;
}
const SystemErrorMessage = (props : MessageProps) => {
  return (
    <div>
      <div className="flex flex-row gap-[5px] mx-auto shadow-shadow_primary border border-2 border-solid border-red-400 ">
        <CloseIcon className="text-red-500"></CloseIcon>
        <p className="text-red-500 font-bold text-xl pb-4">{props.message}</p>
      </div>
    </div>
  );
};

export default SystemErrorMessage;
