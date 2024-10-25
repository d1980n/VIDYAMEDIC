import React, { useState, useEffect } from "react";
import profiles from '../source/user-1.jpg';
import logo from '../source/logo.png';
import '../css/login.css';
import '../css/admindash.css';
import images from '../source/Picture1.png';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
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
  const [personList, setPersonList] = useState([]);
  const [currentRole, setCurrentRole] = useState("Dokter");
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
  


  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };



// Fungsi untuk membatalkan antrian pasien



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



const handleDelete = async (id) => {
  // Konfirmasi sebelum menghapus dengan SweetAlert
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: "Anda tidak dapat mengembalikan data yang sudah dihapus!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Lakukan penghapusan setelah konfirmasi
        const response = await fetch(`http://localhost:3000/person/delete/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('HTTP error! Status: ' + response.status);
        }

        // Tampilkan pesan sukses setelah penghapusan
        Swal.fire(
          'Terhapus!',
          'Data berhasil dihapus.',
          'success'
        ).then(() => {
          // Reload halaman setelah SweetAlert sukses
          window.location.reload();
        });

      } catch (error) {
        console.error('Error deleting person:', error);

        // Tampilkan pesan error jika gagal menghapus
        Swal.fire(
          'Gagal!',
          'Terjadi kesalahan saat menghapus data.',
          'error'
        );
      }
    }
  });
};


const fetchPersonData = async () => {
  try {
      const response = await fetch("http://localhost:3000/person");
      const data = await response.json();

      if (data.success) {
          setPersonList(data.person); // Menyimpan semua data person
      } else {
          console.error("Failed to fetch persons:", data.message);
      }
  } catch (error) {
      console.error("Error fetching persons:", error);
  }
};

// Fetch once on component mount
useEffect(() => {
  const filterDataByRole = () => {
      const filtered = personList.filter(person => person.role === currentRole);
      setFilteredList(filtered); // Menyimpan data yang sudah difilter ke state
  };
  filterDataByRole();
}, [currentRole, personList]); // Akan merender ulang ketika currentRole atau personList berubah

// Fetch data pada saat komponen dimuat
useEffect(() => {
  fetchPersonData();
}, []);

useEffect(() => {
  // Filter data by role and search query
  const filterData = () => {
      const filtered = personList
          .filter(person => person.role === currentRole)
          .filter(person => 
              person.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
              person.email.toLowerCase().includes(searchQuery.toLowerCase())
          );
      setFilteredList(filtered);
  };
  filterData();
}, [currentRole, personList, searchQuery]);

const handleInputChange = (event) => {
  setSearchQuery(event.target.value); // Update search query
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
                        <i className="ti ti-square-plus"></i>
                      </span>
                      <span className="hide-menu">Data Tenaga Kesehatan</span>
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
            
            <div className="container-fluid">
              <body className="login"></body>
              <div>

                {/* ============================================================================================================================================================ */}
                  {/* ============================================================================================================================================================ */}
                    {/* ============================================================================================================================================================ */}
                      {/* ============================================================================================================================================================ */}
                        {/* ============================================================================================================================================================ */}
                        <div className="row">
                            <div className="col-lg-8 d-flex align-items-stretch" style={{ width: "100%" }}>
                              <div className="card w-100">
                                <div className="card-body p-4 width">
                                  <div className="table-responsive">
                                    <div className="tabs d-flex mb-4 row-tabss  ">
                                      {" "}
                                      {/* Menambahkan kelas d-flex dan flex-column */}
                                      <div className="row-tabs">

                                      <div className="d-flex">
                                        {" "}
                                        {/* Mengatur kolom untuk input dan label */}
                                        <input type="radio" name="tabs" id="tabDokter" checked={currentRole === "Dokter"} onChange={() => setCurrentRole("Dokter")} />
                                        <label htmlFor="tabDokter"  style={{height:"40px",}}>Data Dokter</label>
                                      </div>
                                      <div className="d-flex">
                                        {" "}
                                        {/* Mengatur kolom untuk input dan label */}
                                        <input type="radio"  name="tabs" id="tabSuster" checked={currentRole === "Suster"} onChange={() => setCurrentRole("Suster")} />
                                        <label htmlFor="tabSuster" style={{height:"40px",}}>Data Suster</label>
                                      </div>
                                      <div className="d-flex">
                                        {" "}
                                        {/* Mengatur kolom untuk input dan label */}
                                        <input type="radio" name="tabs" id="tabAdmin" checked={currentRole === "Antrian"} onChange={() => setCurrentRole("Antrian")} />
                                        <label htmlFor="tabAdmin"  style={{height:"40px",}}>Data Admin Antrian</label>
                                      </div>

                                      </div>
                                      <div clasName="d-flex justify-content-end ms-auto tabs-suster">
                                        <button className="btn btn-primary mb-3" style={{marginRight: "0.75rem",}} onClick={toggleModal}>
                                          Tambah Suster
                                        </button>
                                      </div>
                                      {/* Konten tab yang umum */}
                                    </div>
                                    <div className="tab-content">
                                      <div style={{ display: "flex", gap: "20px", marginBottom: "5vh" }}>
                                        <h5 className="card-title fw-semibold" style={{ width: "15%", alignItems: "center", display: "flex" }}>
                                          {`Data ${currentRole}`}
                                        </h5>
                                        <input type="text" id="search-input" className="form-sels" placeholder="Masukkan nama atau email" style={{ width: "67%" }} onChange={handleInputChange} />
                                      </div>

                                      <div className="table-responsive">
                                        <table className="table text-nowrap mb-0 align-middle">
                                          <thead className="text-dark fs-4">
                                            <tr>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">No</h6>
                                              </th>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Nama {currentRole}</h6>
                                              </th>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Email</h6>
                                              </th>
                                              <th className="border-bottom-0" style={{ width: "10rem" }}>
                                                <h6 className="fw-semibold mb-0">Action</h6>
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {filteredList.length > 0 ? (
                                              filteredList.map((person, index) => (
                                                <tr key={person._id}>
                                                  <td>{index + 1}</td>
                                                  <td>{person.nama}</td>
                                                  <td>{person.email}</td>
                                                  <td>
                                                    <button type="button" className="btn btn-primary m-1" onClick={() => toggleModal(person._id)}>
                                                      Detail
                                                    </button>
                                                    <button type="button" className="btn btn-danger m-1" onClick={() => handleDelete(person._id)}>
                                                      Hapus
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))
                                            ) : (
                                              <tr>
                                                <td colSpan="4" className="text-center">
                                                  Tidak ada data untuk ditampilkan
                                                </td>
                                              </tr>
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                {/* <button className="btn btn-primary mb-3" onClick={toggleModal}>Tambah Dokter</button> */}
               
                 {/* ============================================================================================================================================================ */}
                   {/* ============================================================================================================================================================ */}
                     {/* ============================================================================================================================================================ */}
                       {/* ============================================================================================================================================================ */}
                         {/* ============================================================================================================================================================ */}
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
