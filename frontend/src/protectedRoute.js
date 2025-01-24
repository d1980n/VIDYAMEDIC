import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userData = JSON.parse(sessionStorage.getItem('user')); // Ambil data user dari sessionStorage

    console.log("User Data:", userData); // Debug log
    console.log("Allowed Roles:", allowedRoles);

    if (!userData) {
        // Jika belum login, arahkan ke halaman login
        window.location.href = `http://localhost:3002/`; // Navigasi ke URL target
        return null;
    }

    const userRole = userData.role;
    console.log("User Role:", userRole);
    
    if (!allowedRoles.includes(userRole)) {
        // Jika role pengguna tidak diizinkan, arahkan ke halaman 403
        window.location.href = `http://localhost:3001/403`; // Navigasi ke URL target
    }

    // Jika sudah login, render komponen yang diminta
    return children;
};

export default ProtectedRoute;
