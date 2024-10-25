import React, { useState, useEffect } from "react";
import profiles from "../source/user-1.jpg";
import logo from "../source/logo.png";
import "../css/login.css";
import "../css/admindash.css";
import images from "../source/Picture1.png";
import { NavLink } from "react-router-dom";
import images2 from "../source/img2.png";

function SuperAdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [TDS, setTekananDarahSistolik] = useState('');
  const [TDD, setTekanandarahDiastolik] = useState('');
  const [Temperatur, setTemperatur] = useState('');
  const [Nadi, setNadi] = useState('');
  const [LP, setLajuPernafasan] = useState('');
  const [Spot, setSpot] = useState('');
  const [TB, setTinggiBadan] = useState('');
  const [BB, setBeratBadan] = useState('');
  const [LILA, setLILA] = useState('');
  const [AVPU, setAVPU] = useState('');
  const [daftarPasien, setDaftarPasien] = useState([]);
  const [selectedNomorMR, setSelectedNomorMR] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false); // State untuk konfirmasi

  const toggleModal = (nomorMR) => {
    setShowModal(!showModal);
    setSelectedNomorMR(nomorMR); 
  };
  
  const fetchDaftarPasien = async () => {
    try {
      const response = await fetch("http://localhost:3000/patients");
      const data = await response.json();
      console.log("response : ", response);
      console.log("data pasien: ", data.patients);
      if (data.success) {
        const filteredPatients = data.patients.filter((patient) => patient.antrianStatus.susterAntriStatus === true);
        setDaftarPasien(filteredPatients);
      } else {
        console.error("Failed to fetch patients:", data.message);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  };
  useEffect(() => {
    fetchDaftarPasien();
  }, []);
  
  const resetForm = () => {
    setTekananDarahSistolik('');
    setTekanandarahDiastolik('');
    setTemperatur('');
    setNadi('');
    setLajuPernafasan('');
    setSpot('');
    setTinggiBadan('');
    setBeratBadan('');
    setLILA('');
    setAVPU('');
  };
  
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [activePage, setActivePage] = useState("");
  
  // Fungsi untuk menetapkan halaman aktif
  const handleSetActivePage = (page) => {
    setActivePage(page);
  };
  const [showOverlay, setShowOverlay] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (window.confirm("Apakah Anda sudah yakin?")) {
        const formData = {
            nomorMR: selectedNomorMR,
            TDS,
            TDD,
            Temperatur,
            Nadi,
            LP,
            Spot,
            TB,
            BB,
            LILA,
            AVPU,
        };

        try {
            const response = await fetch('http://localhost:3000/medical/tambah', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('Response Status:', response.status); 
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Response Data:', data);
                // Reset form dan refresh daftar pasien setelah berhasil
                if (data.success) {
                    setShowModal(false); // Tutup modal setelah sukses
                    resetForm(); // Reset input
                    setIsConfirmed(false); // Set konfirmasi
                    fetchDaftarPasien();
                }
            } else {
                const text = await response.text(); 
                console.error('Error: Response is not JSON. Response text:', text);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
};

  
  
  
  
  
  const handleTambahMRClick = () => {
    setIsModalVisible(true);
  };
  return (
    <html className="Admin">
      <link rel="stylesheet" href="https://icdcdn.azureedge.net/embeddedct/icd11ect-1.1.css"></link>
      <body>
        {/* <!--  Body Wrapper --> */}
        <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
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
                  <NavLink className={`sidebar-link ${activePage === "SuperAdminDashboard" ? "active" : ""}`} to="/SuperAdmin" aria-expanded="false" onClick={() => handleSetActivePage("Dashboard")}>
                      <span>
                        <i className="ti ti-layout-dashboard"></i>
                      </span>
                      <span className="hide-menu">Dashboard</span>
                    </NavLink>
                    <NavLink className={`sidebar-link ${activePage === "DataDokter" ? "active" : ""}`} to="/DataDokter" aria-expanded="false" onClick={() => handleSetActivePage("DataDokter")}>
                      <span>
                        <i className="ti ti-square-plus"></i>
                      </span>
                      <span className="hide-menu">Data Tenaga Kesehatan</span>
                    </NavLink>
                    {/* Tambahkan tautan lainnya dengan pola yang sama */}
                  </li>
                  <li className="nav-small-cap">
                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                    <span className="hide-menu">AUTH</span>
                  </li>
                  <li className="sidebar-item">
                    <NavLink className={`sidebar-link ${activePage === "Log Out" ? "active" : ""}`} to="/" aria-expanded="false" onClick={() => handleSetActivePage("Log Out")}>
                      <span>
                        <i className="ti ti-login"></i>
                      </span>
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
            <header className="app-header">
              <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav">
                  <li className="nav-item d-block d-xl-none">
                    <a className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="javascript:void(0)">
                      <i className="ti ti-menu-2"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link nav-icon-hover" href="javascript:void(0)">
                      <i className="ti ti-bell-ringing"></i>
                      <div className="notification bg-primary rounded-circle"></div>
                    </a>
                  </li>
                </ul>
                <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                  <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                    <li className="nav-item dropdown">
                      <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img src={profiles} alt="" width="35" height="35" className="rounded-circle"/>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                        <div className="message-body">
                          <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                            <i className="ti ti-user fs-6"></i>
                            <p className="mb-0 fs-3">My Profile</p>
                          </a>
                          <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                            <i className="ti ti-mail fs-6"></i>
                            <p className="mb-0 fs-3">My Account</p>
                          </a>
                          <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                            <i className="ti ti-list-check fs-6"></i>
                            <p className="mb-0 fs-3">My Task</p>
                          </a>
                          <a href="./authentication-login.html" className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
            <header class="app-header"></header>
            {/* <!--  Header End --> */}
            <div class="container-fluid" style={{ paddingTop: "24px" }}>
              <body className="login"></body>
              {/* <!--  Row 1 --> */}
              <div className="col-lg-5" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div class="row" style={{ width: "49%", marginLeft: "1px" }}>
                  <div class="card overflow-hidden">
                    <div class="card-body p-4">
                      <h5 class="card-title mb-9 fw-semibold">Klinik</h5>

                      <div class="row align-items-center">
                        <div class="col-8">
                          <h4 class="fw-semibold mb-3">Klinik VidyaMedic</h4>

                          <div class="d-flex align-items-center pb-1">
                            <span class="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                              <i class="ti ti-arrow-down-right text-danger"></i>
                            </span>

                            <p class="fs-3 mb-0">
                              <p class="text-dark me-1 fs-3 mb-0">Alamat:</p> JL. Jamaludinsurak jawa barat, andalan 12 nomor 19 rw 12
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row" style={{ width: "49%", marginRight: "2px" }}>
                  <div class="card overflow-hidden">
                    <div class="card-body p-4">
                      <h5 class="card-title mb-9 fw-semibold">Admin</h5>
                      <div class="row align-items-center">
                        <div class="col-8">
                          <h4 class="fw-semibold mb-3">Helo, Petugas. Udin Simanjuntak</h4>
                          <div class="d-flex align-items-center pb-1">
                            <span class="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                              <i class="ti ti-arrow-down-right text-danger"></i>
                            </span>
                            <p class="fs-3 mb-0" style={{ marginLeft: "10px" }}>
                              <p class="text-dark me-1 fs-5 mb-0">
                                Jumlah Antrian: <p class="text-dark me-1 fs-4 mb-0">5</p>
                              </p>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5" style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "15rem" }}>
                <div class="row" style={{ width: "23%", marginLeft: "1px" }}>
                  <div class="card overflow-hidden">
                    <div class="card-body p-4">
                      
                    </div>
                  </div>
                </div>
                <div class="row" style={{ width: "23%", marginRight: "2px" }}>
                  <div class="card overflow-hidden">
                    <div class="card-body p-4">
                      
                    </div>
                  </div>
                </div>
                <div class="row" style={{ width: "50%", marginRight: "2px" }}>
                  <div class="card overflow-hidden">
                    <div class="card-body p-4">
                      
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-5" style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "25rem"}}>
                <div class="row" style={{ width: "100%", marginLeft: "1px",}}>
                  <div class="card overflow-hidden">
                    <div class="card-body p-4">
                      
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="row"></div>
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
export default SuperAdminDashboard;
