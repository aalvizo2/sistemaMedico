import axios from 'axios';


// const createHttpClient = (API_BASE_URL: any) => {
//     const httpClient= axios.create({
//         baseURL: API_BASE_URL,
//         headers: {
//             "Content-Type" : "application/json",
//             //"Content-Type": "multipart/form-data" 
            
//         }
//     });

//     return httpClient;
// };


// export default createHttpClient;

const createHttpClient = (API_BASE_URL: string) => {
  const httpClient = axios.create({
    baseURL: API_BASE_URL,
  });

  httpClient.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      // Si estás subiendo archivos
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      // Si estás enviando JSON
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });

  return httpClient;
};


export default createHttpClient;