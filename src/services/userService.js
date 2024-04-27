import apiRequest from "../utils/apiRequest";

const userService = {
  getUser: async (token, email) => {
    return await apiRequest("GET", `/user/${email}`, token);
  },
  updateAvatar: async (token, id, data) => {
    return await apiRequest(
      "POST",
      `/user/avatar/${id}`,
      token,
      data,
      "multipart/form-data"
    );
  },
};

export default userService;
