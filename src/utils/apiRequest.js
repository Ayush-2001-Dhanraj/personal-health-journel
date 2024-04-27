import axios from "axios";
import { BASE_URL } from "./constants";

const apiRequest = async (
  method,
  url,
  token,
  data = {},
  contentType = "application/json"
) => {
  try {
    const config = {
      method: method,
      url: `${BASE_URL}${url}`,
      headers: {
        "Content-type": contentType,
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default apiRequest;
