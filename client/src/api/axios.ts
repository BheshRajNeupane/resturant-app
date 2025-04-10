
import axios from 'axios';



const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 200000,
});

AxiosInstance.interceptors.request.use(
  function (config) {
    // const token = getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // please not that if the error message is changed in backend it should be changed in front end
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message ===
        'Your token has expired. Please login again.'
    ) {
      // handleTokenExpiry(); // Call the custom function when token expires
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
