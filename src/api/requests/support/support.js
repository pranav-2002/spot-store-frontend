import axiosRequest from "../../AxiosConfig";

export const contactSupport = async (data) => {
  const res = await axiosRequest("/support/contact", "POST", data);
  return res;
};
