import React, { useState, useEffect } from "react";
import profiles from "../source/user-1.jpg";
import logo from "../source/logo.png";
import "../css/login.css";
import "../css/admindash.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import images from "../source/Picture1.png";
import { NavLink, useLocation } from "react-router-dom";
import images2 from "../source/img2.png";
function DrAntri() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [daftarPasien, setDaftarPasien] = useState([]);
  const [isPeriksaSelesai, setIsPeriksaSelesai] = useState([]);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false); // Contoh inisialisasi
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const mitra = JSON.parse(sessionStorage.getItem('mitra'));

  const handleLogout = () => {
    const clinicId = mitra.idKlinik || ''; // Pastikan ID klinik ada
    sessionStorage.removeItem('user'); // Hapus session user
    window.location.href = `http://localhost:3001/?clinicId=${clinicId}`; // Navigasi ke URL target
  };

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

  const fetchDaftarPasien = async () => {
    try {
      const response = await fetch("http://localhost:3000/patients");
      const data = await response.json();
      console.log("response : ", response);
      console.log("data pasien: ", data.patients);
      if (data.success) {
        const filteredPatients = data.patients.filter(
          (patient) =>
          patient.currentKlinik === mitra.namaKlinik &&
          patient.currentDokter === user.id &&
          patient.antrianStatus.dokterAntriStatus === true &&
          patient.antrianStatus.dokterPeriksaStatus === false
          );
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

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [activePage, setActivePage] = useState("");

  // Fungsi untuk menetapkan halaman aktif
  const handleSetActivePage = (page) => {
    setActivePage(page);
  };
  const [showOverlay, setShowOverlay] = useState(false);

  const susterAntri = async (index, nomorMR) => {
    const newDaftarPasien = [...daftarPasien];
    newDaftarPasien.splice(index, 1); // Menghapus pasien dari daftar
    setDaftarPasien(newDaftarPasien);

    try {
      const response = await fetch(`http://localhost:3000/patients/susterAntri`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nomorMR }), // Mengirim nomorMR ke backend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui status antrian suster");
      } else {
        window.location.reload();
      }

      console.log("Status antrian suster berhasil diperbarui:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const dokterPeriksa = async (index, nomorMR) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Pasien akan diperiksa.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Periksa!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      const newDaftarPasien = [...daftarPasien];
      newDaftarPasien.splice(index, 1); // Menghapus pasien dari daftar
      setDaftarPasien(newDaftarPasien);

      try {
        const response = await fetch(`http://localhost:3000/patients/dokterPeriksa`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nomorMR }), // Mengirim nomorMR ke backend
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal memperbarui status antrian dokter");
        }

        if (data.dokterPeriksaStatus === true) {
          setIsPeriksaSelesai(true); // Mengubah state isPeriksaSelesai
        } else {
          navigate("/Drmonitor"); // Navigasi jika dokterPeriksaStatus bukan true
        }

        console.log("Status antrian dokter berhasil diperbarui:", data);
      } catch (error) {
        console.error("Error:", error.message);

        // Tampilkan alert error jika terjadi kesalahan
        Swal.fire({
          title: "Error!",
          text: "Gagal memperbarui status antrian dokter, coba lagi!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  // const cancelPasien = async (index, nomorMR) => {
  //   const newDaftarPasien = [...daftarPasien];
  //   newDaftarPasien.splice(index, 1);
  //   setDaftarPasien(newDaftarPasien);

  //   try {
  //       const response = await fetch(`http://localhost:3000/patients/cancelAntrian`, {
  //           method: 'PUT',
  //           headers: {
  //               'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ nomorMR }),
  //       });

  //       const data = await response.json();

  //       if (!response.ok) {
  //           throw new Error(data.message || 'Gagal membatalkan antrian pasien');
  //       }
  //       else{
  //         window.location.reload();
  //       }

  //       console.log('Antrian dibatalkan:', data);
  //   } catch (error) {
  //       console.error('Error:', error.message);
  //   }
  // };
  const [filteredPatient, setFilteredPatient] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from /medical API
        const medicalResponse = await fetch("http://localhost:3000/medical");
        const medicalData = await medicalResponse.json();
        console.log("Medical Data:", medicalData); // Lihat data yang diterima dari API

        // Cek apakah medicalRecords ada dan merupakan array
        if (medicalData.success && Array.isArray(medicalData.medicalRecords)) {
          console.log("Medical Records:", medicalData.medicalRecords); // Lihat rekaman medis yang diterima

          // Mencari rekaman medis dengan statusMRPeriksa = true
          const medicalRecord = medicalData.medicalRecords.find((record) => record.statusMRPeriksa === true);
          console.log("Filtered Medical Record:", medicalRecord); // Lihat rekaman medis yang terfilter

          if (medicalRecord) {
            // Fetch data from /patients API
            const patientsResponse = await fetch("http://localhost:3000/patients");
            const patientsData = await patientsResponse.json();
            console.log("Patients Data:", patientsData); // Lihat data pasien

            // Cek apakah patientsData adalah array
            if (Array.isArray(patientsData.patients)) {

              // Mencari pasien dengan nomor MR yang cocok dari rekaman medis
              const matchedPatient = patientsData.patients.find((patient) => patient.nomorMR === medicalRecord.nomorMR);
              console.log("Matched Patient:", matchedPatient); // Lihat jika pasien ditemukan

              // Set the filtered patient to state
              if (matchedPatient) {
                setFilteredPatient(matchedPatient);
              } else {
                console.log("No matching patient found");
              }
            } else {
              console.error("Patients data is not an array:", patientsData);
            }
          } else {
            console.log("No medical record with statusMRPeriksa = true found");
          }
        } else {
          console.log("Invalid medical data structure or no medical records found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:3000/patients");
        const data = await response.json();
  
        if (data.success) {
          const newPatients = data.patients.filter(
            (patient) =>
            patient.currentKlinik === mitra.namaKlinik &&
            patient.currentDokter === user.id &&
            patient.antrianStatus.dokterAntriStatus === true
          );
          setDaftarPasien((prevDaftarPasien) => {
            const uniquePatients = newPatients.filter(
              (newPatient) => !prevDaftarPasien.some((patient) => patient.nomorMR === newPatient.nomorMR)
            );
            return [...prevDaftarPasien, ...uniquePatients];
          });
        }
      } catch (error) {
        console.error("Error fetching new patients:", error);
      }
    }, 5000); // Polling setiap 5 detik
  
    return () => clearInterval(interval); // Bersihkan interval saat komponen dibongkar
  }, []);

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
                  <img src={mitra.logoKlinik} width="100" alt="" />
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
                    <NavLink
                      className={`sidebar-link ${isDisabled ? "disabled-link" : ""}`}
                      to="/DrAntri"
                      aria-expanded="false"
                      onClick={(e) => {
                        if (isDisabled) {
                          e.preventDefault(); // Mencegah navigasi saat tombol dalam kondisi disabled
                        } else {
                          handleSetActivePage("DrAntri"); // Jalankan fungsi jika tidak disabled
                        }
                      }}
                    >
                      <span>
                        <i className="ti ti-clipboard"></i>
                      </span>
                      <span className="hide-menu">Antrian</span>
                    </NavLink>
                    <NavLink
                      className={`sidebar-linkk ${isDisabled ? "disabled-link" : ""}`}
                      to="/DrAntri"
                      aria-expanded="false"
                      onClick={(e) => {
                        if (isDisabled) {
                          e.preventDefault(); // Mencegah navigasi saat tombol dalam kondisi disabled
                        } else {
                          handleSetActivePage("DrAntri"); // Jalankan fungsi jika tidak disabled
                        }
                      }}
                    >
                      <span>
                        <i className="ti ti-heart-rate-monitor"></i>
                      </span>
                      <span className="hide-menu">Periksa</span>
                    </NavLink>

                    {/* Tambahkan tautan lainnya dengan pola yang sama */}
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
                              <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Action</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {daftarPasien.length > 0 ? (
                              daftarPasien.map((pasien, index) => (
                                <tr key={pasien.nomorMR}>
                                  <td className="border-bottom-0">
                                    <h6 className="fw-semibold mb-0">{index + 1}</h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <p className="mb-0 fw-normal">{pasien.namaLengkap}</p>
                                  </td>
                                  <td className="border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                      <span className="fw-normal">{pasien.nomorMR}</span>
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    <button
                                      type="button"
                                      className="btn btn-primary m-1"
                                      onClick={() => dokterPeriksa(index, pasien.nomorMR)} // Menjalankan dokterPeriksa
                                    >
                                      Periksa
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
export default DrAntri;
