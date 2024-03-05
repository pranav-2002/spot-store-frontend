import React, { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contactSupport } from "../../api/requests/support/support";

const ContactSupport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [contactSupportData, setContactSupportData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const ticket = await contactSupport(contactSupportData);
      setIsLoading(false);
      setContactSupportData({
        email: "",
        subject: "",
        message: "",
      });
      toast.success(ticket.message);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <section className="bg-slate-100 dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-blue-600 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-medium text-center text-blue-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback? Found a bug? Let us
          know.
        </p>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your email
            </label>
            <input
              type="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@gmail.com"
              required
              value={contactSupportData.email}
              onChange={(e) =>
                setContactSupportData({
                  ...contactSupportData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
              value={contactSupportData.subject}
              onChange={(e) =>
                setContactSupportData({
                  ...contactSupportData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Your message
            </label>
            <textarea
              name="message"
              rows="6"
              required
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
              value={contactSupportData.message}
              onChange={(e) =>
                setContactSupportData({
                  ...contactSupportData,
                  [e.target.name]: e.target.value,
                })
              }
            ></textarea>
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
              <>Send Message</>
            )}
          </Button>
        </form>
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

export default ContactSupport;
