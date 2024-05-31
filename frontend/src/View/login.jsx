import '../css/login.css';
import { useState } from 'react';
import logologin from '../source/logologin.png'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
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
      const res = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
 
        return;
      }
      navigate('/Drdashboard');
    } catch (error) {
      
    }
  };

  return (
    <html className='loginss'>
      <body className="login">
        <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
      class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-3">
            <div class="card mb-0">
              <div class="card-body">
                <a href="./index.html" class="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src={logologin} width="220" alt=""/>
                </a>
                <p class="text-center">Sistem Informasi Manajemen Klinik</p>
                <p class="text-center mb-0 fw-bold black">Klinik Vidya Medic</p>
                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" onChange={handleChange} id="email" aria-describedby="emailHelp"/>
                  </div>
                  <div class="mb-4">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" onChange={handleChange} id="password"/>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mb-4">
                    <div class="form-check">
                      <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked"/>
                      <label class="form-check-label text-dark" for="flexCheckChecked">
                        Ingat perangkat ini
                      </label>
                    </div>
                    <a class="text-primary fw-bold" href="/Drdashboard">Lupa Password?</a>
                  </div>
                  <button href="" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Masuk</button>
                  <p class="text-center fs-4 fw-semi-bold">Atau menggunakan</p>
                  <div class="udin">
                    <span>
                      <a class="ti ti-face-id titi"></a>
                    </span>
                    <span>
                      <a class="ti ti-brand-facebook titi"></a>
                    </span>
                    <span>
                      <a class="ti ti-brand-google titi"></a>
                    </span>
                    <span>
                      <a class="ti ti-brand-mantine titi"></a>
                    </span>
                    
                  </div>


                  <div class="d-flex align-items-center justify-content-center">
                    <p class="fs-4 mb-0 fw-bold">Belum memiliki akun?</p>
                    <a class="text-primary fw-bold ms-2" href="/register">Buat akun</a>
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
      </body>
    </html>
  );
}

export default Login;
