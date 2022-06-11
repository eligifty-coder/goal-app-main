import axios from 'axios';

const API_URL = 'https://goal-app-api.herokuapp.com/api/v1/users';
// register user
export const registerUser = async (userData) => {
   const response = await axios.post(API_URL, userData);
   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
   }
   return response.data
}

export const logoutUser = async () => {
   localStorage.removeItem('user')
}
export const loginUser = async (userData) => {
   const response = await axios.post(`${API_URL}/login`, userData);
   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
   }
   return response.data
}