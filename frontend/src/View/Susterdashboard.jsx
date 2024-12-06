import React, { useState, useEffect } from "react";
import profiles from "../source/user-1.jpg";
import logo from "../source/logo.png";
import logos from '../source/1.png'
import "../css/login.css";
import "../css/admindash.css";
import images from "../source/Picture1.png";
import { NavLink } from "react-router-dom";
import images2 from "../source/img2.png";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";



function Susterdashboard() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [daftarPasien, setDaftarPasien] = useState([]);
  const [selectedNomorMR, setSelectedNomorMR] = useState("");
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [activePage, setActivePage] = useState("");
  const [jumlahPasien, setJumlahPasien] = useState([]);
  const userEmail = useSelector((state) => state.user.nama); //
  const [clinicData, setClinicData] = useState(null);
  const [error, setError] = useState(null); 
  const location = useLocation();



  const toggleModal = (nomorMR) => {
    setShowModal(!showModal);
    setSelectedNomorMR(nomorMR);
  };

  const fetchDaftarPasien = async () => {
    try {
      const response = await fetch("http://localhost:3000/patients");
      const data = await response.json();
      console.log("response : ", response);
      if (data.success) {
        const filteredPatients = data.patients.filter((patient) => patient.antrianStatus.susterAntriStatus === true);
        console.log("filteredPatients: ", filteredPatients); // Log untuk melihat hasil filter

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
    const mergeData = () => {
      const merged = daftarPasien.map((pasien) => {
        const medicalRecord = medicalRecords.find(record => record.nomorMR === pasien.nomorMR);
        
        return { ...pasien, ...medicalRecord }; // Gabungkan data pasien dan medical record
      });
      setMergedData(merged); // Simpan hasil gabungan data
    };

    if (medicalRecords.length > 0 && daftarPasien.length > 0) {
      mergeData();
    }
  }, [medicalRecords, daftarPasien]);

  // Panggil fetchMedical saat komponen di-mount
  useEffect(() => {
    fetchMedical();
    fetchDaftarPasien();
  }, []);
  console.log("mergedData: ", mergedData); // Tambahkan log ini sebelum return JSX

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fungsi untuk menetapkan halaman aktif
  const handleSetActivePage = (page) => {
    setActivePage(page);
  };
  const [showOverlay, setShowOverlay] = useState(false);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Menampilkan konfirmasi kepada pengguna
  //     if (window.confirm("Apakah Anda sudah yakin?")) {
  //         // Data yang akan dikirim dalam format JSON
  //         const formData = {
  //             nomorMR: selectedNomorMR,
  //             TDS,   // Tekanan Darah Sistolik
  //             TDD,   // Tekanan Darah Diastolik
  //             Temperatur,
  //             Nadi,
  //             LP,    // Laju Pernafasan
  //             Spot,
  //             TB,    // Tinggi Badan
  //             BB,    // Berat Badan
  //             LILA,
  //             AVPU,
  //         };

  //         try {
  //             // Mengirimkan request POST ke server
  //             const response = await fetch('http://localhost:3000/medical/tambah', {
  //                 method: 'POST',
  //                 headers: {
  //                     'Content-Type': 'application/json',
  //                 },
  //                 body: JSON.stringify(formData),
  //             });

  //             // Menampilkan status respons di console
  //             console.log('Response Status:', response.status);
  //             const contentType = response.headers.get('content-type');

  //             if (contentType && contentType.includes('application/json')) {
  //                 const data = await response.json();  // Mendapatkan respons dalam format JSON
  //                 console.log('Response Data:', data);

  //                 // Jika data berhasil ditambahkan
  //                 if (data.success) {
  //                     setShowModal(false); // Tutup modal setelah berhasil
  //                     resetForm(); // Reset input form
  //                     setIsConfirmed(false); // Reset checkbox konfirmasi
  //                     fetchDaftarPasien();  // Refresh daftar pasien tanpa reload halaman
  //                 }
  //             } else {
  //                 const text = await response.text(); // Jika respons bukan JSON, tampilkan teks
  //                 console.error('Error: Response is not JSON. Response text:', text);
  //             }
  //         } catch (error) {
  //             // Tangkap error dan tampilkan pesan error di console
  //             console.error('Error:', error.message);
  //         }
  //     }
  // };

useEffect(() => {
  const mergeData = () => {
    const merged = daftarPasien.map((pasien) => {
      const medicalRecord = medicalRecords.find(record => record.nomorMR === pasien.nomorMR);
      return { ...pasien, ...medicalRecord }; // Gabungkan data pasien dan medical record
    });
    setMergedData(merged); // Simpan hasil gabungan data
  };

  if (medicalRecords.length > 0 && daftarPasien.length > 0) {
    mergeData();
  }
}, [medicalRecords, daftarPasien]);

const fetchMedical = async () => {
  try {
    const response = await fetch("http://localhost:3000/medical");
    const data = await response.json();
    console.log("response : ", response);

    if (data.success) {
      setMedicalRecords(data.medicalRecords); // Simpan data medical records
    } else {
      console.error("Failed to fetch patients:", data.message);
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};


// Panggil fetchMedical saat komponen di-mount
useEffect(() => {
  fetchMedical();
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
                    <NavLink className={`sidebar-link ${activePage === "Dashboard" ? "active" : ""}`} to="/Susterdashboard" aria-expanded="false" onClick={() => handleSetActivePage("Dashboard")}>
                      <span>
                        <i className="ti ti-layout-dashboard"></i>
                      </span>
                      <span className="hide-menu">Dashboard</span>
                    </NavLink>
                    <NavLink className={`sidebar-link ${activePage === "SusAntri" ? "active" : ""}`} to="/SusAntri" aria-expanded="false" onClick={() => handleSetActivePage("SusAntri")}>
                        <span>
                          <i className="ti ti-clipboard"></i>
                        </span>
                        <span className="hide-menu">Antrian</span>
                      </NavLink>
                    {/* <NavLink className={`sidebar-link ${activePage === "DataPasien" ? "active" : ""}`} to="/DataPasien" aria-expanded="false" onClick={() => handleSetActivePage("Datapasien")}>
                      <span>
                        <i className="ti ti-layout-dashboard"></i>
                      </span>
                      <span className="hide-menu">Data Pasien</span>
                    </NavLink> */}

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
                          <h4 class="fw-semibold mb-3">{clinicData.namaKlinik} </h4>

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
                      <h5 class="card-title mb-9 fw-semibold">Suster</h5>
                      <div class="row align-items-center">
                        <div class="col-8">
                          <h4 class="fw-semibold mb-3">Helo, Perawat. {userEmail}</h4>
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
export default Susterdashboard;
