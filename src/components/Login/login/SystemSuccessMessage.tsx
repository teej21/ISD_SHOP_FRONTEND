import React from "react";
import DoneIcon from '@mui/icons-material/Done';

interface MessageProps {
    message: string;
}
const SystemSuccessMessage = (props : MessageProps) => {
  return (
    <div>
      <div className="flex flex-row gap-[5px] mx-auto shadow-shadow_primary ">
        <DoneIcon className="text-green-500"></DoneIcon>
        <p className="text-green-500 font-bold text-xl pb-4">{props.message}</p>
      </div>
    </div>
  );
};

export default SystemSuccessMessage;