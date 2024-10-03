import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getUsers = () => {
    return api.get('/admin/dashboard', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
    });
};

export const updateUser = (id, data) => {
    return api.put(`/admin/users/${id}`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
    })
}

export const deleteUser = (id) => {
    return api.delete(`/admin/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
    });
};


