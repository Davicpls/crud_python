import axios from "axios";
import { useContext } from "react";
import AppContext from "./AppContext";

export const useAxios = () => {
  const { userToken, setUserToken } = useContext(AppContext);


  return axios.create({
    baseURL: "http://localhost:8000/api/management/",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
