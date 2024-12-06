import React from "react";
import logo from "../source/logo.png";
import logos from '../source/1.png'
import "../css/login.css";
import "../css/admindash.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import images from "../source/Picture1.png";
import { NavLink, useLocation } from "react-router-dom";
import images2 from "../source/img2.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const DrDashboard = () => {
  const [activePage, setActivePage] = useState("");
  const [daftarPasien, setDaftarPasien] = useState([]);
  const [jumlahPasien, setJumlahPasien] = useState([]);

  const [isDisabled, setIsDisabled] = useState(false); // Contoh inisialisasi
  const location = useLocation();
  const userEmail = useSelector((state) => state.user.nama); //
  const [loading, setLoading] = useState(false);

  
  const [clinicData, setClinicData] = useState(null);
  const [error, setError] = useState(null); 

  
  const handleSetActivePage = (page) => {
    setActivePage(page);
  };
  useEffect(() => {
    // Check if the current path is '/drDashboard' and disable the NavLink
    if (location.pathname === "/drDashboard") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [location.pathname]);

  const fetchDaftarPasien = async () => {
    try {
      const response = await fetch("http://localhost:3000/patients");
      const data = await response.json();
      console.log("response : ", response);
      console.log("data pasien: ", data.patients);
      if (data.success) {
        const filteredPatients = data.patients.filter((patient) => patient.antrianStatus.dokterAntriStatus === true && patient.antrianStatus.dokterPeriksaStatus === false);

        // Menghitung jumlah pasien yang sesuai dengan filter
        const jumlahPasien = filteredPatients.length;
        console.log("Jumlah pasien yang sesuai:", jumlahPasien);
        
        // Mengatur daftar pasien dan jumlah pasien ke dalam state
        setDaftarPasien(filteredPatients);
        setJumlahPasien(jumlahPasien); // Atur state ini jika Anda ingin menampilkannya di UI
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

  return (
    <>
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
                    <img src={clinicData.logo} width="180" alt="" />
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
                      <NavLink className={`sidebar-link ${activePage === "Dashboard" ? "active" : ""}`} to="/Drdashboard" aria-expanded="false" onClick={() => handleSetActivePage("Dashboard")}>
                        <span>
                          <i className="ti ti-layout-dashboard"></i>
                        </span>
                        <span className="hide-menu">Dashboard</span>
                      </NavLink>
                      <NavLink className={`sidebar-link ${activePage === "DrAntri" ? "active" : ""}`} to="/DrAntri" aria-expanded="false" onClick={() => handleSetActivePage("DrAntri")}>
                        <span>
                          <i className="ti ti-clipboard"></i>
                        </span>
                        <span className="hide-menu">Antrian</span>
                      </NavLink>

                      <NavLink className={`sidebar-linkk ${activePage === "Dashboard" ? "active" : ""}`} to="/Drdashboard" aria-expanded="false" onClick={() => handleSetActivePage("Dashboard")}>
                        <span>
                          <i className="ti ti-heart-rate-monitor"></i>
                        </span>
                        <span className="hide-menu">Periksa</span>
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
                            <h4 class="fw-semibold mb-3">{clinicData.namaKlinik}</h4>

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
                        <h5 class="card-title mb-9 fw-semibold">Dokter</h5>
                        <div class="row align-items-center">
                          <div class="col-8">
                            <h4 class="fw-semibold mb-3">Helo, Dr. {userEmail}</h4>
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
                    <h5 class="card-title mb-9 fw-semibold text-center">Jumlah Antrian: </h5>
                    <h1 class="mb-9 fw-semibold text-center">{jumlahPasien}</h1> {/* Menampilkan jumlah pasien di sini */}
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
    </>
  );
};

export default DrDashboard;
