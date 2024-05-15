import React from "react";
import Loading from "../../assets/loading.gif";
const LoadingState = () => {
  return (
    <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2">
      <img src={Loading} alt="loading"></img>
    </div>
  );
};

export default LoadingState;
