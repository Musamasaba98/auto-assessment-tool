import axios from "axios";

const htmlFetchService = async (url) => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default htmlFetchService;
