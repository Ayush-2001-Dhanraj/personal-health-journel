import apiRequest from "../utils/apiRequest";

const userService = {
  getUser: async (token, email) => {
    return await apiRequest("GET", `/user/${email}`, token);
  },
};

export default userService;
