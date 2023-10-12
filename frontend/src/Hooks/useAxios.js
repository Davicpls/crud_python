import axios from "axios";

let envUrl = ""
if (process.env.REACT_APP_ENV === 'dev'){
  envUrl = "http://localhost:8000"
}
else if (process.env.REACT_APP_ENV === 'prod'){
  envUrl = "https://crud-python-backend.onrender.com"
}

export const useAxios = () => {
  const token = sessionStorage.getItem("myToken")


  return axios.create({
    baseURL: `${envUrl}/api/management/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
