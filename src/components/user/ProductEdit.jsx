import React, { useEffect, useRef, useState } from "react";
import storage from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, FileInput, Progress, Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import {
  editProductDetails,
  getProductData,
} from "../../api/requests/products/products";
import Loader from "../utils/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProductEdit = () => {
  const token = Cookies.get("token");
  const decoded = jwtDecode(token);

  const params = useParams();

  // Refs
  const primaryImageRef = useRef();
  const imagesRef = useRef();
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  // Edit Form State
  const [editProductData, setEditProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "electronics",
    primaryImage: {
      imgUrl: "",
    },
    images: [],
  });

  // progress & loading
  const [percent, setPercent] = useState(0);
  const [percent2, setPercent2] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProductData = async () => {
    try {
      const results = await getProductData(params.productId);
      setEditProductData(results.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleDeletePrimaryImage = (e) => {
    e.preventDefault();
    setEditProductData({ ...editProductData, primaryImage: { imgUrl: "" } });
    primaryImageRef.current.remove();
  };

  const handleDeleteImages = (e) => {
    e.preventDefault();
    setEditProductData({ ...editProductData, images: [] });
    imagesRef.current.remove();
  };

  // For Primary Image Uploading
  const handleFileUpload = (e) => {
    if (editProductData.primaryImage.imgUrl.length > 0) {
      toast.error(
        "You have already uploaded 1 image. Please delete the existing one to re-upload"
      );
      return;
    }
    if (!e.target.files[0]) {
      toast.error("Please upload atleast 1 image");
      setPercent(0);
      setEditProductData({
        ...editProductData,
        primaryImage: {
          imgUrl: "",
        },
      });
    } else {
      const primaryImage = e.target.files[0];
      const storageRef = ref(
        storage,
        `/user_${decoded.userId}/primary_image/product_primary_image_${e.target.files[0].name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, primaryImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (error) => {
          console.error(error);
          toast.error("Image Not Uploaded");
        },
        async () => {
          // Upload completed successfully, get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setEditProductData({
            ...editProductData,
            primaryImage: {
              imgUrl: downloadURL,
            },
          });
          toast.success("Image Uploaded Successfully");
        }
      );
    }
  };

  // For Product Images Uploading
  const handleImageUpload = (e) => {
    if (editProductData.images.length > 0) {
      toast.error(
        "You have already uploaded some images. Please delete the existing one(s) to re-upload"
      );
      return;
    }
    const files = e.target.files;
    if (files.length > 4) {
      toast.error("You can upload a maximum of 4 images");
      return;
    }

    if (files.length === 0) {
      toast.error("Please upload atleast 1 image");
      setPercent2(0);
      setEditProductData({ ...editProductData, images: [] });
      return;
    }

    const uploadPromises = [];
    const updatedImages = [...editProductData.images]; // Copy the existing images array
    let count = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(
        storage,
        `/user_${decoded.userId}/images/product_image_${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadPromises.push(
        new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              if (percent === 100) {
                count++;
              }
              setPercent2((count / files.length) * 100);
            },
            reject,
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              updatedImages.push({ imgUrl: downloadURL }); // Add the uploaded file URL to the images array
              resolve();
            }
          );
        })
      );
    }
    Promise.all(uploadPromises)
      .then(() => {
        // All uploads completed successfully
        toast.success("Images Uploaded Successfully");
        // Update state or perform any other action with the uploaded file URLs
        setEditProductData({
          ...editProductData,
          images: updatedImages,
        });
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
        toast.error("Error uploading images");
      });
  };

  // API CALL
  const handleEditProductData = async (e) => {
    e.preventDefault();
    if (
      editProductData.images.length === 0 ||
      editProductData.primaryImage.imgUrl.length === 0
    ) {
      toast.error("Something went wrong");
      return;
    }
    try {
      setLoading(true);
      const result = await editProductDetails(
        params.productId,
        editProductData,
        token
      );
      toast.success(result.message);
      setLoading(false);
      setPercent(0);
      setPercent2(0);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="bg-slate-50 dark:bg-gray-900">
      {editProductData.title.length > 0 ? (
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-blue-600 dark:text-white">
            Edit Product Details
          </h2>
          <form onSubmit={handleEditProductData}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Product Name
                </label>
                <input
                  type="text"
                  name="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="product name"
                  required
                  value={editProductData.title}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </label>
                <select
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  value={editProductData.category}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value={"electronics"} defaultValue>
                    Electronics
                  </option>
                  <option value={"bicycles"}>Bicycles</option>
                  <option value={"mattresses"}>Mattresses</option>
                  <option value={"fashion"}>Fashion</option>
                  <option value={"books"}>Books and Notes</option>
                  <option value={"fitness"}>Gym and Fitness</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="₹299"
                  required
                  value={editProductData.price}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      [e.target.name]: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload Primary Image (This will be the thumbnail of your
                  product)
                </label>
                <FileInput
                  color={"gray"}
                  helperText="SVG, PNG or JPG  (MAX. 800x400px)."
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                />
                <Progress progress={percent} color="green" className="mt-3" />
                <div ref={primaryImageRef} className="mt-4">
                  <img
                    src={editProductData.primaryImage.imgUrl}
                    alt="product primary image"
                    width={"100px"}
                    className="mb-3"
                  />
                  <Button
                    size={"xs"}
                    color="failure"
                    onClick={handleDeletePrimaryImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete Image
                  </Button>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload Product Images (maximum 4 images)
                </label>
                <FileInput
                  color={"gray"}
                  helperText="SVG, PNG or JPG  (MAX. 800x400px)."
                  multiple
                  onChange={handleImageUpload}
                  ref={fileInputRef2}
                />
                <Progress progress={percent2} color="green" className="mt-3" />
                <div ref={imagesRef}>
                  <div className="flex flex-row flex-wrap mt-4">
                    {editProductData.images.map((image, i) => (
                      <img
                        src={image.imgUrl}
                        alt="product image"
                        width={"100px"}
                        className="mr-3 mb-3"
                        key={i}
                      />
                    ))}
                  </div>
                  <Button
                    size={"xs"}
                    color="failure"
                    onClick={handleDeleteImages}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete Images
                  </Button>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write a product description here..."
                  required
                  value={editProductData.description}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button color="blue" type="submit">
                {loading ? (
                  <>
                    <Spinner
                      aria-label="Alternate spinner button example"
                      size="sm"
                    />
                    <span className="pl-3">Please wait...</span>
                  </>
                ) : (
                  <> Update product</>
                )}
              </Button>
            </div>
          </form>
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
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default ProductEdit;
