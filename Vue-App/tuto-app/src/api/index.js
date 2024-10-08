import axios from 'axios'

export const login = (credentials) => axios.post('/login', credentials)
export const register = (userData) => axios.post('/register', userData)
export const logout = () => axios.post('/logout')
export const updateProfile = (userId, data) => axios.put(`/user/profile/${userId}`, data)
export const getBoards = () => axios.get('/user/boards')
export const createBoard = (boardData) => axios.post('/user/boards', boardData)
export const updateBoard = (boardId, boardData) => axios.put(`/user/boards/${boardId}`, boardData)
export const deleteBoard = (boardId) => axios.delete(`/user/boards/${boardId}`)
export const getBoardsTasks = (boardId) => axios.get(`/user/boards/${boardId}/tasks`)
export const createTask = (boardId, taskData) => axios.post(`/user/tasks/${boardId}`, taskData)
export const updateTask = (taskId, taskData) => axios.put(`/user/tasks/${taskId}`, taskData)
export const deleteTask = (taskId) => axios.delete(`/user/tasks/${taskId}`)
export const getUsers = () => axios.get('/admin/dashboard')
export const updateUser = (userId, userData) => axios.put(`/admin/users/${userId}`, userData)
export const deleteUser = (userId) => axios.delete(`/admin/users/${userId}`)