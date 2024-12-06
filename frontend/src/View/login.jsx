import '../css/login.css';
import { useState, useEffect  } from 'react';
import logo from '../source/logologin.png';
import logos from '../source/1.png'
import logologin from '../source/logologin.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { storeEmail } from '../redux/userSlice';
import { storeMitra } from '../redux/userSlice';

import Signin from './Signin';
function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Untuk membaca query parameter
 const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [clinicData, setClinicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const clinicId = queryParams.get("clinicId");
  const dispatch = useDispatch();


 
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const clinicId = queryParams.get("clinicId");

    if (clinicId) {
      const fetchClinicData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/mitra`);
          const data = await response.json();

          if (data.success) {
            const clinic = data.mitra.find((mitra) => mitra._id === clinicId);
            if (clinic) {
              setClinicData(clinic);
         dispatch(storeMitra(data.namaKlinik));

            } else {
              setClinicData({ namaKlinik: "Tidak ditemukan", logo: null });

            }
          } else {
            setError("Failed to fetch clinic data.");
          }
        } catch (err) {
          setError("Failed to load clinic data.");
        }
      };

      fetchClinicData();
    } else {
      setClinicData({ namaKlinik: "Login As Gamma", logo: null });
    }
  }, [location]);

  if (error) return <p>{error}</p>;

  if (!clinicData) {
    return <p>Loading clinic data...</p>;
  }

  if (error) return <p>{error}</p>;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRoleNavigation = (role) => {
    switch (role) {
      case 'Antrian':
        window.location.href = `http://localhost:3001/antrian?clinicId=${clinicId}`;
        break;
      case 'Doctor':
        window.location.href = `http://localhost:3001/drdashboard?clinicId=${clinicId}`;
        
        break;
      case 'Suster':
        window.location.href = `http://localhost:3001/susterdashboard?clinicId=${clinicId}`;
      
        break;
      case 'Super Admin':
        navigate('/SuperAdmin');
        break;
      case 'Gamma':
        navigate('/DashboardGamma');
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
      dispatch(storeEmail(data.nama));
      
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
                      <img src={clinicData.logo} width="220" alt=""/>
                    </a>
                    <p className="text-center">Sistem Informasi Manajemen Klinik</p>
                    <p className="text-center mb-0 fw-bold black"> {clinicData.namaKlinik}</p>
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
