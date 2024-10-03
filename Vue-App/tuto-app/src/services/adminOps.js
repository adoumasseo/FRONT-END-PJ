import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getUsers = () => {
    return api.get('/admin/dashboard');
};

export const deleteUser = (id) => {
    return api.delete(`/admin/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
    });
};
