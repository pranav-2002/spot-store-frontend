import React from "react";
import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="bg-white h-screen flex flex-row justify-center items-center">
      <Circles
        height="110"
        width="110"
        color="rgb(63 131 248)"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
