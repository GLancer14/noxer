import axios from "axios";

const connection = axios.create({
  baseURL: "https://noxer-test.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default connection;