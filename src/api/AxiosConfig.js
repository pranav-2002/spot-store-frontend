import axios from "axios";

const axiosRequest = async (endpoint, method, data, token) => {
  let baseUrl = "https://spot-store-backend.onrender.com/api/v1/";
  const url = baseUrl + endpoint;
  const headers = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: token,
  };
  const result = await axios({
    method,
    url,
    data,
    headers,
  });
  return result.data;
};

export default axiosRequest;
