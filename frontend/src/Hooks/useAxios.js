import axios from 'axios'


export const useAxios = () => { 
  return axios.create({
    baseURL: "http://localhost:8000/api/management/"
  });
}