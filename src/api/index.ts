import axios from "axios";

const connection = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default connection;