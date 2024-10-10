import React, { useState, useEffect } from "react";
import axios from 'axios';
import profiles from '../source/user-1.jpg';
import logo from '../source/logo.png';
import '../css/login.css';
import '../css/admindash.css';
import images from '../source/Picture1.png';
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png';

function DataDokter() {
  const [showModal, setShowModal] = useState(false);
  const [namaLengkap, setNamaLengkap] = useState('');
  // const [fotoKTP, setFotoKTP] = useState(null);
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [alamatLengkap, setAlamatLengkap] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ttl, setTtl] = useState('');
  const [poli, setPoli] = useState('');
  const [role, setRole] = useState('');
  const [kodeDok, setKodeDok] = useState('');
  const [daftarDokter, setDaftarDokter] = useState([]);
  const [formData, setFormData] = useState({});
  const toggleModal = () => {
    setShowModal(!showModal);
  };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Remove the window.confirm line
//     const formData = {
//       namaLengkap,
//       jenisKelamin,
//       alamatLengkap,
//       phone_number,
//       email,
//       password,
//       role,
//       poli
//     };

//     try {
//       const response = await fetch("http://localhost:3000/medical/tambah", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       console.log("Response Status:", response.status);
//       const contentType = response.headers.get("content-type");

//       if (contentType && contentType.includes("application/json")) {
//         const data = await response.json();
//         console.log("Response Data:", data);

//         // Reset form dan refresh daftar pasien setelah berhasil

//         setShowModal(false); // Tutup modal setelah sukses
//         resetForm(); // Reset input
//         fetchDaftarDokter();
//         console.log("well");
//         window.location.reload();
//       } else {
//         const text = await response.text();
//         console.error("Error: Response is not JSON. Response text:", text);
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
// };

//   const fetchDaftarDokter = async () => {
//     try {
//         const response = await fetch('http://localhost:3000/doctor');
//         const data = await response.json();

//         if (response.ok) { // Check if the response is successful
//           const data = await response.json();
//           console.log("Response Data:", data);
//             // Save the filtered patients to state
//         } else {
//             console.error('Failed to fetch dokter:', data.message);
//         }
//     } catch (error) {
//         console.error('Error fetching dokter:', error);
//         // Handle error appropriately, e.g., displaying an error message to the user
//     }
// };
  
//   useEffect(() => {
//     fetchDaftarDokter();
//   }, []);

const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState('');

// Fungsi untuk membuat kode dokter otomatis dengan awalan "D" dan 3 angka acak
const generateKodeDokter = () => {
  const randomNumber = Math.floor(100 + Math.random() * 900); // Menghasilkan angka acak antara 100 dan 999
  return `D${randomNumber}`;
};

