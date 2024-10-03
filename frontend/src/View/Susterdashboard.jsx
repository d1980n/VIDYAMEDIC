import React, { useState, useEffect } from "react";
import profiles from "../source/user-1.jpg";
import logo from "../source/logo.png";
import "../css/login.css";
import "../css/admindash.css";
import images from "../source/Picture1.png";
import { NavLink } from "react-router-dom";
import images2 from "../source/img2.png";
function Susterdashboard() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [TDS, setTekananDarahSistolik] = useState('');
  const [TDD, setTekanandarahDiastolik] = useState('');
  const [Temperatur, setTemperatur] = useState('');
  const [Nadi, setNadi] = useState('');
  const [LP, setLajuPernafasan] = useState('');
  const [Spot, setSpot] = useState('');
  const [TB, setTinggiBadan] = useState('');
  const [BB, setBeratBadan] = useState('');
  const [LILA, setLILA] = useState('');
  const [AVPU, setAVPU] = useState('');
  const [daftarPasien, setDaftarPasien] = useState([]);
  const [selectedNomorMR, setSelectedNomorMR] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false); // State untuk konfirmasi

  const toggleModal = (nomorMR) => {
    setShowModal(!showModal);
    setSelectedNomorMR(nomorMR); 
  };
  
  const fetchDaftarPasien = async () => {
    try {
      const response = await fetch("http://localhost:3000/patients");
      const data = await response.json();
      console.log("response : ", response);
      console.log("data pasien: ", data.patients);
      if (data.success) {
        const filteredPatients = data.patients.filter((patient) => patient.antrianStatus.susterAntriStatus === true);
        setDaftarPasien(filteredPatients);
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
  
  const resetForm = () => {
    setTekananDarahSistolik('');
    setTekanandarahDiastolik('');
    setTemperatur('');
    setNadi('');
    setLajuPernafasan('');
    setSpot('');
    setTinggiBadan('');
    setBeratBadan('');
    setLILA('');
    setAVPU('');
  };
  
  const isFormEmpty = () => {
    return (
      !TDS &&
      !TDD &&
      !Temperatur &&
      !Nadi &&
      !LP &&
      !Spot &&
      !TB &&
      !BB &&
      !LILA &&
      !AVPU
    );
  };
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [activePage, setActivePage] = useState("");
  
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

const handleSubmit = async (e) => {
  e.preventDefault();

  // Remove the window.confirm line
  const formData = {
      nomorMR: selectedNomorMR,
      TDS,
      TDD,
      Temperatur,
      Nadi,
      LP,
      Spot,
      TB,
      BB,
      LILA,
      AVPU,
  };

  try {
      const response = await fetch('http://localhost:3000/medical/tambah', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      console.log('Response Status:', response.status); 
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Response Data:', data);
          
          // Reset form dan refresh daftar pasien setelah berhasil
    
              setShowModal(false); // Tutup modal setelah sukses
              resetForm(); // Reset input
              fetchDaftarPasien();  
              console.log('well');  
           
      } else {
          const text = await response.text(); 
          console.error('Error: Response is not JSON. Response text:', text);
      }
  } catch (error) {
      console.error('Error:', error.message);
  }
};
  
  
  
  
  const handleTambahMRClick = () => {
    setIsModalVisible(true);
  };
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
                    <NavLink className={`sidebar-link ${activePage === "Dashboard" ? "active" : ""}`} to="/Susterdashboard" aria-expanded="false" onClick={() => handleSetActivePage("Dashboard")}>
                      <span>
                        <i className="ti ti-layout-dashboard"></i>
                      </span>
                      <span className="hide-menu">Dashboard</span>
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
                      <h5 class="card-title mb-9 fw-semibold">Suster</h5>
                      <div class="row align-items-center">
                        <div class="col-8">
                          <h4 class="fw-semibold mb-3">Helo, Perawat. Sarah Namban</h4>
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
              <div class="row">
                <div class="col-lg-8 d-flex align-items-stretch" style={{ width: "100%" }}>
                  <div class="card w-100">
                    <div class="card-body p-4 width">
                      <h5 class="card-title fw-semibold mb-4">Antrian Pasien</h5>
                      <div class="table-responsive">
                        <table class="table text-nowrap mb-0 align-middle">
                          <thead class="text-dark fs-4">
                            <tr>
                              <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">No</h6>
                              </th>

                              <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Nama Pasien</h6>
                              </th>
                              <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Nomor MR</h6>
                              </th>
                              <th style={{width: '18rem'}} class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Action</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {daftarPasien.map((pasien, index) => (
                              <tr key={pasien.nomorMR}>
                                <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0">{index + 1}</h6>
                                </td>
                                <td class="border-bottom-0">
                                  <p class="mb-0 fw-normal">{pasien.namaLengkap}</p>
                                </td>
                                <td class="border-bottom-0">
                                  <div class="d-flex align-items-center gap-2">
                                    <span class="fw-normal">{pasien.nomorMR}</span>
                                  </div>
                                </td>
                                <td class="border-bottom-0">
                                <button type="button" className="btn btn-primary m-1" onClick={() => toggleModal(pasien.nomorMR)}>
                                    Periksa
                                  </button>
                                  <button type="button" className="btn btn-danger m-1">
                                    Batal
                                  </button>
                                 
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {showModal && (
                        <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Tambah Pengukuran Medis</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                              </div>
                              <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                  {/* Input pengukuran medis */}
                                  <div className="row" style={{ padding: '0px' }}>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Tekanan Darah Sistolik</h6>
                                      <input type="text" name="TDS" className="form-control" placeholder="mmHg" value={TDS} onChange={(e) => setTekananDarahSistolik(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Tekanan Darah Diastolik</h6>
                                      <input type="text" name="TDD" className="form-control" placeholder="mmHg" value={TDD} onChange={(e) => setTekanandarahDiastolik(e.target.value)} />
                                    </div>
                                  </div>

                                  <div className="row" style={{ padding: '0px' }}>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Temperatur</h6>
                                      <input type="text" name="Temperatur" className="form-control" placeholder="C" value={Temperatur} onChange={(e) => setTemperatur(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Nadi</h6>
                                      <input type="text" name="Nadi" className="form-control" placeholder="Nadi" value={Nadi} onChange={(e) => setNadi(e.target.value)} />
                                    </div>
                                  </div>

                                  <div className="row" style={{ padding: '0px' }}>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Laju Pernafasan</h6>
                                      <input type="text" name="LP" className="form-control" placeholder="LP" value={LP} onChange={(e) => setLajuPernafasan(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Presentase SpO2</h6>
                                      <input type="text" name="Spot" className="form-control" placeholder="SpO2" value={Spot} onChange={(e) => setSpot(e.target.value)} />
                                    </div>
                                  </div>

                                  <div className="row" style={{ padding: '0px' }}>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Tinggi Badan</h6>
                                      <input type="text" name="TB" className="form-control" placeholder="Cm" value={TB} onChange={(e) => setTinggiBadan(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Berat Badan</h6>
                                      <input type="text" name="BB" className="form-control" placeholder="Kg" value={BB} onChange={(e) => setBeratBadan(e.target.value)} />
                                    </div>
                                  </div>

                                  <div className="row" style={{ padding: '0px' }}>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">LILA</h6>
                                      <input type="text" name="LILA" className="form-control" placeholder="LILA" value={LILA} onChange={(e) => setLILA(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">AVPU</h6>
                                      <input type="text" name="AVPU" className="form-control" placeholder="AVPU" value={AVPU} onChange={(e) => setAVPU(e.target.value)} />
                                    </div>
                                  </div>
                                </div>

                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" onClick={toggleModal}>Tutup</button>
                                  <button type="submit" className="btn btn-primary" disabled={isFormEmpty()}>
                                    <i className="ti ti-playlist-add"></i> Tambah MR
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
