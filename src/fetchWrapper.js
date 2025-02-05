// utils/fetchWithAuth.js
import { useNavigate } from 'react-router-dom';

export const useFetchWithAuth = () => {
  const navigate = useNavigate();

  return async (url, options = {}) => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      navigate('/login');
      return Promise.reject('No token found, redirecting to login');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login', { replace: true });
        alert('Session expired. Please log in again.');
        return Promise.reject('Unauthorized access');
      }

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };
};
