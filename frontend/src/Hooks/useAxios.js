import axios from "axios";
import { useContext } from "react";
import AppContext from "./AppContext";

export const useAxios = () => {
  const token = sessionStorage.getItem("myToken")


  return axios.create({
    baseURL: "http://localhost:8000/api/management/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
