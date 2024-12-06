import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = sessionStorage.getItem('user'); // Periksa sessionStorage

    if (!isLoggedIn) {
        // Jika belum login, arahkan ke halaman login
        window.location.href = `http://localhost:3002/`; // Navigasi ke URL target
    }

    // Jika sudah login, render komponen yang diminta
    return children;
};

export default ProtectedRoute;
