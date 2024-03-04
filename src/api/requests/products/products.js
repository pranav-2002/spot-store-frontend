import axiosRequest from "../../AxiosConfig";

export const allProducts = async () => {
  const res = await axiosRequest("/products/all", "GET");
  return res;
};

export const getProductData = async (id) => {
  const res = await axiosRequest(`/products/${id}`, "GET");
  return res;
};

export const deleteAProduct = async (productId, token) => {
  const res = await axiosRequest(
    `products/delete/${productId}`,
    "DELETE",
    {},
    token
  );
  return res;
};

export const markProductAsSold = async (data, token) => {
  const res = await axiosRequest("products/sold", "PATCH", data, token);
  return res;
};

export const createNewProduct = async (data, token) => {
  const res = await axiosRequest("/products/create", "POST", data, token);
  return res;
};

export const editProductDetails = async (id, data, token) => {
  const res = await axiosRequest(
    `/products/update/${id}`,
    "PATCH",
    data,
    token
  );
  return res;
};

export const getProductsByCategory = async (categoryName) => {
  const res = await axiosRequest(`/products/category/${categoryName}`, "GET");
  return res;
};
