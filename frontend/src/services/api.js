const API_BASE_URL = 'http://localhost:8000/api/v1/admin';

export const fetchDashboardStats = async () => {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
};

export const fetchUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
};

export const fetchUserDetails = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user details');
    return response.json();
};

export const fetchHeatmapData = async () => {
    const response = await fetch(`${API_BASE_URL}/heatmap`);
    if (!response.ok) throw new Error('Failed to fetch heatmap data');
    return response.json();
};
