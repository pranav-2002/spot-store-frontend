import React, { useRef, useState } from "react";
import { Button, FileInput, Progress, Spinner } from "flowbite-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase/firebaseConfig";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createNewProduct } from "../../api/requests/products/products";

const CreateProduct = () => {
  const token = Cookies.get("token");
  const decoded = jwtDecode(token);

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  // Form State
  const [createProductData, setCreateProductData] = useState({
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

  // For Primary Image Uploading
  const handleFileUpload = (e) => {
    if (!e.target.files[0]) {
      toast.error("Please upload atleast 1 image");
      setPercent(0);
      setCreateProductData({
        ...createProductData,
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
          setCreateProductData({
            ...createProductData,
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
    const files = e.target.files;
    if (files.length > 4) {
      toast.error("You can upload a maximum of 4 images");
      return;
    }

    if (files.length === 0) {
      toast.error("Please upload atleast 1 image");
      setPercent2(0);
      setCreateProductData({ ...createProductData, images: [] });
      return;
    }

    const uploadPromises = [];
    const updatedImages = [...createProductData.images]; // Copy the existing images array
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
        setCreateProductData({
          ...createProductData,
          images: updatedImages,
        });
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
        toast.error("Error uploading images");
      });
  };

  // API CALL
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (
      createProductData.primaryImage.imgUrl.length === 0 ||
      createProductData.images.length === 0
    ) {
      toast.error("Something went wrong");
      return;
    }
    try {
      setLoading(true);
      const newProduct = await createNewProduct(createProductData, token);
      toast.success(newProduct.message);
      setLoading(false);
      setCreateProductData({
        title: "",
        description: "",
        price: "",
        category: "electronics",
        primaryImage: {
          imgUrl: "",
        },
        images: [],
      });
      fileInputRef.current.value = "";
      fileInputRef2.current.value = "";
      setPercent(0);
      setPercent2(0);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="bg-slate-50 dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-blue-600 dark:text-white">
          Create a New Product
        </h2>
        <form onSubmit={handleCreateProduct}>
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
                value={createProductData.title}
                onChange={(e) =>
                  setCreateProductData({
                    ...createProductData,
                    [e.target.name]: e.target.value,
                  })
                }
                required
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
                value={createProductData.category}
                onChange={(e) =>
                  setCreateProductData({
                    ...createProductData,
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
                placeholder="₹"
                value={createProductData.price}
                onChange={(e) =>
                  setCreateProductData({
                    ...createProductData,
                    [e.target.name]: Number(e.target.value),
                  })
                }
                required
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
                accept="image/*"
                onChange={handleFileUpload}
                required
                ref={fileInputRef}
              />
              <Progress progress={percent} color="green" className="mt-3" />
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
                required
                ref={fileInputRef2}
              />
              <Progress progress={percent2} color="green" className="mt-3" />
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
                value={createProductData.description}
                onChange={(e) =>
                  setCreateProductData({
                    ...createProductData,
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
                <> Create Product </>
              )}
            </Button>
          </div>
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

export default CreateProduct;
