import '../css/login.css';
import Login from './login.jsx'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../source/logologin.png';
import logos from '../source/1.png'

function Register() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(formData));
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(formData);
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='loginss'>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <div className="card mb-0">
                  <div className="card-body">
                    <a href="/index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                      <img src={logo} width="220" alt=""/>
                    </a>
                    <p className="text-center">Sistem Informasi Manajemen Klinik</p>
                    <p className="text-center mb-0 fw-bold black">Klinik Medipal</p>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={handleChange} id="nama" aria-describedby="textHelp"/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="nik" className="form-label">Nik</label>
                        <input type="text" className="form-control" onChange={handleChange} id="nik" aria-describedby="textHelp"/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="no_hp" className="form-label">Nomor Telefon</label>
                        <input type="text" className="form-control" onChange={handleChange} id="no_hp" aria-describedby="textHelp"/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <input type="text" className="form-control" onChange={handleChange} id="role" aria-describedby="textHelp"/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" onChange={handleChange} id="email" aria-describedby="emailHelp"/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="alamat" className="form-label">Alamat</label>
                        <input type="alamat" className="form-control" onChange={handleChange} id="alamat" aria-describedby="emailHelp"/>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={handleChange} id="password"/>
                      </div>
                      <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Buat Akun</button>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fs-4 mb-0 fw-bold">Sudah punya akun?</p>
                        <a className="text-primary fw-bold ms-2" href="/login">Masuk</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="../assets/libs/jquery/dist/jquery.min.js"></script>
      <script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}

export default Register;
