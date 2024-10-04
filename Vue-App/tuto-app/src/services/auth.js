import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const register = (data) => {
  return api.post('/register', data)
    .then( response => {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('user_role', response.data.user.role)
      localStorage.setItem('auth_token', response.data.token);

    });
};

export const login = (data) => {
  return api.post('/login', data)
    .then(response => {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('user_role', response.data.user.role)
      localStorage.setItem('auth_token', response.data.token);
      return response;
    });
};

export const logout = () => {
  return api.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  }).then(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('auth_token');
  });
};
