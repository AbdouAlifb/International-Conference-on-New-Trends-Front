import React from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same directory

const AdminDashboard = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-3">
                {/* Dashboard content goes here */}
                <h1>Admin Dashboard</h1>
                {/* ... */}
            </div>
        </div>
    );
};

export default AdminDashboard;
