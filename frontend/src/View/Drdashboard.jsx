import React, { useState ,useEffect } from "react";
import profiles from '../source/user-1.jpg'
import logo from '../source/logo.png'
import '../css/login.css';
import '../css/admindash.css'
import { useNavigate } from 'react-router-dom';
import images from '../source/Picture1.png'
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png'
function Drdashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [daftarPasien, setDaftarPasien] = useState([]);
  const navigate = useNavigate();
  const [isPeriksaSelesai, setIsPeriksaSelesai] = useState(false);
  
  
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

  const fetchDaftarPasien = async () => {
    try {
      const response = await fetch("http://localhost:3000/patients");
      const data = await response.json();
      console.log("response : ", response);
      console.log("data pasien: ", data.patients);
      if (data.success) {
        const filteredPatients = data.patients.filter((patient) => patient.antrianStatus.dokterAntriStatus === true && 
        patient.antrianStatus.dokterPeriksaStatus === false);
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
  const [activePage, setActivePage] = useState('');

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
  const dokterPeriksa = async (index, nomorMR) => {
    const newDaftarPasien = [...daftarPasien];
    newDaftarPasien.splice(index, 1); // Menghapus pasien dari daftar
    setDaftarPasien(newDaftarPasien);
  
    try {
        const response = await fetch(`http://localhost:3000/patients/dokterPeriksa`, {
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
        if (data.dokterPeriksaStatus === true) {
          setIsPeriksaSelesai(true); // Mengubah state isPeriksaSelesai
        }
        else{
           navigate('/Drmonitor');
        }
  
        console.log('Status antrian suster berhasil diperbarui:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
  };
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

  return (
    <html className='Admin'>
      <link rel="stylesheet" href="https://icdcdn.azureedge.net/embeddedct/icd11ect-1.1.css"></link>
        <body>
  {/* <!--  Body Wrapper --> */}
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
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
                <NavLink 
                        className={`sidebar-link ${activePage === 'Dashboard' ? 'active' : ''}`} 
                        to="/Drdashboard" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Dashboard')}
                    >
                        <span><i className="ti ti-layout-dashboard"></i></span>
                        <span className="hide-menu">Dashboard</span>
                    </NavLink>
                    <NavLink 
                      className={`sidebar-link ${'Dashboard' ? 'disabled-link ' : ''}`} 
                      to="/Drmonitor" 
                      aria-expanded="false" 
                      onClick={(e) => {
                        if (activePage === 'Monitoring') {
                          e.preventDefault(); // Mencegah navigasi saat tombol dalam kondisi disabled
                        } else {
                          handleSetActivePage('Monitoring'); // Jalankan fungsi jika tidak disabled
                        }
                      }}
                    >
                      <span><i className="ti ti-heart-rate-monitor"></i></span>
                      <span className="hide-menu">Monitoring</span>
                    </NavLink>
                  
             

                    {/* Tambahkan tautan lainnya dengan pola yang sama */}
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
        {/* <!-- End Sidebar navigation --> */}
      </div>
      {/* <!-- End Sidebar scroll--> */}
    </aside>
    {/* <!--  Sidebar End --> */}
    {/* <!--  Main wrapper --> */}
    <div class="body-wrapper">
      {/* <!--  Header Start --> */}
      <header class="app-header">
        
      </header>
      {/* <!--  Header End --> */}
      <div class="container-fluid" style={{paddingTop: '24px' }}>
        <body className="login">
        </body>
        {/* <!--  Row 1 --> */}
          <div className="col-lg-5" style={{display: "flex",justifyContent:"space-between", width: '100%' }}>
          <div class="row" style={{width:"49%", marginLeft:'1px'}}>
              
              <div class="card overflow-hidden">
                   <div class="card-body p-4">
                    <h5 class="card-title mb-9 fw-semibold">Klinik</h5>
                    
                    <div class="row align-items-center">
                      <div class="col-8">
                        <h4 class="fw-semibold mb-3">Klinik VidyaMedic</h4>
                        
                  
                        <div class="d-flex align-items-center pb-1">
                          <span
                            class="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                            <i class="ti ti-arrow-down-right text-danger"></i>
                          </span>
                         
                          <p class="fs-3 mb-0"><p class="text-dark me-1 fs-3 mb-0">Alamat:</p> JL. Jamaludinsurak jawa barat, andalan 12 nomor 19 rw 12</p>
                        </div>
          

                      </div>
                      
                    </div>
                    
                  </div>
              </div>
              
              
            </div>
            <div class="row" style={{width: '49%', marginRight: "2px"}}>
  <div class="card overflow-hidden">
    <div class="card-body p-4">
      <h5 class="card-title mb-9 fw-semibold">Dokter</h5>
      <div class="row align-items-center">
        <div class="col-8">
          <h4 class="fw-semibold mb-3">Helo, Dr. Santoso Sutetjo</h4>
          <div class="d-flex align-items-center pb-1">
            <span class="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
              <i class="ti ti-arrow-down-right text-danger"></i>
            </span>
            <p class="fs-3 mb-0" style={{marginLeft:'10px'}}>
              <p class="text-dark me-1 fs-5 mb-0">Jumlah Antrian: <p class="text-dark me-1 fs-4 mb-0">5</p></p>
              
            </p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>

          </div>
        <div class="row">
          
          <div class="col-lg-8 d-flex align-items-stretch" style={{width: '100%'}}>
            <div class="card w-100">
              <div class="card-body p-4 width" >
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
                            {daftarPasien.map((pasien, index,) => (
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
                                {!isPeriksaSelesai ? (
                                    <button
                                      type="button"
                                      className="btn btn-primary m-1"
                                      onClick={() => dokterPeriksa(index, pasien.nomorMR)} // Menjalankan dokterPeriksa
                                    >
                                      Periksa
                                    </button>
                                  ) : (
                                    // Jika periksa selesai, tampilkan NavLink yang membawa ke /Drmonitor
                                    <NavLink to="/Drmonitor" className="btn btn-success m-1">
                                      Pergi ke Monitor Dokter
                                    </NavLink>
                                  )}
                               
                                </td>
                                <td class="border-bottom-0"> 
                               
                                </td>
                              </tr>
                            ))}
                          </tbody>
                  </table>
                </div>
                
              </div>
              
              
            </div>
            
          </div>
          
        </div>
        <div class="row">
          
          
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
export default Drdashboard;
