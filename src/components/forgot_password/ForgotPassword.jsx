import React, { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailSentModal from "../utils/EmailSentModal";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 pb-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6">
          <img
            className="w-40 mr-2"
            src="https://d33wubrfki0l68.cloudfront.net/b891ad524a09a29d768b6ffdbf5f52bb0c6da7e1/47f53/img/vitspot-logo.png"
            alt="VITSpot Logo"
          />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-600 md:text-2xl dark:text-white">
              Forgot Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="VIT email"
                  required
                  value={forgotPasswordData.email}
                  onChange={(e) =>
                    setForgotPasswordData({
                      ...forgotPasswordData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <Button
                className="w-full"
                gradientDuoTone="purpleToBlue"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Spinner
                      aria-label="Alternate spinner button example"
                      size="sm"
                    />
                    <span className="pl-3">Please wait...</span>
                  </>
                ) : (
                  <> Reset Password</>
                )}
              </Button>
            </form>
          </div>
        </div>
        <EmailSentModal openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </section>
  );
};

export default ForgotPassword;
