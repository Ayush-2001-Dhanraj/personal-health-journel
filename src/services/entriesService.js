import apiRequest from "../utils/apiRequest";

const entriesService = {
  getAllEntries: async (token) => {
    return await apiRequest("GET", "/entries", token);
  },
  createEntry: async (token, data) => {
    return await apiRequest("POST", "/entries", token, data);
  },
  getEntry: async (token, id) => {
    return await apiRequest("GET", `/entries/${id}`, token);
  },
  deleteEntry: async (token, id) => {
    return await apiRequest("DELETE", `/entries/${id}`, token);
  },
  updateEntry: async (token, id, data) => {
    return await apiRequest("PATCH", `/entries/${id}`, token, data);
  },
};

export default entriesService;
