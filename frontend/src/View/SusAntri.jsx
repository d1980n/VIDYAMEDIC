import React, { useState, useEffect } from "react";
import profiles from "../source/user-1.jpg";
import logo from "../source/logo.png";
import logos from '../source/1.png'
import "../css/login.css";
import "../css/admindash.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import images from "../source/Picture1.png";
import { NavLink, useLocation } from "react-router-dom";
import images2 from "../source/img2.png";
function SusAntri() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [TDS, setTekananDarahSistolik] = useState("");
  const [TDD, setTekanandarahDiastolik] = useState("");
  const [Temperatur, setTemperatur] = useState("");
  const [Nadi, setNadi] = useState("");
  const [LP, setLajuPernafasan] = useState("");
  const [Spot, setSpot] = useState("");
  const [TB, setTinggiBadan] = useState("");
  const [BB, setBeratBadan] = useState("");
  const [LILA, setLILA] = useState("");
  const [AVPU, setAVPU] = useState("");
  const [Keluhan, setKeluhan] = useState("");
  const [daftarPasien, setDaftarPasien] = useState([]);
  const [selectedNomorMR, setSelectedNomorMR] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false); // State untuk konfirmasi
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const toggleModal = (nomorMR) => {
    setShowModal(!showModal);
    setSelectedNomorMR(nomorMR);
  };

  const fetchDaftarPasien = async () => {
    try {
      const response = await fetch("http://localhost:3000/patients");
      const data = await response.json();

      if (data.success) {
        const filteredPatients = data.patients.filter((patient) => patient.antrianStatus.susterAntriStatus === true);
        console.log("filteredPatients: ", filteredPatients); // Log untuk melihat hasil filter

        setDaftarPasien(filteredPatients);
      } else {
        console.error("Failed to fetch patients:", data.message);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  };

  // Fungsi untuk menambahkan pasien ke akhir antrian tanpa melakukan re-fetch
  const addPatientToQueue = (newPatient) => {
    if (newPatient.antrianStatus.susterAntriStatus === true) {
      setDaftarPasien((prevDaftarPasien) => {
        // Pastikan pasien baru belum ada di daftar sebelumnya
        const isPatientExist = prevDaftarPasien.some((patient) => patient.nomorMR === newPatient.nomorMR);
        if (!isPatientExist) {
          return [...prevDaftarPasien, newPatient]; // Tambahkan pasien ke akhir antrian
        }
        return prevDaftarPasien;
      });
    }
  };

  // Fetch data dari API

  useEffect(() => {
    const mergeData = () => {
      const merged = daftarPasien.map((pasien) => {
        const medicalRecord = medicalRecords.find((record) => record.nomorMR === pasien.nomorMR);

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

  const resetForm = () => {
    setTekananDarahSistolik("");
    setTekanandarahDiastolik("");
    setTemperatur("");
    setNadi("");
    setLajuPernafasan("");
    setSpot("");
    setTinggiBadan("");
    setBeratBadan("");
    setLILA("");
    setAVPU("");
    setKeluhan("");
  };

  const isFormEmpty = () => {
    return !TDS && !TDD && !Temperatur && !Nadi && !LP && !Spot && !TB && !BB && !LILA && !AVPU;
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
      Keluhan,
    };

    // Tampilkan alert konfirmasi sebelum submit
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data akan disimpan, pastikan semua informasi sudah benar.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, simpan!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("http://localhost:3000/medical/tambah", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          console.log("Response Status:", response.status);
          const contentType = response.headers.get("content-type");

          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log("Response Data:", data);

            // Tampilkan alert sukses setelah submit berhasil
            Swal.fire({
              title: "Success!",
              text: "Data berhasil disimpan!",
              icon: "success",
              confirmButtonText: "OK",
            });

            // Reset form dan refresh daftar pasien setelah berhasil
            setShowModal(false); // Tutup modal setelah sukses
            resetForm(); // Reset input
            fetchDaftarPasien();
            console.log("well");
            window.location.reload();
          } else {
            const text = await response.text();
            console.error("Error: Response is not JSON. Response text:", text);
          }
        } catch (error) {
          console.error("Error:", error.message);

          // Jika terjadi error, tampilkan alert error
          Swal.fire({
            title: "Error!",
            text: "Gagal menyimpan data, coba lagi!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  useEffect(() => {
    const mergeData = () => {
      const merged = daftarPasien.map((pasien) => {
        const medicalRecord = medicalRecords.find((record) => record.nomorMR === pasien.nomorMR);
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

  // ... kode lainnya ...

  const dokterAntri = async (index, nomorMR) => {
    // Tampilkan popup konfirmasi sebelum melanjutkan
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Pasien akan dimasukkan ke dalam antrian dokter.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Masuk!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      // Jika pengguna mengonfirmasi, hapus pasien dari daftar
      const newDaftarPasien = [...daftarPasien];
      newDaftarPasien.splice(index, 1); // Menghapus pasien dari daftar
      setDaftarPasien(newDaftarPasien);

      try {
        const response = await fetch(`http://localhost:3000/patients/dokterAntri`, {
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

        console.log("Status antrian dokter berhasil diperbarui:", data);

        // Tampilkan alert sukses setelah memperbarui status antrian
        Swal.fire({
          title: "Success!",
          text: "Pasien berhasil dimasukkan ke antrian dokter.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Jika perlu, panggil fetchDaftarPasien untuk memperbarui daftar pasien
        fetchDaftarPasien();
      } catch (error) {
        console.error("Error:", error.message);

        // Jika terjadi error, tampilkan alert error
        Swal.fire({
          title: "Error!",
          text: "Gagal memperbarui status antrian dokter, coba lagi!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:3000/patients");
        const data = await response.json();
  
        if (data.success) {
          const newPatients = data.patients.filter(
            (patient) => patient.antrianStatus.susterAntriStatus === true
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
  

  const handleTambahMRClick = () => {
    setIsModalVisible(true);
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:3000/person");
      const data = await response.json();

      if (data.success) {
        const filteredDoctors = data.persons.filter((person) => person.role === "Doctor");
        setDoctors(filteredDoctors);
      } else {
        console.error("Failed to fetch doctors:", data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSelectDoctor = (e) => {
    setSelectedDoctor(e.target.value);
    console.log("Dokter yang dipilih:", e.target.value);
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
                              <th style={{ width: "18rem" }} class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Action</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {daftarPasien.length > 0 ? (
                              daftarPasien.map((pasien, index) => {
                                // Ambil semua rekam medis untuk pasien ini berdasarkan nomorMR
                                const patientMedicalRecords = medicalRecords.filter((record) => record.nomorMR === pasien.nomorMR);
                                const hasStatusMRTrue = patientMedicalRecords.some((record) => record.statusMR === true); // Cek jika ada status true

                                return (
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
                                        onClick={() => toggleModal(pasien.nomorMR)} // Fungsi untuk membuka modal
                                        disabled={hasStatusMRTrue}
                                      >
                                        {" "}
                                        {/* Tombol dinonaktifkan jika status rekam medis true */}
                                        Periksa
                                      </button>
                                      {hasStatusMRTrue && ( // Tampilkan tombol "Masuk" jika status rekam medis true
                                        <button className="btn btn-success" onClick={() => dokterAntri(index, pasien.nomorMR)}>
                                          Masuk
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })
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
                      {showModal && (
                        <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                  Tambah Pengukuran Medis
                                </h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                              </div>
                              <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                  {/* Input pengukuran medis */}
                                  <div className="row" style={{ padding: "0px" }}>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Tekanan Darah Sistolik</h6>
                                      <input type="text" name="TDS" className="form-control" placeholder="mmHg" value={TDS} onChange={(e) => setTekananDarahSistolik(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Tekanan Darah Diastolik</h6>
                                      <input type="text" name="TDD" className="form-control" placeholder="mmHg" value={TDD} onChange={(e) => setTekanandarahDiastolik(e.target.value)} />
                                    </div>
                                  </div>

                                  <div className="row" style={{ padding: "0px" }}>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Temperatur</h6>
                                      <input type="text" name="Temperatur" className="form-control" placeholder="C" value={Temperatur} onChange={(e) => setTemperatur(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Nadi</h6>
                                      <input type="text" name="Nadi" className="form-control" placeholder="Nadi" value={Nadi} onChange={(e) => setNadi(e.target.value)} />
                                    </div>
                                  </div>

                                  <div className="row" style={{ padding: "0px" }}>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Laju Pernafasan</h6>
                                      <input type="text" name="LP" className="form-control" placeholder="LP" value={LP} onChange={(e) => setLajuPernafasan(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Presentase SpO2</h6>
                                      <input type="text" name="Spot" className="form-control" placeholder="SpO2" value={Spot} onChange={(e) => setSpot(e.target.value)} />
                                    </div>
                                  </div>

                                  <div className="row" style={{ padding: "0px" }}>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Tinggi Badan</h6>
                                      <input type="text" name="TB" className="form-control" placeholder="Cm" value={TB} onChange={(e) => setTinggiBadan(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Berat Badan</h6>
                                      <input type="text" name="BB" className="form-control" placeholder="Kg" value={BB} onChange={(e) => setBeratBadan(e.target.value)} />
                                    </div>
                                  </div>

                                  <div className="row" style={{ padding: "0px" }}>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">LILA</h6>
                                      <input type="text" name="LILA" className="form-control" placeholder="LILA" value={LILA} onChange={(e) => setLILA(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">AVPU</h6>
                                      <input type="text" name="AVPU" className="form-control" placeholder="AVPU" value={AVPU} onChange={(e) => setAVPU(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Keluhan</h6>
                                      <textarea type="text" name="Keluhan" placeholder="Keluhan" className="form-sels" value={Keluhan} onChange={(e) => setKeluhan(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                      <h6 className="fw-bold">Pilih Dokter</h6>
                                      <select
                                        className="form-select"
                                        value={selectedDoctor}
                                        onChange={(e) => setSelectedDoctor(e.target.value)}
                                      >
                                        <option value="">Select</option>
                                        {doctors.map((doctor) => (
                                          <option key={doctor._id} value={doctor._id}>
                                            {doctor.nama} - {doctor.poli}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                    Tutup
                                  </button>
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
export default SusAntri;