const resetForm = () => {
  setNamaLengkap("");
  setJenisKelamin("");
  setAlamatLengkap("");
  setPhoneNumber("");
  setPoli("");
  setEmail("");
  setPassword("");
  setConfirmPassword("");
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validasi jika password dan konfirmasi password tidak cocok
  if (password !== confirmPassword) {
    setError('Password dan konfirmasi password tidak cocok');
    return;
  }

  // Pastikan kode_dok dan role diisi secara otomatis
  const finalKodeDok = kodeDok || generateKodeDokter();
  const finalRole = role || 'Dokter';

  // Menyusun data form
  const formData = {
    kodeDok: finalKodeDok,
    namaLengkap,
    jenisKelamin,
    email,
    phone_number,
    role: finalRole,
    alamatLengkap,
    ttl,
    poli,
    password
  };

  // Log data untuk memeriksa
  console.log('Form Data:', formData);

  try {
    const response = await fetch('http://localhost:5000/api/dokter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });


    const data = await response.json();
    console.log('Response Data:', data);

    // Reset form dan refresh daftar pasien setelah berhasil
    setShowModal(false); // Tutup modal setelah sukses
    resetForm(); // Reset input
    console.log("well");
    window.location.reload();
 } catch (error) {
   alert('Terjadi kesalahan saat menambahkan dokter: ' + error.message);
 }
};

const [dokters, setDokters] = useState([]);

  useEffect(() => {
    const fetchDokters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dokter');
        setDokters(response.data);
      } catch (error) {
        alert('Error fetching dokter data: ' + error.message);
      }
    };

    fetchDokters();
  }, []);

  // ===============================================================================================================================

  const [activePage, setActivePage] = useState('');

  const handleSetActivePage = (page) => {
    setActivePage(page);
  };

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
                  <img src={logo} width="180" alt="" />
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
                    <NavLink className={`sidebar-link ${activePage === "DataDokter" ? "active" : ""}`} to="/DataDokter" aria-expanded="false" onClick={() => handleSetActivePage("Datapasien")}>
                      <span>
                        <i className="ti ti-layout-dashboard"></i>
                      </span>
                      <span className="hide-menu">Data Dokter</span>
                    </NavLink>
                    <NavLink className={`sidebar-link ${activePage === "DataSuster" ? "active" : ""}`} to="/DataSuster" aria-expanded="false" onClick={() => handleSetActivePage("Datapasien")}>
                      <span>
                        <i className="ti ti-layout-dashboard"></i>
                      </span>
                      <span className="hide-menu">Data Suster</span>
                    </NavLink>
                    <NavLink className={`sidebar-link ${activePage === "DataAdmin" ? "active" : ""}`} to="/DataAdmin" aria-expanded="false" onClick={() => handleSetActivePage("Datapasien")}>
                      <span>
                        <i className="ti ti-layout-dashboard"></i>
                      </span>
                      <span className="hide-menu">Data Admin</span>
                    </NavLink>
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
            <div className="container-fluid">
              <body className="login"></body>
              <div>
                <button className="btn btn-primary mb-3" onClick={toggleModal}>Tambah Dokter</button>
                <div className="row">
                  <div className="col-lg-8 d-flex align-items-stretch" style={{ width: '100%' }}>
                    <div className="card w-100">
                      <div className="card-body p-4 width">
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '5vh' }}>
                          <h5 className="card-title fw-semibold" style={{ width: '15%', alignItems: 'center', display: 'flex' }}>Data Dokter</h5>
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
                                  <h6 className="fw-semibold mb-0">No</h6>
                                </th>
                                <th className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0">Nama Dokter</h6>
                                </th>
                                <th className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0">Email</h6>
                                </th>
                                <th className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0">Password</h6>
                                </th>
                                <th style={{width: '10rem'}} className="border-bottom-0">
                                  <h6 style={{maxWidth: '5rem', minWidth: '5rem'}} className="fw-semibold mb-0">Action</h6>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                            {dokters.map((dokter, index) => (
                                <tr key={dokter.kode_dok}>
                                  <td>{index + 1}</td>
                                  <td className="border-bottom-0">
                                    <p className="mb-0 fw-normal">{dokter.namaLengkap}</p>
                                  </td>
                                  <td className="border-bottom-0">
                                    <div className="d-flex align-items-center gap-2"> 
                                      <span className="fw-normal">{dokter.email}</span>
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                      <span className="fw-normal">{dokter.password}</span>
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    <button type="button" className="btn btn-success m-1">Detail</button>
                                  </td>
                                </tr>
                            ))}

                        </tbody>


                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {showModal && (
  <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block', zIndex: 1050 }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Tambah Dokter</h5>
          <button type="button" className="btn-close" onClick={toggleModal}></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="namaLengkap" className="form-label">Nama Lengkap</label>
              <input type="text" className="form-control" id="namaLengkap" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} autoFocus />
            </div>
            <div className="mb-3">
              <label htmlFor="jenisKelamin" className="form-label">Jenis Kelamin</label>
              <select className="form-select" id="jenisKelamin" name="jenisKelamin" value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
                <option value="Select">Select</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="alamatLengkap" className="form-label">Alamat Lengkap</label>
              <textarea className="form-control" id="alamatLengkap" name="alamat" rows="3" value={alamatLengkap} onChange={(e) => setAlamatLengkap(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="phone_number" className="form-label">Nomor Telepon</label>
              <input type="text" className="form-control" id="phone_number" name="no_hp" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Alamat Email</label>
              <input type="text" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="ttl" className="form-label">Tanggal Lahir</label>
              <input type="date" className="form-control" id="ttl" name="ttl" value={ttl} onChange={(e) => setTtl(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="poli" className="form-label">Poli</label>
              <input type="text" className="form-control" id="poli" name="poli" value={poli} onChange={(e) => setPoli(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password</label>
              <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Menampilkan pesan error jika ada */}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={toggleModal}>Tutup</button>
            <button type="submit" className="btn btn-primary">Tambah Dokter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
{showModal && <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>}


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

export default DataDokter;
