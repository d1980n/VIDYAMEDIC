import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import profiles from '../source/user-1.jpg';
import logo from '../source/logo.png';
import '../css/login.css';
import '../css/admindash.css';
import images from '../source/Picture1.png';
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png';

function DataNakes() {
  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  // const [fotoKTP, setFotoKTP] = useState(null);
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [alamat, setAlamat] = useState('');
  const [no_hp, setNoHp] = useState('');
  const [tl, setTl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfPassword, setKonfPassword] = useState('');
  const [poli, setPoli] = useState('');
  const [role, setRole] = useState('');
  const [profilePict, setProfilePict] = useState('');
  const [formData, setFormData] = useState({});
  const [personList, setPersonList] = useState([]);
  const [currentRole, setCurrentRole] = useState("Dokter");
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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



// Fungsi untuk membuat kode dokter otomatis dengan awalan "D" dan 3 angka acak
// const generateKodeDokter = () => {
//   const randomNumber = Math.floor(100 + Math.random() * 900); // Menghasilkan angka acak antara 100 dan 999
//   return `D${randomNumber}`;
// };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Menyusun data form
    const formData = {
      nama,
      nik,
      jenisKelamin,
      poli,
      no_hp,
      alamat,
      role,
      email,
      password,
      tl,
    };

    // Log data untuk memeriksa
    console.log('Form Data:', formData);
  
    if (password !== konfPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Password dan konfirmasi password tidak sesuai!',
      });
      return; // Berhenti jika validasi gagal
    }

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response Data:", data);

      // Reset form setelah pengiriman berhasil
      setNama('');
      setJenisKelamin('');
      setNik('');
      setPoli('');
      setAlamat('');
      setNoHp('');
      setEmail('');
      setPassword('');
      setKonfPassword('');
      setRole('Dokter');
      setShowModal(false);
  
       // Tampilkan SweetAlert sukses dengan nama dokter
       Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Dokter ${nama} berhasil ditambahkan.`,
      });

      // Fetch data again after adding a new patient
      fetchPersonData();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // ===============================================================================================================================



  // Gunakan useEffect untuk memanggil fetchDaftarDokter saat komponen dimuat


  // ===============================================================================================================================
  


 

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };



// Fungsi untuk membatalkan antrian pasien



  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() !== "") {
        try {
          const response = await fetch(`https://api.icd11.mondofacto.com/2020-09/${searchTerm}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchData();
  }, [searchTerm]);

  const [activePage, setActivePage] = useState("");

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
    <html className="Admin">
      <link rel="stylesheet" href="https://icdcdn.azureedge.net/embeddedct/icd11ect-1.1.css"></link>
      <body>
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
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
                    <NavLink className={`sidebar-link ${activePage === "Log Out" ? "active" : ""}`} to="/" aria-expanded="false" onClick={() => handleSetActivePage("Log Out")}>
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
                                        <input type="radio" name="tabs" id="tabDokter" checked={currentRole === "Doctor"} onChange={() => setCurrentRole("Doctor")} />
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
                                          Tambah Nakes
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
                  <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Tambah User
                          </h5>
                          <button type="button" className="btn-close" onClick={toggleModal}></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="modal-body">
                            {/* Input pengukuran medis */}
                            <div className="row row-space">
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Nama</h6>
                                <input type="text" name="Nama" className="form-control" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)}/>
                              </div>
                              <div className="col-lg-6">
                                <h6 className="fw-bold">NIK</h6>
                                <input type="number" name="Nama" className="form-control" placeholder="NIK" value={nik} onChange={(e) => setNik(e.target.value)}/>
                              </div>
                            </div>

                            <div className="row row-space">
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Jenis Kelamin</h6>
                                <select className="form-select" id="jenisKelamin" value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
                                  <option value="Select">Select</option>
                                  <option value="Laki-laki">Laki-laki</option>
                                  <option value="Perempuan">Perempuan</option>
                                </select>
                              </div>
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Poli</h6>
                                <select className="form-select" id="poli" value={poli} onChange={(e) => setPoli(e.target.value)}>
                                  <option value="">Select</option>
                                  <option value="Poli Umum">Umum</option>
                                  <option value="Poli Anak">Poli Anak</option>
                                  <option value="Poli Gigi">Poli Gigi</option>
                                  <option value="Poli THT">Poli THT</option>
                                </select>
                              </div>
                            </div>

                            <div className="row row-space">
                              <div className="col-lg-6">
                                <h6 className="fw-bold">No HP</h6>
                                <input type="number" name="No Hp" className="form-control" placeholder="No Hp" value={no_hp} onChange={(e) => setNoHp(e.target.value)} />
                              </div>
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Alamat</h6>
                                <input type="text" name="Alamat" className="form-control" placeholder="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                              </div>
                            </div>

                            <div className="row row-space">
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Email</h6>
                                <input type="text" name="Alamat" className="form-control" placeholder="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                              </div>
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Role</h6>
                                <select className="form-select" id="jenisKelamin" value={role} onChange={(e) => setRole(e.target.value)}>
                                  <option value="Select">Select</option>
                                  <option value="Laki-laki">Dokter</option>
                                  <option value="Perempuan">Antrian</option>
                                  <option value="Perempuan">Suster</option>
                                </select>
                              </div>
                            </div>

                            <div className="row row-space">
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Password</h6>
                                <input type="password" name="Password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                              </div>
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Konfirmasi Password</h6>
                                <input type="password" name="konfPassword" className="form-control" placeholder="Konfrimasi Password" value={konfPassword} onChange={(e) => setKonfPassword(e.target.value)} />
                              </div>
                            </div>
                            
                            <div className="row row-space">
                              <div className="col-lg-12">
                                <h6 className="fw-bold">Profile PIcture</h6>
                                <input type="file" name="Profile PIcture" className="form-control" placeholder="Profile PIcture" value={profilePict} onChange={(e) => setProfilePict(e.target.value)} />
                              </div>
                            </div>
                          </div>

                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                              Tutup
                            </button>
                            <button type="submit" className="btn btn-primary">
                              <i className="ti ti-playlist-add"></i> Detail
                            </button>
                            {/* <button type="submit" className="btn btn-success" disabled={isConfirmed}>Masuk</button> */}
                          </div>
                        </form>


                      </div>
                    </div>
                  </div>
                )}
                {showModal && <div className="modal-backdrop fade show"></div>}
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

export default DataNakes;
