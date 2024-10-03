import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Change this to match your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const updateProfile = (userId, data) => {
    return api.put(`/user/profile/${userId}`, data,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
    });
}