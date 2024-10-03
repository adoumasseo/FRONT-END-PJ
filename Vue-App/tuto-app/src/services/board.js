import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Change this to match your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all boards for the authenticated user
export const getBoards = () => {
  return api.get('user/boards', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });
};

// Fetch a single board by its ID
export const getBoardById = (id) => {
  return api.get(`user/boards/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });
};

// Create a new board
export const createBoard = (data) => {
  return api.post('user/boards', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });
};

// Update an existing board
export const updateBoard = (id, data) => {
  return api.put(`user/boards/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });
};

// Delete a board by its ID
export const deleteBoard = (id) => {
  return api.delete(`user/boards/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });
};
