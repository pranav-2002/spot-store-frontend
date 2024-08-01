import React, { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  changeUserPassword,
  forgotPasswordVerification,
} from "../../api/requests/auth/auth";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [forgotPasswordData, setForgotPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (forgotPasswordData.password !== forgotPasswordData.confirmPassword) {
      toast.error("passwords do not match!");
    } else {
      setIsLoading(true);
      try {
        const changePassword = await changeUserPassword({
          password: forgotPasswordData.password,
          verificationToken: params.verificationToken,
        });
        toast.success("Password Changed Successfully");
        setIsLoading(false);
        navigate("/login");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };

  const verifyPasswordResetLink = async () => {
    try {
      const verify = await forgotPasswordVerification({
        verificationToken: params.verificationToken,
      });
      navigate(`/reset-password/${params.verificationToken}`);
    } catch (error) {
      console.log(error);
      toast.error("Invalid Token");
      navigate("/forgot-password");
    }
  };

  useEffect(() => {
    verifyPasswordResetLink();
  }, []);

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
              Reset Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="password"
                  required
                  value={forgotPasswordData.password}
                  onChange={(e) =>
                    setForgotPasswordData({
                      ...forgotPasswordData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={
                    forgotPasswordData.password ===
                    forgotPasswordData.confirmPassword
                      ? "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      : "focus:border-primary-600 block w-full p-2.5 bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                  }
                  placeholder="confirm password"
                  required
                  value={forgotPasswordData.confirmPassword}
                  onChange={(e) =>
                    setForgotPasswordData({
                      ...forgotPasswordData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                {forgotPasswordData.password !==
                  forgotPasswordData.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, snapp!</span> Password and
                    Confirm Password don't match
                  </p>
                )}
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

export default ResetPassword;
