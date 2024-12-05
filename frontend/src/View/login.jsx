import '../css/login.css';
import { useState } from 'react';
import logo from '../source/logologin.png';
import logos from '../source/1.png'
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';
function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRoleNavigation = (role) => {
    switch (role) {
      case 'Antrian':
        navigate('/antrian');
        break;
      case 'Doctor':
        navigate('/Drdashboard');
        break;
      case 'Suster':
        navigate('/Susterdashboard');
        break;
      case 'Beta':
        navigate('/SuperAdmin');
        break;
      default:
        navigate('/');
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message
    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is not okay
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Check if data indicates unsuccessful login
      if (!data || data.success === false) {
        setErrorMessage(data.message || 'Login failed');
        return;
      }

      // Successful login, navigate based on role
      handleRoleNavigation(data.role);
      
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.message);
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
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={handleChange} id="email" aria-describedby="emailHelp" required/>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={handleChange} id="password" required/>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="form-check">
                          <input className="form-check-input primary" type="checkbox" value="" id="flexCheckChecked"/>
                          <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                            Ingat perangkat ini
                          </label>
                        </div>
                        <a className="text-primary fw-bold" href="/Drdashboard">Lupa Password?</a>
                      </div>
                      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                      <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Masuk</button>
                      <p className="text-center fs-4 fw-semi-bold">Atau menggunakan</p>
                      <div className="udin">
                        <span>
                          <a className="ti ti-face-id titi"></a>
                        </span>
                        <span>
                          <a className="ti ti-brand-facebook titi"></a>
                        </span>
                        <span>
                          <Signin/>
                          
                        </span>
                        <span>
                          <a className="ti ti-brand-mantine titi"></a>
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fs-4 mb-0 fw-bold">Belum memiliki akun?</p>
                        <a className="text-primary fw-bold ms-2" href="/register">Buat akun</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="../libs/jquery/dist/jquery.min.js"></script>
      <script src="../libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}

export default Login;
