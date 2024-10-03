import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Change this to match your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all tasks for a specific board
export const getTasks = (boardId) => {
  return api.get(`user/boards/${boardId}/tasks`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });
};

// Fetch a single task by its ID
export const getTaskById = (boardId, taskId) => {
  return api.get(`user/boards/${boardId}/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });
};

// Create a new task for a specific board
export const createTask = (boardId, data) => {
  return api.post(`user/boards/${boardId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });
};

// Update an existing task
export const updateTask = (taskId, data) => {
  return api.put(`/user/tasks/${taskId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });
};

// Delete a task by its ID
export const deleteTask = (boardId, taskId) => {
  return api.delete(`/user/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });
};
