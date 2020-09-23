import axios from "axios";

const Api = () => {
  return axios.create({
    baseURL: "https://use-tech.herokuapp.com/api",
  });
};

export default Api;
