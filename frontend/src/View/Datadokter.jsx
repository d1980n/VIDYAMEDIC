import React, { useState, useEffect } from "react";
import profiles from '../source/user-1.jpg';
import logo from '../source/logo.png';
import '../css/login.css';
import '../css/admindash.css';
import images from '../source/Picture1.png';
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png';

function DataDokter() {
  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  // const [fotoKTP, setFotoKTP] = useState(null);
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [alamat, setAlamat] = useState('');
  const [no_hp, setNoHp] = useState('');
  const [tl, setTl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfpassword, setKonfPassword] = useState('');
  const [role, setRole] = useState('');
  const [daftarPasien, setDaftarPasien] = useState([]);
  const [formData, setFormData] = useState({});
  const [dokterList, setDokterList] = useState([]);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Menyusun data form
    const formData = {
      nama,
      jenisKelamin,
      nik,
      role,
      alamat,
      email,
      password,
      role: 'Dokter',
      no_hp,
      tl,

    };
  
    // Log data untuk memeriksa
    console.log('Form Data:', formData);
  


    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
  
      const data = await response.json();
      console.log('Response Data:', data);
  
      // Reset form setelah pengiriman berhasil
      setNama('');
      setJenisKelamin('');
      setAlamat('');
      setNoHp('');
      setEmail('');
      setPassword('');
      setKonfPassword('');
      setRole('Dokter');
      setShowModal(false);
  
      // Fetch data again after adding a new patient
      fetchDaftarPasien();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const fetchDaftarPasien = async () => {
    try {
        const response = await fetch('http://localhost:3000/patients');
        const data = await response.json();

        if (response.ok) { // Check if the response is successful
            const filteredPatients = data.patients.filter(patient => 
                patient.antrianStatus && 
                patient.antrianStatus.status === true && 
                patient.is_active !== true // Exclude patients with is_active = true
            );
            setDaftarPasien(filteredPatients); // Save the filtered patients to state
        } else {
            console.error('Failed to fetch patients:', data.message);
        }
    } catch (error) {
        console.error('Error fetching patients:', error);
        // Handle error appropriately, e.g., displaying an error message to the user
    }
};
  
  useEffect(() => {
    fetchDaftarPasien();
  }, []);

  // ===============================================================================================================================
  
  const [targetPasien, setTargetPasien] = useState(null); // State untuk menyimpan pasien yang dicari

  const handleInputChange = async (e) => {
    const searchTerm = e.target.value;
  
    if (searchTerm) {
      try {
        // Pencarian berdasarkan nomor MR
        const response = await fetch(`http://localhost:3000/patients/search?term=${searchTerm}`);
        const data = await response.json();
  
        if (response.ok && data.patients.length > 0) {
          setTargetPasien(data.patients[0]); // Menyimpan pasien yang cocok ke state
        } else {
          setTargetPasien(null); // Jika tidak ada pasien, kosongkan state
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
        setTargetPasien(null);
      }
    } else {
      setTargetPasien(null); // Jika search field kosong, hapus target
    }
  };

  const updateAntrianStatus = async () => {
    console.log(targetPasien);
    if (targetPasien) {
        try {
            const response = await fetch(`http://localhost:3000/patients/${targetPasien.nomorMR}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ antrianStatus: { status: true } }), // Sesuai dengan backend
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Status antrian berhasil diperbarui:', data);
                window.location.reload(); 
            } else {
                console.error('Error updating antrian status:', data.message);
            }
        } catch (error) {
            console.error('Error updating antrian status:', error);
        }
    } else {
        console.log('Pasien tidak ditemukan');
    }
};

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };



// Fungsi untuk membatalkan antrian pasien
const cancelPasien = async (index, nomorMR) => {
  const newDaftarPasien = [...daftarPasien];
  newDaftarPasien.splice(index, 1);
  setDaftarPasien(newDaftarPasien);
  
  try {
      const response = await fetch(`http://localhost:3000/patients/cancelAntrian`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nomorMR }),
      });

      const data = await response.json();
      
      if (!response.ok) {
          throw new Error(data.message || 'Gagal membatalkan antrian pasien');
      }
      else{
        window.location.reload(); 
      }

      console.log('Antrian dibatalkan:', data);
  } catch (error) {
      console.error('Error:', error.message);
  }
};

// Fungsi untuk memperbarui status antrian suster
const susterAntri = async (index, nomorMR) => {
  const newDaftarPasien = [...daftarPasien];
  newDaftarPasien.splice(index, 1); // Menghapus pasien dari daftar
  setDaftarPasien(newDaftarPasien);

  try {
      const response = await fetch(`http://localhost:3000/patients/susterAntri`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nomorMR }), // Mengirim nomorMR ke backend
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Gagal memperbarui status antrian suster');
      }
      else{
        window.location.reload(); 
      }

      console.log('Status antrian suster berhasil diperbarui:', data);
  } catch (error) {
      console.error('Error:', error.message);
  }
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

  const handleSetActivePage = (page) => {
    setActivePage(page);
  };

  const [showOverlay, setShowOverlay] = useState(false);


  const fetchDaftarDokter = async () => {
    try {
        const response = await fetch("http://localhost:3000/person");
        const data = await response.json();
        console.log("response : ", response);
        console.log("data dokter: ", data.person); // Menampilkan data dokter yang diterima

        if (data.success) {
            // Memfilter dokter berdasarkan role "Dokter"
            const filteredDokter = data.person.filter((person) => person.role === 'Dokter');
            setDokterList(filteredDokter); // Mungkin perlu diubah menjadi setDokterList jika variabelnya berbeda
        } else {
            console.error("Failed to fetch dokter:", data.message);
        }
    } catch (error) {
        console.error("Error fetching dokter:", error);
        // Tangani kesalahan dengan baik, misalnya menampilkan pesan kesalahan kepada pengguna
    }
};

// Gunakan useEffect untuk memanggil fetchDaftarDokter saat komponen dimuat
useEffect(() => {
    fetchDaftarDokter();
}, []);


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
                        <i className="ti ti-square-plus"></i>
                      </span>
                      <span className="hide-menu">Data Dokter</span>
                    </NavLink>
                    <NavLink className={`sidebar-link ${activePage === "DataSuster" ? "active" : ""}`} to="/DataSuster" aria-expanded="false" onClick={() => handleSetActivePage("Datapasien")}>
                      <span>
                        <i className="ti ti-nurse"></i>
                      </span>
                      <span className="hide-menu">Data Suster</span>
                    </NavLink>
                    <NavLink className={`sidebar-link ${activePage === "DataAdmin" ? "active" : ""}`} to="/DataAdmin" aria-expanded="false" onClick={() => handleSetActivePage("Datapasien")}>
                      <span>
                        <i className="ti ti-accessible"></i>
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
                                onChange={handleInputChange} 
                                // Memanggil fungsi pencarian saat pengguna mengetik
                              />
                              {targetPasien && (
                                <div className="patient-info">
                                  <p>Nama: {targetPasien.namaLengkap}</p>
                                  <p>Nomor MR: {targetPasien.nomorMR}</p>
                                  <p>Nomor Telepon: {targetPasien.phone_number}</p>
                               
                                </div>
                              )} 
                              <button 
                                type="button" 
                                className="btn btn-secondary m-1" 
                                onClick={updateAntrianStatus} // Memanggil fungsi update status saat tombol ditekan
                                disabled={!targetPasien} // Disable tombol jika pasien tidak ditemukan
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
                                <th style={{width: '10rem'}} className="border-bottom-0">
                                  <h6 style={{maxWidth: '5rem', minWidth: '5rem'}} className="fw-semibold mb-0">Action</h6>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                    {dokterList.length > 0 ? (
                        dokterList.map((dokter, index) => (
                            <tr key={dokter._id}>
                                <td>{index + 1}</td>
                                <td>{dokter.nama}</td>
                                <td>{dokter.email}</td>
                                <td>
                                    <button type="button" className="btn btn-primary">Detail</button>
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

                {showModal && (
                  <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Tambah Dokter</h5>
                          <button type="button" className="btn-close" onClick={toggleModal}></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="nama" className="form-label">Nama Lengkap</label>
                                    <input type="text" className="form-control" id="nama" value={nama} onChange={(e) => setNama(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nik" className="form-label">NIK</label>
                                    <input type="text" className="form-control" id="nik" value={nik} onChange={(e) => setNik(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="jenisKelamin" className="form-label">Jenis Kelamin</label>
                                    <select className="form-select" id="jenisKelamin" value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="no_hp" className="form-label">Nomor Telepon</label>
                                    <input type="text" className="form-control" id="no_hp" value={no_hp} onChange={(e) => setNoHp(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="alamat" className="form-label">Alamat Lengkap</label>
                                    <textarea className="form-control" id="alamat" rows="3" value={alamat} onChange={(e) => setAlamat(e.target.value)}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tl" className="form-label">Tanggal Lahir</label>
                                    <input type="date" className="form-control" id="tl" value={tl} onChange={(e) => setTl(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Alamat Email</label>
                                    <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Tutup</button>
                                <button type="submit" className="btn btn-primary">Simpan</button>
                            </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                {showModal && <div className="modal-backdrop fade show">
                  </div>}
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
