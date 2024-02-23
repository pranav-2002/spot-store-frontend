import axios from "axios";

const axiosRequest = async (endpoint, method, data, token) => {
  let baseUrl = "https://spot-store-backend.onrender.com";
  const url = baseUrl + endpoint;
  const headers = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: token,
  };
  try {
    const result = await axios({
      method,
      url,
      data,
      headers,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export default axiosRequest;
