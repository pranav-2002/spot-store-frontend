import React from "react";
import PageNotFoundImage from "../../../assets/images/not-found.svg";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={PageNotFoundImage}
        alt="page not found"
        width={"500px"}
        className="mb-6"
      />
      <p className="font-bold text-blue-600 mb-6">
        Oops, Looks like you got lost !
      </p>
      <Button
        className="w-full lg:w-fit xl:w-fit mb-6"
        gradientDuoTone="purpleToBlue"
        as={Link}
        to={"/"}
      >
        Go back to home
      </Button>
    </div>
  );
};

export default PageNotFound;
