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
