import React, { useState ,useEffect } from "react";
import profiles from '../source/user-1.jpg'
import logo from '../source/logo.png'
import '../css/login.css';
import '../css/admindash.css'
import images from '../source/Picture1.png'
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png'
function Antrian() {
    
  
    
    
    
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };
  

  
  
  useEffect(() => {
      const fetchData = async () => {
          if (searchTerm.trim() !== '') {
              try {
                  const response = await fetch(`https://api.icd11.mondofacto.com/2020-09/${searchTerm}`);
                  const data = await response.json();
                  setSearchResults(data);
              } catch (error) {
                  console.error('Error:', error);
              }
          } else {
              setSearchResults([]);
          }
      };

      fetchData();
  }, [searchTerm]);

  const [activePage, setActivePage] = useState('');

  // Fungsi untuk menetapkan halaman aktif
  const handleSetActivePage = (page) => {
      setActivePage(page);
  };
  const [showOverlay, setShowOverlay] = useState(false);
    
  return (
    <html className='Admin'>
      <link rel="stylesheet" href="https://icdcdn.azureedge.net/embeddedct/icd11ect-1.1.css"></link>
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
                        className={`sidebar-link ${activePage === 'Dashboard' ? 'active' : ''}`} 
                        to="/Antrian" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Dashboard')}
                    >
                        <span><i className="ti ti-layout-dashboard"></i></span>
                        <span className="hide-menu">Dashboard</span>
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
      <div class="container-fluid">
        <body className="login">
        </body>
        {/* <!--  Row 1 --> */}
        <div class="row">
          
          <div class="col-lg-8 d-flex align-items-stretch" style={{width: '100%'}}>
            <div class="card w-100">
              <div class="card-body p-4 width" >
                <h5 class="card-title fw-semibold mb-4">Antrian Pasien</h5>
                <div class="table-responsive">
                  <table class="table text-nowrap mb-0 align-middle">
                    <thead class="text-dark fs-4">
                      <tr>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">No</h6>
                        </th>

                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Nama Pasien</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Nomor MR</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Action</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">1</h6></td>
                        <td class="border-bottom-0">
                          <p class="mb-0 fw-normal">Sukmiadi Salamarudin supriyatni</p>
                        </td>
                        <td class="border-bottom-0">
                          <div class="d-flex align-items-center gap-2">
                            <span class="fw-normal">0129830123</span>
                          </div>
                        </td>
                        <td class="border-bottom-0">
                          <button type="button" class="btn btn-primary m-1" >Masuk</button>
                          <button type="button" class="btn btn-danger m-1" >Batal</button>
                          <button type="button" class="btn btn-success m-1" >Selesai</button>
                        </td>
                      </tr> 
                      <tr>
                        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">2</h6></td>
                        <td class="border-bottom-0">
                          <p class="mb-0 fw-normal">Sumarti</p>
                        </td>
                        <td class="border-bottom-0">
                          <div class="d-flex align-items-center gap-2">
                          <span class="fw-normal">0129830</span>
                          </div>
                        </td>
                        <td class="border-bottom-0">
                        <button type="button" class="btn btn-primary m-1" >Masuk</button>
                          <button type="button" class="btn btn-danger m-1" >Batal</button>
                          <button type="button" class="btn btn-success m-1" >Selesai</button>
                        </td>
                      </tr> 
                      <tr>
                        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">3</h6></td>
                        <td class="border-bottom-0">
                        <p class="mb-0 fw-normal">Sukmiadi</p>
                        </td>
                        <td class="border-bottom-0">
                          <div class="d-flex align-items-center gap-2">
                          <span class="fw-normal">0129830</span>
                          </div>
                        </td>
                        <td class="border-bottom-0">
                        <button type="button" class="btn btn-primary m-1" >Masuk</button>
                          <button type="button" class="btn btn-danger m-1" >Batal</button>
                          <button type="button" class="btn btn-success m-1" >Selesai</button>
                        </td>
                      </tr> 
                      <tr>
                        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">4</h6></td>
                        <td class="border-bottom-0">
                        <p class="mb-0 fw-normal">Sukmiadi</p>
                        </td>
                        <td class="border-bottom-0">
                          <div class="d-flex align-items-center gap-2">
                          <span class="fw-normal">0129830</span>
                          </div>
                        </td>
                        <td class="border-bottom-0">
                        <button type="button" class="btn btn-primary m-1" >Masuk</button>
                          <button type="button" class="btn btn-danger m-1" >Batal</button>
                          <button type="button" class="btn btn-success m-1" >Selesai</button>
                        </td>
                      </tr>                    
                    </tbody>
                  </table>
                </div>
                
              </div>
              
              
            </div>
            
          </div>
          
        </div>
      </div>
      
    </div>
    
  </div>
  <script src="../libs/jquery/dist/jquery.min.js"></script>
  <script src="../libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../js/sidebarmenu.js"></script>
  <script src="../js/app.min.js"></script>
  <script src="../libs/apexcharts/dist/apexcharts.min.js"></script>
  <script src="../libs/simplebar/dist/simplebar.js"></script>
  <script src="../js/dashboard.js"></script>
  <script src="https://icdcdn.azureedge.net/embeddedct/icd11ect-1.1.js"></script>
</body>

    </html>
  );
}
export default Antrian;
