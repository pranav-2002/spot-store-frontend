import axiosRequest from "../../AxiosConfig";

export const userLogin = async (body) => {
  try {
    const res = await axiosRequest("/user/login", "POST", body);
    return res;
  } catch (error) {
    console.log(error);
  }
};
