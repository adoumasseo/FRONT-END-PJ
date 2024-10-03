import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const register = (data) => {
  return api.post('/register', data);
};

export const login = (data) => {
  return api.post('/login', data)
    .then(response => {
      console.log(response);
      
      localStorage.setItem('auth_token', response.data.token);
      // j'ai retirer le set du role 
      return response;
    });
};

export const logout = () => {
  return api.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  }).then(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
  });
};
