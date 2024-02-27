import axiosRequest from "../../AxiosConfig";

export const userLogin = async (body) => {
  const res = await axiosRequest("/user/auth/sign-in", "POST", body);
  return res;
};

export const userSignUp = async (body) => {
  const res = await axiosRequest("/user/auth/sign-up", "POST", body);
  return res;
};
