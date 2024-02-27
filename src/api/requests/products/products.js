import axiosRequest from "../../AxiosConfig";

export const allProducts = async () => {
  const res = await axiosRequest("/products/all", "GET");
  return res;
};
