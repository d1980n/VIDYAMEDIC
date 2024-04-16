import React, { useState ,useEffect } from "react";
import profiles from '../source/user-1.jpg'
import logo from '../source/logo.png'
import '../css/login.css';
import { NavLink } from 'react-router-dom';
import '../css/admindash.css'
import images from '../source/Picture1.png'
function RiwayatMedis() {
  
  const [activePage, setActivePage] = useState('');

  // Fungsi untuk menetapkan halaman aktif
  const handleSetActivePage = (page) => {
      setActivePage(page);
  };
  const [showOverlay, setShowOverlay] = useState(false);
    
  return (
    <html className='Admin'>
        <body>
 {/* <!--  Body Wrapper --> */}
 <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    {/* <!-- Sidebar Start --> */}
    <aside class="left-sidebar">
      {/* <!-- Sidebar scroll--> */}
      <div>
        <div class="brand-logo d-flex align-items-center justify-content-between">
          <a href="./index.html" class="text-nowrap logo-img">
            <img src={logo} width="180" alt="" />
          </a>
          <div class="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
            <i class="ti ti-x fs-8"></i>
          </div>
        </div>
        {/* <!-- Sidebar navigation--> */}
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
                <li className="nav-small-cap">
                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                    <span className="hide-menu">Home</span>
                </li>
                <li className="sidebar-item">
                    <NavLink 
                        className={`sidebar-link ${activePage === 'Monitoring' ? 'active' : ''}`} 
                        to="/Drmonitor" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Monitoring')}
                    >
                        <span><i className="ti ti-heart-rate-monitor"></i></span>
                        <span className="hide-menu">Monitoring</span>
                    </NavLink>
                    <NavLink 
                        className={`sidebar-link ${activePage === 'Riwayat Medis' ? 'active' : ''}`} 
                        to="/RiwayatMedis" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Riwayat Medis')}
                    >
                        <span><i className="ti ti-heart"></i></span>
                        <span className="hide-menu">Riwayat Medis</span>
                    </NavLink>
                    <NavLink 
                        className={`sidebar-link ${activePage === 'Faktor Resiko' ? 'active' : ''}`} 
                        to="/Faktorresiko" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Faktor Resiko')}
                    >
                        <span>
                  <i class="ti ti-device-heart-monitor"></i>
                </span>
                <span class="hide-menu">Faktor Resiko</span>
                    </NavLink>
                    <NavLink 
    className={`sidebar-link ${activePage === 'Prediksi Resiko' ? 'active' : ''}`} 
    to="/prediksiresiko" 
    aria-expanded="false" 
    onClick={() => handleSetActivePage('Prediksi Resiko')}
>
    <span><i className="ti ti-calculator"></i></span>
    <span className="hide-menu">Prediksi Resiko</span>
</NavLink>
<NavLink 
    className={`sidebar-link ${activePage === 'Riwayat Deteksi' ? 'active' : ''}`} 
    to="/riwayatdeteksi" 
    aria-expanded="false" 
    onClick={() => handleSetActivePage('Riwayat Deteksi')}
>
    <span><i className="ti ti-history"></i></span>
    <span className="hide-menu">Riwayat Deteksi</span>
</NavLink>
<NavLink 
    className={`sidebar-link ${activePage === 'Treatment' ? 'active' : ''}`} 
    to="/treatment" 
    aria-expanded="false" 
    onClick={() => handleSetActivePage('Treatment')}
>
    <span><i className="ti ti-hand-finger"></i></span>
    <span className="hide-menu">Treatment</span>
</NavLink>
<NavLink 
    className={`sidebar-link ${activePage === 'Rekomendasi' ? 'active' : ''}`} 
    to="/rekomendasi" 
    aria-expanded="false" 
    onClick={() => handleSetActivePage('Rekomendasi')}
>
    <span><i className="ti ti-thumb-up"></i></span>
    <span className="hide-menu">Rekomendasi</span>
</NavLink>
                    {/* Tambahkan tautan lainnya dengan pola yang sama */}
                </li>
                <li className="nav-small-cap">
                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                    <span className="hide-menu">AUTH</span>
                </li>
                <li className="sidebar-item">
                    <NavLink 
                        className={`sidebar-link ${activePage === 'Log Out' ? 'active' : ''}`} 
                        to="/" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Log Out')}
                    >
                        <span><i className="ti ti-login"></i></span>
                        <span className="hide-menu">Log Out</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
        {/* <!-- End Sidebar navigation --> */}
      </div>
      {/* <!-- End Sidebar scroll--> */}
    </aside>
    {/* <!--  Sidebar End --> */}
    {/* <!--  Main wrapper --> */}
    <div class="body-wrapper">
      {/* <!--  Header Start --> */}
      <header class="app-header">
        <nav class="navbar navbar-expand-lg navbar-light">
          <ul class="navbar-nav">
            <li class="nav-item d-block d-xl-none">
              <a class="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="javascript:void(0)">
                <i class="ti ti-menu-2"></i>
              </a>
              
            </li>
            
            <li class="nav-item">
              <a class="nav-link nav-icon-hover" href="javascript:void(0)">
                <i class="ti ti-bell-ringing"></i>
                <div class="notification bg-primary rounded-circle"></div>
              </a>
            </li>
            <li class="nav-items">
                <div class="">Hello, Dr. Santoso</div>
            </li>
 
          </ul>
          <div class="navbar-collapse justify-content-end px-0" id="navbarNav">
            <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-end">
              <li class="nav-item dropdown">
                <a class="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <img src={profiles} alt="" width="35" height="35" class="rounded-circle"/>
                </a>
                <div class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                  <div class="message-body">
                    <a href="javascript:void(0)" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-user fs-6"></i>
                      <p class="mb-0 fs-3">My Profile</p>
                    </a>
                    <a href="javascript:void(0)" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-mail fs-6"></i>
                      <p class="mb-0 fs-3">My Account</p>
                    </a>
                    <a href="javascript:void(0)" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-list-check fs-6"></i>
                      <p class="mb-0 fs-3">My Task</p>
                    </a>
                    <a href="./authentication-login.html" class="btn btn-outline-primary mx-3 mt-2 d-block">Logout</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/* <!--  Header End --> */}
      <div className="container-fluid">
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <h5 className="card-title fw-semibold mb-4">Riwayat Medis</h5>
                <button type="submit" className="btn btn-primary" onClick={() => setShowOverlay(true)}>
                  <i className="ti ti-playlist-add"></i> Tambah MR
                </button>
                <div className="accord">
	<details>
		<summary className="fw-semibold">
			12 Maret 2039 <br/><h8 className="fw-light">08:21</h8>
		</summary>
		<div>
      <h5>Pemeriksaan Tanda Vital</h5>
      <h7>Tekanan Darah Sistolik: 123932180</h7>
      <h5>Health Record</h5>
      <h6>Diagnosa/Anamnesa: <h8 className="fw-light">Sehat Enak</h8></h6>
      <h6>Therapy: <h8 className="fw-light">Olahraga kayang</h8></h6>
      <h6>Obat: <h8 className="fw-light">Minum air hujan</h8></h6>

		</div>
	</details>
	<details>
  <summary className="fw-semibold">
			12 Maret 2039 <br/><h8 className="fw-light">08:21</h8>
		</summary>
		<div>
    <h5>Pemeriksaan Tanda Vital</h5>
      <h7>Tekanan Darah Sistolik: 123932180</h7>
      <h5>Health Record</h5>
      <h6>Diagnosa/Anamnesa: <h8 className="fw-light">Sehat Enak</h8></h6>
      <h6>Therapy: <h8 className="fw-light">Olahraga kayang</h8></h6>
      <h6>Obat: <h8 className="fw-light">Minum air hujan</h8></h6>
		</div>
	</details>
	<details>
  <summary className="fw-semibold">
			21 April 2019 <br/><h8 className="fw-light">12:21</h8>
		</summary>
		<div>
    <h5>Pemeriksaan Tanda Vital</h5>
      <h7>Tekanan Darah Sistolik: 123932180</h7>
      <h5>Health Record</h5>
      <h6>Diagnosa/Anamnesa: <h8 className="fw-light">Sehat Enak</h8></h6>
      <h6>Therapy: <h8 className="fw-light">Olahraga kayang</h8></h6>
      <h6>Obat: <h8 className="fw-light">Minum air hujan</h8></h6>
			</div>
	</details>
	<details>
  <summary className="fw-semibold">
			17 Agustus 2039 <br/><h8 className="fw-light">09:11</h8>
		</summary>
		<div>
    <h5>Pemeriksaan Tanda Vital</h5>
      <h7>Tekanan Darah Sistolik: 123932180</h7>
      <h5>Health Record</h5>
      <h6>Diagnosa/Anamnesa: <h8 className="fw-light">Sehat Enak</h8></h6>
      <h6>Therapy: <h8 className="fw-light">Olahraga kayang</h8></h6>
      <h6>Obat: <h8 className="fw-light">Minum air hujan</h8></h6>
			</div>
	</details>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOverlay && (
        <div className="overlay" onClick={() => setShowOverlay(false)}>
          <div className="overlay-content">
            <div className="container-fluid">
              <div className="container-fluid">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Forms</h5>
                    <div className="card">
                      <div className="card-body">
                        <form>
                          <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                          </div>
                          <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                          </div>
                          <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                      </div>
                    </div>
                    <h5 className="card-title fw-semibold mb-4">Disabled forms</h5>
                    <div className="card mb-0">
                      <div className="card-body">
                        <form>
                          <fieldset disabled>
                            <legend>Disabled fieldset example</legend>
                            <div className="mb-3">
                              <label htmlFor="disabledTextInput" className="form-label">Disabled input</label>
                              <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="disabledSelect" className="form-label">Disabled select menu</label>
                              <select id="disabledSelect" className="form-select">
                                <option>Disabled select</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck" disabled />
                                <label className="form-check-label" htmlFor="disabledFieldsetCheck">
                                  Can't check this
                                </label>
                              </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  </div>
  <script src="../assets/libs/jquery/dist/jquery.min.js"></script>
  <script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/sidebarmenu.js"></script>
  <script src="../assets/js/app.min.js"></script>
  <script src="../assets/libs/simplebar/dist/simplebar.js"></script>
</body>

    </html>
  );
}
export default RiwayatMedis;
