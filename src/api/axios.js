import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.themoviedb.org/3",
  params: {
    api_key: "f1477775796e5ecc5655fee6fa41f86f",
    language: "ko-KR",
  },
});

export default instance;
