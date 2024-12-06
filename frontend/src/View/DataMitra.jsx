import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import profiles from '../source/user-1.jpg';
import logoo from '../source/logo.png';
import logos from '../source/1.png'
import '../css/login.css';
import '../css/admindash.css';
import images from '../source/Picture1.png';
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png';
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage';
import {app} from '../firebase.js';



function DataMitra() {
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [namaKlinik, setNamaKlinik] = useState('');
  const [alamat, setAlamat] = useState('');
  const [no_hp, setNoHp] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [logo, setLogo] = useState(null);
  const [oldLogo, setOldLogo] = useState(null);
  const [klinik, setKlinik] = useState('');
  const [currentRole, setCurrentRole] = useState("Klinik");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMitra, setSelectedMitra] = useState(null);
  const [link, setLink] = useState("");
  const [mitraList, setMitraList] = useState([]);
  const [isUploading, setIsUploading] = useState(true);

  // const storage = getStorage();

  const handleShowDetail = (mitra) => {
    setSelectedMitra(mitra);
    setShowDetail(true);
  };

  const fetchMitraData = async () => {
    try {
        const response = await fetch("http://localhost:3000/mitra");
        const data = await response.json();
  
        if (data.success) {
            setMitraList(data.mitra); // Menyimpan semua data person
        } else {
            console.error("Failed to fetch persons:", data.message);
        }
    } catch (error) {
        console.error("Error fetching persons:", error);
    }
  };

  // Fetch data pada saat komponen dimuat
  useEffect(() => {
    fetchMitraData();
  }, []);

  const handleCloseDetail = () => {
    setShowDetail(!showDetail);
    setSelectedPerson(null);
  };

  useEffect(() => {
    // Isi form jika mode edit
    if (selectedMitra) {
      setNamaKlinik(selectedMitra.namaKlinik || '');
      setNoHp(selectedMitra.no_hp || '');
      setAlamat(selectedMitra.alamat || '');
      setEmail(selectedMitra.email || '');
      setLink(selectedMitra.link || '');
      setLogo(selectedMitra.logo || '');
    }
  }, [selectedMitra]);
  // ===============================================================================================================================

  const [activePage, setActivePage] = useState('');

  const handleSetActivePage = (page) => {
    setActivePage(page);
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

  
  const resetForm = () => {
    setNamaKlinik('');
    setAlamat('');
    setNoHp('');
    setEmail('');
    setLink('');
    setLogo(null);
  }

  const toggleModal = () => {
    setShowModal(!showModal);
    resetForm();
    setIsEdit(false);
  };
  
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const newImage = e.target.files[0];
    if (newImage) {
      handleFileUpload(newImage, oldLogo, setLogo, setIsUploading); // Kirim ke fungsi handleFileUpload
    } else {
      console.error("No file selected");
    }
    console.log(URL.createObjectURL(newImage));
  };

  const handleFileUpload = async (newImage, oldLogo, setLogo, setIsUploading) => {
    try {
      const storage = getStorage(app);
  
      console.log({newImage, oldLogo, setLogo, setIsUploading})
      console.log("ok");
      // **1. Cek jika ada file baru**
      if (newImage) {
        // Hapus file lama jika ada
        if (newImage && oldLogo) {
          console.log("Deleting old file...");
          const decodedPath = decodeURIComponent(
            oldLogo.split('/o/')[1].split('?alt=media')[0]
          );
          const oldFileRef = ref(storage, decodedPath);
          await deleteObject(oldFileRef);
          console.log("Old file deleted successfully");

           // Unggah file baru
        console.log("Uploading new file...");
        const fileName = new Date().getTime() + "-" + newImage.name; // Nama file unik
        const newFileRef = ref(storage, `${fileName}`); // Direktori khusus
        const uploadTask = uploadBytesResumable(newFileRef, newImage);
  
        setIsUploading(true); // Mulai proses unggahan
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Error during upload:", error);
            setIsUploading(false);
          },
          async () => {
            const newDownloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("New file uploaded successfully, URL:", newDownloadURL);
  
            // Simpan URL baru ke state
            setLogo(newDownloadURL);
            setIsUploading(false);
          }
        );
          } else if (newImage && !oldLogo) {
             // Unggah file baru
        console.log("Uploading new file...");
        const fileName = new Date().getTime() + "-" + newImage.name; // Nama file unik
        const newFileRef = ref(storage, ` ${fileName}`); // Direktori khusus
        const uploadTask = uploadBytesResumable(newFileRef, newImage);
  
        setIsUploading(true); // Mulai proses unggahan
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Error during upload:", error);
            setIsUploading(false);
          },
          async () => {
            const newDownloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("New file uploaded successfully, URL:", newDownloadURL);
  
            // Simpan URL baru ke state
            setLogo(newDownloadURL);
            setIsUploading(false);
          }
        );
          } else {
            console.log("No new file uploaded, logo remains unchanged.");
            // Jika tidak ada file baru, pertahankan logo lama
            setLogo(oldLogo);
            setIsUploading(false);
          }
      }
    } catch (error) {
      console.error("Error in handleFileUploadOrEdit:", error);
      setIsUploading(false);
    }
  };
  

  // const handleFileUpload = async (image) => {
  //   const storage = getStorage(app);
  //   const fileName = new Date().getTime() + image.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, image);
  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       // const progress =
  //       //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       // setImagePercent(Math.round(progress));
  //     },
  //     (error) => {
  //       // setImageError(true);
  //       console.log({error})
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         // setFormData({ ...formData, profilePicture: downloadURL })
  //         setLogo(downloadURL);
  //         console.log({downloadURL});
  //     });
  //     }
  //   );
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!namaKlinik || !no_hp || !alamat || !email) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Semua field wajib diisi!',
      });
      return;
    }

  const formData = {
    namaKlinik,
    no_hp,
    alamat,
    logo,
    email,
      link,
  };

  console.log({formData})

  // Log data yang akan dikirim
  console.log('Form Data:', formData);

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: selectedMitra ? 'Data akan diperbarui.' : 'Data akan ditambahkan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, kirim data!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response;

          if (selectedMitra && selectedMitra._id) {
            // Edit Mitra
            response = await fetch(`http://localhost:3000/mitra/editMitra/${selectedMitra._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
          } else {
            // Add Mitra
            response = await fetch('http://localhost:3000/mitra/addMitra', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
          }

          const responseBody = await response.json();

          if (!response.ok) {
            throw new Error(responseBody.message || 'Gagal mengirim data ke server.');
          }

          // Reset form dan modal
          setNamaKlinik('');
          setNoHp('');
          setAlamat('');
          setLink('');
          setEmail('');
          setLogo(null);
          setOldLogo(null);
          setShowModal(false);
          setIsEdit(false);
          setSelectedMitra(null);

          Swal.fire({
            icon: 'success',
            title: selectedMitra ? 'Berhasil Diperbarui!' : 'Berhasil Ditambahkan!',
            text: `Mitra ${namaKlinik} ${selectedMitra ? 'berhasil diperbarui.' : 'berhasil ditambahkan.'}`,
          });

          // Refresh data
          fetchMitraData();
        } catch (error) {
          console.error('Error in handleSubmit:', error.message);
          Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: `Terjadi kesalahan: ${error.message}`,
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Dibatalkan',
          text: 'Pengiriman data dibatalkan.',
        });
      }
    });
  };


  // Event listener untuk mendeteksi klik di luar dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
      };

  const handleDeleteLogo = async (downloadURL) => {
    try {
      const storage = getStorage();
  
      // Ekstrak file path dari downloadURL
      const decodedPath = decodeURIComponent(
        downloadURL.split('/o/')[1].split('?alt=media')[0]
      );
  
      // Buat referensi ke file di Firebase Storage

      console.log({decodedPath})
      const fileRef = ref(storage, decodedPath);
  
      // Hapus file dari Firebase Storage
      await deleteObject(fileRef);
      console.log("File deleted successfully");

    } catch (error) {
      console.error("Error deleting logo:", {error});
    }finally{
      console.log("sukses");
    }
  };

  const handleDelete = async (data) => {

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

        try{
          await handleDeleteLogo(data.logo);
        }catch(err){
          console.log({err})
        }

        try {
          // Lakukan penghapusan setelah konfirmasi

          const response = await fetch(`http://localhost:3000/mitra/deleteMitra/${data._id}`, {
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

  const handleEdit = () => {
    // Mengisi nilai form dengan data dari selectedPerson
    setNamaKlinik(selectedMitra.namaKlinik);
    setOldLogo(selectedMitra.logo);
    setNoHp(selectedMitra.no_hp);
    setAlamat(selectedMitra.alamat);
    setEmail(selectedMitra.email);
    setShowModal(true); // Tampilkan modal untuk edit
    setIsEdit(true);  
    setShowDetail(false);
  };

  // Event listener untuk mendeteksi klik di luar dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
                  <img src={logoo} width="180" alt="" />
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
                  <NavLink className={`sidebar-link ${activePage === "DashboardGamma" ? "active" : ""}`} to="/DashboardGamma" aria-expanded="false" onClick={() => handleSetActivePage("DashboarGammad")}>
                      <span>
                        <i className="ti ti-layout-dashboard"></i>
                      </span>
                      <span className="hide-menu">Dashboard</span>
                    </NavLink>
                    <NavLink className={`sidebar-link ${activePage === "DataSuperAdmin" ? "active" : ""}`} to="/DataSuperAdmin" aria-expanded="false" onClick={() => handleSetActivePage("DataSuperAdmin")}>
                      <span>
                        <i className="ti ti-square-plus"></i>
                      </span>
                      <span className="hide-menu">Data Admin Klinik</span>
                    </NavLink>
                    <NavLink className={`sidebar-link ${activePage === "DataMitra" ? "active" : ""}`} to="/DataMitra" aria-expanded="false" onClick={() => handleSetActivePage("DataMitra")}>
                      <span>
                        <i className="ti ti-building-hospital"></i>
                      </span>
                      <span className="hide-menu">Data Mitra</span>
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
            {/* <!--  Header End --> */}
            <div className="container-fluid">
              <body className="login"></body>
              <div>
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
                              <input type="radio" name="tabs" id="tabSuperAdmin" checked={currentRole === "Klinik"} onChange={() => setCurrentRole("Klinik")} />
                              <label htmlFor="tabSuperAdmin"  style={{height:"40px",}}>Data Klinik</label>
                            </div>

                          </div>
                          <div clasName="d-flex justify-content-end ms-auto tabs-suster">
                            <button className="btn btn-primary mb-3" style={{marginRight: "0.75rem",}} onClick={toggleModal}>
                              Tambah Data
                            </button>
                          </div>
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
                                    <h6 className="fw-semibold mb-0">Logo</h6>
                                  </th>
                                  <th className="border-bottom-0">
                                    <h6 className="fw-semibold mb-0">Nama {currentRole}</h6>
                                  </th>
                                  <th className="border-bottom-0">
                                    <h6 className="fw-semibold mb-0">Alamat</h6>
                                  </th>
                                  <th className="border-bottom-0" style={{ width: "10rem" }}>
                                    <h6 className="fw-semibold mb-0">Action</h6>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                              {mitraList.length > 0 ? (
                              mitraList.map((mitra, index) => (
                                <tr key="">
                                  <td>{index + 1}</td>
                                  <td><img src={mitra.logo} alt="" width="80rem" /></td>
                                  <td>{mitra.namaKlinik}</td>
                                  <td>{mitra.alamat}</td>
                                  <td>
                                    <button type="button" className="btn btn-primary m-1" onClick={() => handleShowDetail(mitra)}>
                                      Detail
                                    </button>
                                    <button type="button" className="btn btn-danger m-1" onClick={() => handleDelete(mitra)}>
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

              {/* Modal for showing details */}
              {showDetail && (
                  <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                        {`Detail ${currentRole}`}
                        </h5>
                        <button type="button" className="btn-close" onClick={handleCloseDetail}></button>
                      </div>
                      {selectedMitra && (
                        <div className="modal-body">
                          {/* Input pengukuran medis */}
                          <div className="row row-space">
                            <div className="col-lg-6">
                              <h6 className="fw-bold">Nama Klinik</h6>
                              <p>{selectedMitra.namaKlinik}</p>
                            </div>
                            <div className="col-lg-6">
                              <h6 className="fw-bold">Alamat</h6>
                              <p>{selectedMitra.alamat}</p>
                            </div>
                          </div>

                          <div className="row row-space">
                            <div className="col-lg-6">
                              <h6 className="fw-bold">No HP</h6>
                              <p>{selectedMitra.no_hp}</p>
                            </div>
                            <div className="col-lg-6">
                              <h6 className="fw-bold">Email</h6>
                              <p>{selectedMitra.email}</p>
                            </div>
                          </div>

                          <div className="row row-space">
                            <div className="col-lg-12">
                              <h6 className="fw-bold">logo</h6>
                              <p><img src={selectedMitra.logo} alt="" width='100rem' /></p>
                            </div>
                          </div>
                          
                        </div>
                      )}
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={handleCloseDetail}>
                            Tutup
                          </button>
                          <button type="submit" className="btn btn-primary"  onClick={handleEdit}>
                            <i className="ti ti-playlist-add"></i> Edit
                          </button>
                          {/* <button type="submit" className="btn btn-success" disabled={isConfirmed}>Masuk</button> */}
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
                            { isEdit ? `Edit ${currentRole}` : `Tambah ${currentRole}` }
                          </h5>
                          <button type="button" className="btn-close" onClick={toggleModal}></button>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                          <div className="modal-body">
                            {/* Input pengukuran medis */}
                            <div className="row row-space">
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Nama Klinik</h6>
                                <input type="text" name="namaKlinik" className="form-control" placeholder="Nama Klinik" value={namaKlinik} onChange={(e) => setNamaKlinik(e.target.value)}/>
                              </div>
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Alamat</h6>
                                <input type="text" name="alamat" className="form-control" placeholder="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                              </div>
                            </div>

                            <div className="row row-space">
                              <div className="col-lg-6">
                                <h6 className="fw-bold">No HP</h6>
                                <input type="number" name="no_hp" className="form-control" placeholder="No Hp" value={no_hp} onChange={(e) => setNoHp(e.target.value)} />
                              </div>
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Email</h6>
                                <input type="text" name="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                              </div>
                            </div>
                            <div className="row row-space">
                              <div className="col-lg-6">
                                <h6 className="fw-bold">Link</h6>
                                <input type="text" name="Link" className="form-control" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
                              </div>
                          
                            </div>
                            
                            <div className="row row-space">
                              <div className="col-lg-12">
                                <h6 className="fw-bold">Logo Klinik</h6>
                                <input type="file" name="logo" className="form-control" placeholder="Profile PIcture" accept="image/*" onChange={handleFileChange} />
                              </div>
                            </div>
                            
                          </div>

                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                              Tutup
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={isUploading || !logo}>
                              <i className="ti ti-playlist-add"></i> {isUploading ? "Waiting for file" : "Simpan"}
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

export default DataMitra;
