import apiRequest from "../utils/apiRequest";

const entriesService = {
  getAllEntries: async (token, id) => {
    return await apiRequest("GET", `/entries/${id}`, token);
  },
  createEntry: async (token, id, data) => {
    return await apiRequest(
      "POST",
      `/entries/${id}`,
      token,
      data,
      "multipart/form-data"
    );
  },
  getEntry: async (token, id) => {
    return await apiRequest("GET", `/entries/entry/${id}`, token);
  },
  deleteEntry: async (token, id) => {
    return await apiRequest("DELETE", `/entries/entry/${id}`, token);
  },
  updateEntry: async (token, id, data) => {
    return await apiRequest("PATCH", `/entries/entry/${id}`, token, data);
  },
};

export default entriesService;
