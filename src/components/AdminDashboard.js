import React from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same directory

const AdminDashboard = () => {
    const backgroundStyle = {
        backgroundImage: `url(ia.jpg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    return (
        <div className="d-flex" style={backgroundStyle}>
            <Sidebar />
            <div className="flex-grow-1 p-3">
                <div className="text-white">
                    <h1>Admin Dashboard</h1>
                    <p>Conffirence de  l'intelligence artificielle</p>
                    {/* Ajoutez d'autres éléments ou composants liés à l'IA */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
