import React, { useState, useEffect } from "react";
import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSignUp } from "../../api/requests/auth/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    registrationNumber: "",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z]+\.[a-zA-Z]+\d{4}@vitstudent\.ac\.in$/;
    return regex.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("passwords do not match!");
    } else if (!validateEmail(signUpData.email)) {
      toast.error("Please enter your VIT email only");
    } else {
      try {
        setIsLoading(true);
        const newUser = await userSignUp(signUpData);
        toast.success(newUser.message);
        setIsLoading(false);
        setSignUpData({
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          registrationNumber: "",
          phoneNumber: "",
        });
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-8">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-max lg:py-0">
        <div className="flex items-center mb-5">
          <img
            className="w-40 mr-2"
            src="https://d33wubrfki0l68.cloudfront.net/b891ad524a09a29d768b6ffdbf5f52bb0c6da7e1/47f53/img/vitspot-logo.png"
            alt="VITSpot Logo"
          />
        </div>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-600 md:text-2xl dark:text-white">
              Register your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your VIT email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="VIT email"
                  required
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={signUpData.firstName}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={signUpData.lastName}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="registration number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={signUpData.registrationNumber}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      [e.target.name]: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="phone number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={signUpData.phoneNumber}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  className={
                    signUpData.password === signUpData.confirmPassword
                      ? "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      : "focus:border-primary-600 block w-full p-2.5 bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                  }
                  required
                  value={signUpData.confirmPassword}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                {signUpData.password !== signUpData.confirmPassword && (
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
                  <> Sign Up</>
                )}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
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

export default SignUp;
