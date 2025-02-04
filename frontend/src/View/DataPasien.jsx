import React, { useEffect, useState, useRef } from 'react';
import profiles from '../source/user-1.jpg';
import logo from '../source/logo.png';
import logos from '../source/1.png'
import '../css/login.css';
import '../css/admindash.css';
import images from '../source/Picture1.png';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png';

const DataPasien = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const mitra = JSON.parse(sessionStorage.getItem('mitra'));
  console.log(user);

  const handleLogout = () => {
    const clinicId = mitra.idKlinik || ''; // Pastikan ID klinik ada
    sessionStorage.removeItem('user'); // Hapus session user
    window.location.href = `http://localhost:3001/?clinicId=${clinicId}`; // Navigasi ke URL target
  };

  const handleShowDetail = (patients) => {
    setSelectedPatients(patients);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(!showDetail);
  };

  const fetchAllPatients = async () => {
    try {
      const response = await fetch("http://localhost:3000/patients/patients-with-medical-records");
      const data = await response.json();
      if (data.success) {
          // Menyimpan semua person ke dalam state
          setPatients(data.patients);
      } else {
          console.error("Failed to fetch persons:", data.message);
      }
  } catch (error) {
      console.error("Error fetching persons:", error);
  }
  };

  const filterPatientsByClinic = (patients) => {
    const namaKlinik = mitra ? mitra.namaKlinik : '';

    return patients.filter(patient => {
        const { medicalData } = patient;
        return medicalData.some(record => record.riwayatKlinik.includes(namaKlinik));
    });
  };

  useEffect(() => {
    fetchAllPatients();
  }, []);

  useEffect(() => {
    if (patients.length > 0) {
        const filtered = filterPatientsByClinic(patients);
        setFilteredPatients(filtered);
    }
}, [patients]);  

  const [activePage, setActivePage] = useState('');

  const handleSetActivePage = (page) => {
    setActivePage(page);
  };

  const [isOpen, setIsOpen] = useState(false); // State untuk menyimpan status dropdown
  const dropdownRef = useRef(null); // Referensi untuk dropdown

  // Toggle untuk membuka atau menutup dropdown
  const handleToggle = () => {
    setIsOpen(prevState => !prevState);
  };

  // Menutup dropdown ketika klik di luar
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Event listener untuk mendeteksi klik di luar dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <html className='Admin'>
      <link rel="stylesheet" href="https://icdcdn.azureedge.net/embeddedct/icd11ect-1.1.css"></link>
      <body>
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
          data-sidebar-position="fixed" data-header-position="fixed">
          <aside className="left-sidebar">
            <div>
              <div className="brand-logo d-flex align-items-center justify-content-between">
                <a href="./index.html" className="text-nowrap logo-img">
                  <img src={mitra.logoKlinik} width="100" alt="" />
                </a>
                <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                  <i className="ti ti-x fs-8"></i>
                </div>
              </div>
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
                    <NavLink className={`sidebar-link ${activePage === "DataNakes" ? "active" : ""}`} to="/DataNakes" aria-expanded="false" onClick={() => handleSetActivePage("DataNakes")}>
                      <span>
                        <i className="ti ti-square-plus"></i>
                      </span>
                      <span className="hide-menu">Data Tenaga Kesehatan</span>
                    </NavLink>
                    <NavLink className={`sidebar-link ${activePage === "DataPasien" ? "active" : ""}`} to="/DataPasien" aria-expanded="false" onClick={() => handleSetActivePage("DataPasien")}>
                      <span>
                        <i className="ti ti-accessible"></i>
                      </span>
                      <span className="hide-menu">Data Pasien</span>
                    </NavLink>
                  </li>
                  <li className="nav-small-cap">
                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                    <span className="hide-menu">AUTH</span>
                  </li>
                  <li className="sidebar-item">
                    <NavLink className={`sidebar-link ${activePage === "Log Out" ? "active" : ""}`} to="/" aria-expanded="false" onClick={handleLogout}>
                      <span>
                        <i className="ti ti-login"></i>
                      </span>
                      <span className="hide-menu">Log Out</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          <div className="body-wrapper">
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
                    <li className="nav-item dropdown" ref={dropdownRef}>
                      <a
                        className="nav-link nav-icon-hover"
                        href="#"
                        onClick={handleToggle} // Kaitkan fungsi handleToggle ke sini
                        id="drop2"
                        aria-expanded={isOpen}
                      >
                        <img src={profiles} alt="Profile" width="35" height="35" className="rounded-circle" />
                      </a>

                      {/* Dropdown menu muncul jika `isOpen` bernilai true */}
                      {isOpen && (
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up show" aria-labelledby="drop2">
                          <div className="message-body">
                            <a href="#" className="d-flex align-items-center gap-2 dropdown-item">
                              <i className="ti ti-user fs-6"></i>
                              <p className="mb-0 fs-3">My Profile</p>
                            </a>
                            <a href="#" className="d-flex align-items-center gap-2 dropdown-item">
                              <i className="ti ti-mail fs-6"></i>
                              <p className="mb-0 fs-3">My Account</p>
                            </a>
                            <a href="#" className="d-flex align-items-center gap-2 dropdown-item">
                              <i className="ti ti-list-check fs-6"></i>
                              <p className="mb-0 fs-3">My Task</p>
                            </a>
                            <a href="./authentication-login.html" className="btn btn-outline-primary mx-3 mt-2 d-block">
                              Logout
                            </a>
                          </div>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
            <div className="container-fluid">
              <body className="login"></body>
              <div>
                <div className="row">
                  <div className="col-lg-8 d-flex align-items-stretch" style={{ width: '100%' }}>
                    <div className="card w-100">
                      <div className="card-body p-4 width">
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '5vh' }}>
                          <h5 className="card-title fw-semibold" style={{ width: '15%', alignItems: 'center', display: 'flex' }}>Data Pasien</h5>
                          <input
                                type="text"
                                id="search-input"
                                className="form-sels"
                                placeholder="Masukkan nama atau email"
                                style={{ width: '67%' }}
                                // Memanggil fungsi pencarian saat pengguna mengetik
                              />
                              
                              <button 
                                type="button" 
                                className="btn btn-secondary m-1" 
                              >
                                Update Antri
                              </button>
                        </div>

                        <div className="table-responsive">
                          <table className="table text-nowrap mb-0 align-middle">
                            <thead className="text-dark fs-4">
                              <tr>
                                <th className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0">Nomor MR</h6>
                                </th>
                                <th className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0">Nama Pasien</h6>
                                </th>
                                <th className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0">Diagnosis</h6>
                                </th>
                                <th style={{width: '10rem'}} className="border-bottom-0">
                                  <h6 style={{maxWidth: '5rem', minWidth: '5rem'}} className="fw-semibold mb-0">Action</h6>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patients) => (
                                    <tr key={patients.nomorMR}>
                                        <td>{patients.nomorMR}</td>
                                        <td>{patients.namaLengkap}</td>
                                        <td>{patients.email}</td>
                                        <td>
                                          <button type="button" className="btn btn-primary m-1" onClick={() => handleShowDetail(patients)}>
                                            Detail
                                          </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">Tidak ada data untuk ditampilkan</td>
                                </tr>
                            )}
                          </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal for showing details */}
                {showDetail && (
                  <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Detail Pasien
                        </h5>
                        <button type="button" className="btn-close" onClick={handleCloseDetail}></button>
                      </div>
                      {selectedPatients && (
                        <div className="modal-body">
                          {/* Input pengukuran medis */}
                          <div className="row row-space">
                            <div className="col-lg-6">
                              <h6 className="fw-bold">Nomor MR</h6>
                              <p>{selectedPatients.nomorMR}</p>
                            </div>
                            <div className="col-lg-6">
                              <h6 className="fw-bold">Nama</h6>
                              <p>{selectedPatients.namaLengkap}</p>
                            </div>
                          </div>

                          <div className="row row-space">
                            <div className="col-lg-6">
                              <h6 className="fw-bold">Jenis Kelamin</h6>
                              <p>{selectedPatients.jenisKelamin}</p>
                            </div>
                            <div className="col-lg-6">
                              <h6 className="fw-bold">Alamat</h6>
                              <p>{selectedPatients.alamatLengkap}</p>
                            </div>
                          </div>

                          <div className="row row-space">
                            <div className="col-lg-6">
                              <h6 className="fw-bold">No HP</h6>
                              <p>{selectedPatients.phone_number}</p>
                            </div>
                            <div className="col-lg-6">
                              <h6 className="fw-bold">Email</h6>
                              <p>{selectedPatients.email}</p>
                            </div>
                          </div>
                          
                        </div>
                      )}
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={handleCloseDetail}>
                            Tutup
                          </button>
                          {/* <button type="submit" className="btn btn-success" disabled={isConfirmed}>Masuk</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
    // <div>
    //   <h1>Medical Records</h1>
    //   <ul>
    //     {medicalRecords.map((record) => (
    //       <li key={record._id}>
    //         <h3>Record ID: {record._id}</h3>
    //         <p>Patient Name: {record.patientName}</p>
    //         <p>Diagnosis: {record.diagnosis}</p>
    //         {/* Add other fields as necessary */}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default DataPasien;
