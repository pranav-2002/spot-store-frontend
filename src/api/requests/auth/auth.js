import axiosRequest from "../../AxiosConfig";

export const userLogin = async (body) => {
  const res = await axiosRequest("/user/auth/sign-in", "POST", body);
  return res;
};

export const userSignUp = async (body) => {
  const res = await axiosRequest("/user/auth/sign-up", "POST", body);
  return res;
};

export const forgotPasswordRequest = async (body) => {
  const res = await axiosRequest(
    "/user/auth/forgot-password-request",
    "POST",
    body
  );
  return res;
};

export const forgotPasswordVerification = async (body) => {
  const res = await axiosRequest(
    "/user/auth/forgot-password-verification",
    "POST",
    body
  );
  return res;
};

export const changeUserPassword = async (body) => {
  const res = await axiosRequest("/user/auth/change-password", "POST", body);
  return res;
};
