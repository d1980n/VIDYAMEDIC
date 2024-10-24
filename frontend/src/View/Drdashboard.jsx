import React from "react";
import logo from "../source/logo.png";
import "../css/login.css";
import "../css/admindash.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import images from "../source/Picture1.png";
import { NavLink } from "react-router-dom";
import images2 from "../source/img2.png";
import { useState } from "react";
const DrDashboard = () => {
  const [activePage, setActivePage] = useState("");

  const handleSetActivePage = (page) => {
    setActivePage(page);
  };
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
                      <NavLink className={`sidebar-link ${activePage === "Dashboard" ? "active" : ""}`} to="/Drdashboard" aria-expanded="false" onClick={() => handleSetActivePage("Dashboard")}>
                        <span>
                          <i className="ti ti-layout-dashboard"></i>
                        </span>
                        <span className="hide-menu">Dashboard</span>
                      </NavLink>
                      <NavLink className={`sidebar-link ${activePage === "DrAntri" ? "active" : ""}`} to="/DrAntri" aria-expanded="false" onClick={() => handleSetActivePage("DrAntri")}>
                        <span>
                          <i className="ti ti-layout-dashboard"></i>  
                        </span>
                        <span className="hide-menu">Antrian</span>
                      </NavLink>

                      <NavLink
                        className={`sidebar-link ${"Dashboard" ? "disabled-link " : ""}`}
                        to="/Drmonitor"
                        aria-expanded="false"
                        onClick={(e) => {
                          if (activePage === "Monitoring") {
                            e.preventDefault(); // Mencegah navigasi saat tombol dalam kondisi disabled
                          } else {
                            handleSetActivePage("Monitoring"); // Jalankan fungsi jika tidak disabled
                          }
                        }}
                      >
                        <span>
                          <i className="ti ti-heart-rate-monitor"></i>
                        </span>
                        <span className="hide-menu">Monitoring</span>
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
                        <h5 class="card-title mb-9 fw-semibold">Dokter</h5>
                        <div class="row align-items-center">
                          <div class="col-8">
                            <h4 class="fw-semibold mb-3">Helo, Dr. Santoso Sutetjo</h4>
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
