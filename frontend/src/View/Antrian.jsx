import React, { useState, useEffect } from "react";
import profiles from '../source/user-1.jpg';
import logo from '../source/logo.png';
import '../css/login.css';
import '../css/admindash.css';
import images from '../source/Picture1.png';
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png';
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';


function Antrian() {
  const [showModal, setShowModal] = useState(false);
  const [nomorAntrian, setNomorAntrian] = useState(1); // Nomor antrian awal
  const [namaLengkap, setNamaLengkap] = useState('');
  // const [fotoKTP, setFotoKTP] = useState(null);
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [alamatLengkap, setAlamatLengkap] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [daftarPasien, setDaftarPasien] = useState([]);
  const [formData, setFormData] = useState({});
  const [antrianStatus, setAntrianStatus] = useState(false);
  const [nomorMR, setnomorMR] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const clientId = query.get('id'); 
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState(null); 
  const [jumlahPasien, setJumlahPasien] = useState([]);
  const [pasienSus, setPasienSus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;
  const [soundQueue, setSoundQueue] = useState([
    { id: '0', name: '0', file: '0.mp3' },
    { id: '1', name: '1', file: '1.mp3' },
    { id: '2', name: '2', file: '2.mp3' },
    { id: '3', name: '3', file: '3.mp3' },
    { id: '4', name: '4', file: '4.mp3' },
    { id: '5', name: '5', file: '5.mp3' },
    { id: '6', name: '6', file: '6.mp3' },
    { id: '7', name: '7', file: '7.mp3' },
    { id: '8', name: '8', file: '8.mp3' },
    { id: '9', name: '9', file: '9.mp3' }
  ]);
  const [loading, setLoading] = useState(false);


  const handleCancelation = (message, index, nomorMR, namaLengkap) => {
    console.log('handleCancelation called');
    Swal.fire({
      title: 'Batal Antrian',
      text: `Apakah anda ingin membatalkan antrian dengan nama ${namaLengkap}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelPasien(index, nomorMR); // Jalankan fungsi saat user mengonfirmasi "Iya"
        Swal.fire(
          'Terkonfirmasi!',
          'Berhasil membatalkan antrian',
          'success'
        );
      }
    });
  };
  
  const handleValidation = (message, index, nomorMR, namaLengkap) => {
    Swal.fire({
      title: 'Pasien Masuk',
      text: `Apakah pasien dengan nama ${namaLengkap} sudah masuk?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        susterAntri(index, nomorMR); // Jalankan fungsi saat user mengonfirmasi "Iya"
        Swal.fire(
          'Terkonfirmasi!',
          `Pasien dengan nama ${namaLengkap} telah masuk.`,
          'success'
        );
      }
    });
  };

   const panggilStatus = async (index, nomorMR, namaLengkap, sound) => {
    Swal.fire({
      title: 'Panggil Pasien',
      text: `Apakah ingin memanggil pasien dengan nomor urut ${index + 1}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true); // Start loading

        try {
          const response = await fetch('/panggilStatus', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nomorMR }), // Send nomorMR to backend
          });

          const resultApi = await response.json();

          if (response.ok) {
            Swal.fire(
              'Terkonfirmasi!',
              `Pasien dengan nama ${namaLengkap} telah dipanggil.`,
              'success'
            );
            sendSoundIdToTarget(sound); // Execute sound logic here
          } else {
            Swal.fire('Gagal!', resultApi.message, 'error');
          }
        } catch (error) {
          Swal.fire('Terjadi kesalahan!', 'Silakan coba lagi.', 'error');
        } finally {
          setLoading(false); // End loading
        }
      }
    });
  };

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
      namaLengkap,
      jenisKelamin,
      alamatLengkap,
      email,
      phone_number,
    };
  
    // Show SweetAlert with the user's input data for confirmation
    Swal.fire({
      title: 'Konfirmasi Data Pasien',
      html: `
    
   
     
      <div className="" style="display: flex; justify-content:center; width:100%;  ">
     <div className="" style="display:flex; margin-left: 0px; padding-left:0px; justify-content:start; width:80%;">
       <p style= "min-width:9rem; display:flex; justify-item:start; max-width:8rem;"><strong>Nama Lengkap</strong></p>
       <p style= "min-width:2rem; max-width:2rem;"><strong>:</strong></p>
       
       <p style= "min-width: 14rem; justify-content:start; display:flex; max-width: 14rem;"> ${namaLengkap}</p>
     </div>
     </div>
      <div className="" style="display: flex; justify-content:center; width:100%;  ">
     <div className="" style="display:flex; margin-left: 0px; padding-left:0px; justify-content:start; width:80%;">
       <p style= "min-width:9rem; display:flex; justify-item:start; max-width:8rem;"><strong>Jenis Kelamin</strong></p>
       <p style= "min-width:2rem; max-width:2rem;"><strong>:</strong></p>
       
       <p style= "min-width: 14rem; justify-content:start; display:flex;  max-width: 14rem;"> ${jenisKelamin}</p>
     </div>
     </div>
      <div className="" style="display: flex; justify-content:center; width:100%;  ">
     <div className="" style="display:flex; margin-left: 0px; padding-left:0px; justify-content:start; width:80%;">
       <p style= "min-width:9rem; display:flex; justify-item:start; max-width:8rem;"><strong>Alamat</strong></p>
       <p style= "min-width:2rem; max-width:2rem;"><strong>:</strong></p>
       
       <p style= "min-width: 14rem; justify-content:start; display:flex; max-width: 14rem;"> ${alamatLengkap}</p>
     </div>
     </div>
     <div className="" style="display: flex; justify-content:center; width:100%;  ">
     <div className="" style="display:flex; margin-left: 0px; padding-left:0px; justify-content:start; width:80%;">
       <p style= "min-width:9rem; display:flex; justify-item:start; max-width:8rem;"><strong>Nomor Telepon</strong></p>
       <p style= "min-width:2rem; max-width:2rem;"><strong>:</strong></p>
       
       <p style= "min-width: 14rem; justify-content:start; display:flex; max-width: 14rem;"> ${phone_number}</p>
     </div>
     </div>
     <div className="" style="display: flex; justify-content:center; width:100%;  ">
     <div className="" style="display:flex; margin-left: 0px; padding-left:0px; justify-content:start; width:80%;">
       <p style= "min-width:9rem; display:flex; justify-item:start; max-width:8rem;"><strong>Email</strong></p>
       <p style= "min-width:2rem; max-width:2rem;"><strong>:</strong></p>
       
       <p style= "min-width: 14rem; justify-content:start; display:flex; max-width: 14rem;"> ${email}</p>
     </div>
     </div>

  
    
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send form data to the backend after confirmation
          const response = await fetch('http://localhost:3000/patients/tambah', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
  
          const data = await response.json();
          console.log('Response Data:', data);
  
          // Reset form after successful submission
          setNomorAntrian(nomorAntrian + 1);
          setNamaLengkap('');
          setJenisKelamin('');
          setAlamatLengkap('');
          setPhoneNumber('');
          setEmail('');
          setShowModal(false);
  
          // Fetch data again after adding a new patient
          fetchDaftarPasien();
  
          // Show success alert
          Swal.fire(
            'Berhasil!',
            'Data pasien berhasil disimpan.',
            'success'
          );
        } catch (error) {
          console.error('Error:', error.message);
  
          // Show error alert
          Swal.fire(
            'Gagal!',
            'Terjadi kesalahan saat menyimpan data pasien.',
            'error'
          );
        }
      }
    });
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
            
            // filter pasien yang ada di suster
            const susPasien = data.patients.filter((patient) => patient.antrianStatus.susterAntriStatus === true);
            
            // Menghitung jumlah pasien yang sesuai dengan filter
            const jumlahPasien = filteredPatients.length;
            const pasienSus = susPasien.length;
            console.log("Jumlah pasien yang sesuai:", jumlahPasien);
    
            // Mengatur daftar pasien dan jumlah pasien ke dalam state
            setDaftarPasien(filteredPatients);
            setJumlahPasien(jumlahPasien); // jumlah pasien di antrian
            setPasienSus(pasienSus); // jumlah pasien di suster
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

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchP, setSearchP] = useState('');

  const handleInputChange = async (e) => {
    const searchP = e.target.value;
    setSearchP(searchP); // Update searchP state

    // Jangan lakukan pencarian jika input kosong
    if (!searchP.trim()) {
      setTargetPasien([]); // Kosongkan hasil pencarian
      return;
    }

    try {
      // Pencarian berdasarkan nomor MR
      const response = await fetch(`http://localhost:3000/patients/search?term=${searchP}`);
      const data = await response.json();

      if (response.ok && data.patients.length > 0) {
        setTargetPasien(data.patients); // Menyimpan array pasien yang cocok ke state
      } else {
        setTargetPasien([]); // Jika tidak ada pasien, kosongkan state
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      setTargetPasien([]); // Kosongkan state jika ada error
    }
  };

  const handlePatientClick = (pasien) => {
    setSelectedPatient(pasien); // Simpan pasien yang diklik ke state
    setSearchP(pasien.namaLengkap); // Update input dengan nama pasien yang diklik
    setTargetPasien([]); // Kosongkan hasil pencarian setelah pasien dipilih
  };

  const updateAntrianStatus = async () => {
    console.log(selectedPatient); // Gunakan selectedPatient di sini
  
    // Pastikan selectedPatient sudah dipilih
    if (selectedPatient) {
      try {
        const response = await fetch(`http://localhost:3000/patients/update/${selectedPatient.nomorMR}`, {
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
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = daftarPasien.slice(indexOfFirstPatient, indexOfLastPatient);



  const nextPage = () => {
    if (currentPage < Math.ceil(daftarPasien.length / patientsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const popup = document.querySelector('.popup');
      if (popup && !popup.contains(event.target)) {
        setTargetPasien([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // useEffect(() => {
  //   const fetchClientData = async () => {
  //     // Jika clientId tidak ada, set error dan keluar
  //     if (!clientId) {
  //       setError('Client ID tidak ditemukan');
  //       return;
  //     }

  //     try {
  //       const response = await fetch(`http://localhost:3008/api/data/${clientId}`);
  //       if (!response.ok) {
  //         throw new Error('Gagal mengambil data klien');
  //       }
  //       const data = await response.json();
  //       setClientData(data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchClientData();
  // }, [clientId]); // Dependency array untuk memicu fetch saat clientId berubah

  // // Cek error
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // // Cek apakah data klien sudah ada
  // if (!clientData) {
  //   return <div>Loading...</div>;
  // }

  
  const sendSoundIdToTarget = (sound) => {
    // Mengirimkan ID dan file suara ke API
    fetch('http://localhost:3000/api/antrian', { // ganti URL dengan URL API kamu
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: sound.id,
        sound: sound.file
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('ID dan sound berhasil dikirim:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
                {/* {clientData.image ? (
        <img src={`http://localhost:3008/${clientData.image}`} alt={clientData.nama} />
      ) : (
        <div>Image not found</div>
      )} */}
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
                    <NavLink 
                      className={`sidebar-link ${activePage === 'Dashboard' ? 'active' : ''}`} 
                      to="/Antrian" 
                      aria-expanded="false" 
                      onClick={() => handleSetActivePage('Dashboard')}
                    >
                      <span><i className="ti ti-layout-dashboard"></i></span>
                      <span className="hide-menu">Dashboard</span>
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
                    <h5 class="card-title mb-9 fw-semibold text-center">Jumlah Antrian Suster: </h5>
                    <h1 class="mb-9 fw-semibold text-center">{pasienSus}</h1> {/* Menampilkan jumlah pasien suster */}
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

              <div>
                <button className="btn btn-primary mb-3" onClick={toggleModal}>Tambah Pasien</button>
                <div className="row">
                  <div className="col-lg-8 d-flex align-items-stretch" style={{ width: '100%' }}>
                    <div className="card w-100">
                      <div className="card-body p-4 width">
                      <div className="AntrianBox  ">
      <h5 className="card-title fw-semibold" style={{ width: '15%', alignItems: 'center', display: 'flex' }}>
        Antrian Pasien
      </h5>
        <input
          type="text"
          id="search-input"
          className="form-sels"
          placeholder="Masukkan nama pasien"
          style={{ width: '67%' }}
          onChange={handleInputChange} // Memanggil fungsi pencarian saat pengguna mengetik
          value={searchP} // Set nilai input sesuai searchP
        />
        
        <div className="popup">

        {searchP && Array.isArray(targetPasien) && targetPasien.length > 0 && (
          <div className="flex">
            {targetPasien.map((pasien, index) => (
              <div key={index} className="search_list" onClick={() => handlePatientClick(pasien)}>
                <p>Nama: {pasien.namaLengkap}</p>
                <p>Nomor MR: {pasien.nomorMR}</p>
                <p>Nomor Telepon: {pasien.phone_number}</p>
              </div>
            ))}
          </div>
        )}
        </div>
      {/* Tampilkan hasil pencarian hanya jika searchP tidak kosong */}
      <button
        type="button"
        className="btn btn-secondary m-1"
        onClick={updateAntrianStatus} // Memanggil fungsi update status saat tombol ditekan
        disabled={!selectedPatient} // Disable tombol jika pasien belum dipilih
      >
       Antri
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
                                  <h6 className="fw-semibold mb-0">Nama Pasien</h6>
                                </th>
                                <th className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0">Nomor MR</h6>
                                </th>
                                <th style={{width: '10rem'}} className="border-bottom-0">
                                  <h6 style={{maxWidth: '5rem', minWidth: '5rem'}} className="fw-semibold mb-0">Action</h6>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                            {currentPatients.map((pasien, index) => (
    <tr key={pasien.nomorMR}>
      <td>{index + 1}</td>
      <td className="border-bottom-0">
        <p className="mb-0 fw-normal">{pasien.namaLengkap}</p>
      </td>
      <td className="border-bottom-0">
        <div className="d-flex align-items-center gap-2">
          <span className="fw-normal">{pasien.nomorMR}</span>
        </div>
      </td>
      <td className="border-bottom-0">
        <button type="button" className="btn btn-primary m-1" onClick={() => handleValidation('Pasien Masuk', index, pasien.nomorMR, pasien.namaLengkap)}>
          Masuk
        </button>
        <button type="button" className="btn btn-danger m-1" onClick={() => handleCancelation('Batal Antrian', index, pasien.nomorMR, pasien.namaLengkap)}>
          Batal
        </button>

        {/* Display 'Panggil' button if the patient's sound is available */}
        {soundQueue[index] && (
        <button
          type="button"
          className="btn btn-success m-1"
          onClick={() => panggilStatus(index, pasien.nomorMR, pasien.namaLengkap, soundQueue[index + 1])}
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Memanggil...' : 'Panggil'}
        </button>
      )}
      </td>
    </tr>
  ))}

                        </tbody>


                          </table>
                          <div className="pagination-controls mt-3">
                  <button className="btn btn-secondary mx-2" onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <button className="btn btn-secondary" onClick={nextPage} disabled={currentPage === Math.ceil(daftarPasien.length / patientsPerPage)}>
                    Next
                  </button>
</div>
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
                          <h5 className="modal-title" id="exampleModalLabel">Tambah Pasien</h5>
                          <button type="button" className="btn-close" onClick={toggleModal}></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="modal-body">
                            <div className="mb-3">
                              <label htmlFor="namaLengkap" className="form-label">Nama Lengkap</label>
                              <input type="text" className="form-control" id="namaLengkap" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} />
                            </div>
                            {/* <div className="mb-3">
                              <label htmlFor="fotoKTP" className="form-label">Foto KTP</label>
                              <input type="file" className="form-control" id="fotoKTP" onChange={(e) => setFotoKTP(e.target.files[0])} />
                            </div> */}
                            <div className="mb-3">
                              <label htmlFor="jenisKelamin" className="form-label">Jenis Kelamin</label>
                              <select className="form-select" id="jenisKelamin" value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
                              <option value="Select">Select</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="alamatLengkap" className="form-label">Alamat Lengkap</label>
                              <textarea className="form-control" id="alamatLengkap" rows="3" value={alamatLengkap} onChange={(e) => setAlamatLengkap(e.target.value)}></textarea>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="phone_number" className="form-label">Nomor Telepon</label>
                              <input type="text" className="form-control" id="phone_number" onChange={(e) => setPhoneNumber(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">Alamat Email</label>
                              <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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

export default Antrian;
