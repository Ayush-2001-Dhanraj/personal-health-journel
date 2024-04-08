import axios from "axios";
import { BASE_URL } from "../utils/constants";

const userService = {
  getUser: async (token, email) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${email}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userService;
