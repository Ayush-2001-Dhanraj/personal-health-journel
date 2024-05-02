import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const starterService = {
  startBackend: async () => await axios.get(SERVER_URL),
};

export default starterService;
