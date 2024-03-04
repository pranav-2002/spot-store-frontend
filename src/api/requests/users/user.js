import axiosRequest from "../../AxiosConfig";

export const getUserById = async (id) => {
  const res = await axiosRequest(`/user/details/${id}`, "GET");
  return res;
};

export const getUserDetails = async (token) => {
  const res = await axiosRequest("/user/details", "GET", "", token);
  return res;
};

export const editUserDetails = async (body, token) => {
  const res = await axiosRequest("/user/details/edit", "PATCH", body, token);
  return res;
};

export const getUserProducts = async (token) => {
  const res = await axiosRequest("/user/products", "GET", "", token);
  return res;
};
