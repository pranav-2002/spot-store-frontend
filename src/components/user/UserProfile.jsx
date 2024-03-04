import React, { useEffect, useState } from "react";
import { editUserDetails, getUserDetails } from "../../api/requests/users/user";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../utils/Loader";
import { Button, Spinner } from "flowbite-react";

const UserProfile = () => {
  const token = Cookies.get("token");

  const [isLoading, setIsLoading] = useState(false);

  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    registrationNumber: "",
    phoneNumber: "",
  });

  const fetchUserDetails = async () => {
    try {
      const userData = await getUserDetails(token);
      setUserFormData(userData.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleEditUserDetails = async (e) => {
    e.preventDefault();

    if (userFormData.password !== userFormData.confirmPassword) {
      toast.error("passwords do not match!");
    } else {
      try {
        setIsLoading(true);
        const edit = await editUserDetails(userFormData, token);
        toast.success(edit.message);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <section className="bg-slate-50 dark:bg-gray-900">
      {userFormData.email.length > 0 ? (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-blue-600 dark:text-white">
            Update User Profile
          </h2>
          <form onSubmit={handleEditUserDetails}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  VIT Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                  placeholder="VIT Email Id"
                  required
                  value={userFormData.email}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  disabled
                  placeholder="registration number"
                  required
                  value={userFormData.registrationNumber}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="mobile number"
                  required
                  value={userFormData.phoneNumber}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="First Name"
                  required
                  value={userFormData.firstName}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Last Name"
                  required
                  value={userFormData.lastName}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password (current password / change password)
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="password"
                  required
                  value={userFormData.password || ""}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
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
                  placeholder="confirm password"
                  className={
                    userFormData.password === userFormData.confirmPassword
                      ? "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      : "focus:border-primary-600 block w-full p-2.5 bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                  }
                  required
                  value={userFormData.confirmPassword || ""}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                {userFormData.password !== userFormData.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Password and Confirm Password don't match
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
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
                <>Save Details</>
              )}
            </Button>
          </form>
        </div>
      ) : (
        <Loader />
      )}
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

export default UserProfile;
