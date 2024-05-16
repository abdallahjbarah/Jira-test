import api from "@configs/api";

// const createPost = async (postData) => {
//   // Perform the actual API call to create a new post
//   const response = await api.post("/posts", postData);
//   return response?.data;
// };



export async function postContactUsMutateFn(data) {
    return await api.post(`/users/contact-form`, data);
  }