import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import profiles from '../source/user-1.jpg';
import logo from '../source/logo.png';
import logos from '../source/1.png'
import '../css/login.css';
import '../css/admindash.css';
import images from '../source/Picture1.png';
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png';

function DataNakes() {
  const [showModal, setShowModal] = useState(false);
    const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
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
  const [currentRole, setCurrentRole] = useState("Doctor");
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null); // State untuk menyimpan data person yang dipilih
  const [showDetail, setShowDetail] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  const toggleModal = () => {
    setShowModal(!showModal);
    setShowDetail(false);
    setIsEdit(false);
    setSelectedPerson(null);
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


const handleSubmit = async (e) => {
  e.preventDefault();

  // Validasi input
  if (!nama || !nik || !jenisKelamin || !poli || !no_hp || !alamat || !email) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: 'Semua field wajib diisi!',
    });
    return;
  }

  if (password !== konfPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: 'Password dan konfirmasi password tidak sesuai!',
    });
    return;
  }

  const formData = {
    nama,
    nik,
    jenisKelamin,
    poli,
    no_hp,
    alamat,
    role,
    email,
    password: password || null,
    tl: tl || null, // Null jika tidak diisi
  };

  // Log data yang akan dikirim
  console.log('Form Data:', formData);

  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: "Data yang Anda masukkan akan dikirimkan untuk diproses.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, kirim data!',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let response;

        if (selectedPerson && selectedPerson._id ) {
          // Log data untuk update
            console.log('Selected Person:', selectedPerson);
            console.log('Updating person with ID:', selectedPerson._id);
            console.log('Sending Data to Backend:', formData);

          console.log('result : ',result )

          response = await fetch(`http://localhost:3000/person/update/${selectedPerson._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        } else {
          // Log data untuk penambahan
          console.log('Creating new person...');
          console.log('Sending Data to Backend:', formData);

          response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        }

        const responseBody = await response.text(); // Mengambil respons sebagai teks
        console.log('Raw Response:', responseBody);
        
        if (!response.ok) {
          throw new Error(responseBody.message || 'Gagal mengirim data ke server.');
        }
        
        try {
          const parsedResponse = JSON.parse(responseBody); // Try parsing as JSON
          console.log('Parsed Response:', parsedResponse);
        } catch (error) {
          console.error('Error parsing response:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error processing the response from the server.',
          });
        }
        // Log response dari server
        console.log('Response Status:', response.status);
        // console.log('Response Body:', responseBody);


        // Reset form setelah berhasil
        setNama('');
        setJenisKelamin('');
        setNik('');
        setPoli('');
        setAlamat('');
        setNoHp('');
        setEmail('');
        setPassword('');
        setKonfPassword('');
        setRole('');
        setShowModal(false);
        setIsEdit(false);
        setSelectedPerson(null);

        Swal.fire({
          icon: 'success',
          title: selectedPerson ? 'Berhasil Diperbarui!' : 'Berhasil Ditambahkan!',
          text: `${role} ${nama} ${selectedPerson ? 'berhasil diperbarui.' : 'berhasil ditambahkan.'}`,
        });

        // Refresh data
        fetchPersonData();
      } catch (error) {
        console.error('Error in handleSubmit:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: `Terjadi kesalahan: ${error.message}`,
        });
      }
    } else {
      console.log('Submission cancelled by user.');
      Swal.fire({
        icon: 'info',
        title: 'Dibatalkan',
        text: 'Pengiriman data dibatalkan.',
      });
    }
  });
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


  const toggleModalDua = (id) => {
    const personDetail = personList.find((person) => person._id === id);
    console.log('Selected Person Detail:', personDetail); // Log person detail
    setSelectedPerson(personDetail);
    setShowDetail(true);
  };
  
  

  // Fungsi untuk menutup modal
  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedPerson(null);
  };

  

  const handleEdit = () => {
    // Mengisi nilai form dengan data dari selectedPerson
    setNama(selectedPerson.nama);
    setNik(selectedPerson.nik);
    setJenisKelamin(selectedPerson.jenisKelamin);
    setPoli(selectedPerson.poli);
    setNoHp(selectedPerson.no_hp);
    setAlamat(selectedPerson.alamat);
    setEmail(selectedPerson.email);
    setRole(selectedPerson.role);
    setPassword(''); // Tidak perlu mengisi password saat edit
    setKonfPassword(''); // Tidak perlu mengisi konfirmasi password saat edit
    setShowModal(true); // Tampilkan modal untuk edit
    setIsEdit(true);
    setShowDetail(false);
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
                  <img src={logos} width="180" alt="" />
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
                                                    <button type="button" className="btn btn-primary m-1" onClick={() => toggleModalDua(person._id)}>
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
                 {/* Modal for showing details */}
      {showDetail && selectedPerson && (
        <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {`Detail ${currentRole}`}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseDetail}></button>
              </div>
              <div className="modal-body">
                <div className="row row-space">
                  <div className="col-lg-6">
                    <h6 className="fw-bold">Nama</h6>
                    <p>{selectedPerson.nama}</p>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="fw-bold">NIK</h6>
                    <p>{selectedPerson.nik}</p>
                  </div>
                </div>

                <div className="row row-space">
                  <div className="col-lg-6">
                    <h6 className="fw-bold">Jenis Kelamin</h6>
                    <p>{selectedPerson.jenisKelamin}</p>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="fw-bold">Poli</h6>
                    <p>{selectedPerson.poli}</p>
                  </div>
                </div>

                <div className="row row-space">
                  <div className="col-lg-6">
                    <h6 className="fw-bold">No HP</h6>
                    <p>{selectedPerson.no_hp}</p>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="fw-bold">Alamat</h6>
                    <p>{selectedPerson.alamat}</p>
                  </div>
                </div>

                <div className="row row-space">
                  <div className="col-lg-6">
                    <h6 className="fw-bold">Email</h6>
                    <p>{selectedPerson.email}</p>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="fw-bold">Role</h6>
                    <p>{selectedPerson.role}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseDetail}>
                  Tutup
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEdit}>
                    <i className="ti ti-playlist-add"></i> Edit
                  </button>

              </div>
            </div>
          </div>
        </div>
      )}
      {showDetail && <div className="modal-backdrop fade show"></div>}         
                
                
                {showModal && (
                  <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            {isEdit ? "Edit User" : "Tambah User"}
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
                                <input type="text" name="Email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                              </div>
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Role</h6>
                                <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                  <option value="Select">Select</option>
                                  <option value="Doctor">Doctor</option>
                                  <option value="Antrian">Antrian</option>
                                  <option value="Suster">Suster</option>
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
                                <h6 className="fw-bold">Profile Picture</h6>
                                <input type="file" name="Profile PIcture" className="form-control" placeholder="Profile PIcture" value={profilePict} onChange={(e) => setProfilePict(e.target.value)} />
                              </div>
                            </div>
                          </div>

                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                              Tutup
                            </button>
                            <button type="submit" className="btn btn-primary">
                              <i className="ti ti-playlist-add"></i> Simpan
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
