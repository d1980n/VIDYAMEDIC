import React, { useState ,useEffect } from "react";
import profiles from '../source/user-1.jpg'
import logo from '../source/logo.png'
import '../css/login.css';
import '../css/admindash.css'
import images from '../source/Picture1.png'
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png'
function Susterdashboard() {
    const renderRiwayat = () => {
        return (
          <div>
            {riwayat.map((entry, index) => (
              <div key={index} className="accord">
                <details>
                  <summary className="fw-semibold">
                    {entry.tanggal} <br /><h8 className="fw-light">{entry.waktu}</h8>
                  </summary>
                  <div>
                    <h5>Pemeriksaan Tanda Vital</h5>
                    <h6>Tekanan Darah Sistolik: <h8 className="fw-light">{entry.TDS}</h8></h6>
                    <h6>Tekanan Darah Diastolik: <h8 className="fw-light">{entry.TDD}</h8></h6>
                    <h6>Temperatur: <h8 className="fw-light">{entry.Temp}</h8></h6>
                    <h6>Nadi: <h8 className="fw-light">{entry.Nadi}</h8></h6>
                    <h6>Laju Pernafasan: <h8 className="fw-light">{entry.LP}</h8></h6>
                    <h6>Presentase SpO2: <h8 className="fw-light">{entry.Spot}</h8></h6>
                    <h6>Tinggi Badan: <h8 className="fw-light">{entry.TB}</h8></h6>
                    <h6>Berat Badan: <h8 className="fw-light">{entry.BB}</h8></h6>
                    <h6>LILA: <h8 className="fw-light">{entry.LILA}</h8></h6>
                    <h6>AVPU: <h8 className="fw-light">{entry.AVPU}</h8></h6>
                  </div>
                </details>
              </div>
            ))}
          </div>
        );
      };    
      const [riwayat, setRiwayat] = useState([
        {
          tanggal: "12 Maret 2039",
          waktu: "08:21",
          tandaVital: "Tekanan Darah Sistolik: 123932180",
          TDS: "",
          TDD: "",
          SuhuTubuh: "",
          Nadi: "",
          LP: "",
          SpO2: "",
          TB: "",
          BB: "",
          LILA: "",
          AVPU: ""
        },
        {
          tanggal: "21 April 2019",
          waktu: "12:21",
          tandaVital: "Tekanan Darah Sistolik: 123932180",
          TDS: "",
          TDD: "",
          SuhuTubuh: "",
          Nadi: "",
          LP: "",
          SpO2: "",
          TB: "",
          BB: "",
          LILA: "",
          AVPU: ""
        },
        {
          tanggal: "17 Agustus 2039",
          waktu: "09:11",
          tandaVital: "Tekanan Darah Sistolik: 123932180",
          TDS: "",
          TDD: "",
          SuhuTubuh: "",
          Nadi: "",
          LP: "",
          SpO2: "",
          TB: "",
          BB: "",
          LILA: "",
          AVPU: ""
        }
    ]);

    const [newEntry, setNewEntry] = useState(null);

    const tambahMR = () => {
        if (newEntry) {
          setRiwayat([newEntry, ...riwayat]);
          setNewEntry(null);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEntry(prevState => ({
          ...prevState,
          [name]: value
        }));
    };
    
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
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

  // Fungsi untuk menetapkan halaman aktif
  const handleSetActivePage = (page) => {
      setActivePage(page);
  };
  const [showOverlay, setShowOverlay] = useState(false);
    
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
                        to="/Susterdashboard" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Dashboard')}
                    >
                        <span><i className="ti ti-layout-dashboard"></i></span>
                        <span className="hide-menu">Dashboard</span>
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
        <nav class="navbar navbar-expand-lg navbar-light">
          <ul class="navbar-nav">
            <li class="nav-item d-block d-xl-none">
              <a class="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="javascript:void(0)">
                <i class="ti ti-menu-2"></i>
              </a>
              
            </li>
            
            <li class="nav-item">
              <a class="nav-link nav-icon-hover" href="javascript:void(0)">
                <i class="ti ti-bell-ringing"></i>
                <div class="notification bg-primary rounded-circle"></div>
              </a>
            </li>
 
          </ul>
          <div class="navbar-collapse justify-content-end px-0" id="navbarNav">
            
            <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-end">
              <li class="nav-item dropdown">
                
                <a class="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <img src={profiles} alt="" width="35" height="35" class="rounded-circle"/>
                </a>
                <div class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                  <div class="message-body">
                    <a href="javascript:void(0)" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-user fs-6"></i>
                      <p class="mb-0 fs-3">My Profile</p>
                    </a>
                    <a href="javascript:void(0)" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-mail fs-6"></i>
                      <p class="mb-0 fs-3">My Account</p>
                    </a>
                    <a href="javascript:void(0)" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-list-check fs-6"></i>
                      <p class="mb-0 fs-3">My Task</p>
                    </a>
                    <a href="./authentication-login.html" class="btn btn-outline-primary mx-3 mt-2 d-block">Logout</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/* <!--  Header End --> */}
      <div class="container-fluid">
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
      <h5 class="card-title mb-9 fw-semibold">Suster</h5>
      <div class="row align-items-center">
        <div class="col-8">
          <h4 class="fw-semibold mb-3">Helo, Perawat. Sarah Namban</h4>
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
          <div class="col-lg-8 d-flex align-items-strech " >
            <div class="card w-100" style={{maxHeight: '100%', height:'33.2em'}}>
              <div class="card-body">
                <div class="d-sm-flex d-block align-items-center justify-content-between mb-9">
                  <div class="mb-3 mb-sm-0">
                    <h5 class="card-title fw-semibold">Data Pasien</h5>
                  </div>

                </div>

                <div class="chart">
                  <div className="photos" max-width="180">
                    <br/>
                    <br />  
                    <img src={images2} className="photos"height="auto"/>
                  </div>
                <div className="details">
                <table className="info">
  <tr class="infos">
    <th>Nama: </th>
    <td>Yurike Jamals</td>
  </tr>
  <tr class="infos">
    <th>Nomor MR: </th>
    <td>98217389127</td>
  </tr>
  <tr class="infos">
    <th>Usia: </th>
    <td>82 Tahun</td>
  </tr>
  <tr class="infos">
    <th>Alamat: </th>
    <td>Jalan Gatot Subroto IR juanda nomor 17 kelurahan asamadya</td>
  </tr>
  <tr class="infos">
    <th>Jenis Kelamin: </th>
    <td>Pria</td>
  </tr>
  <tr class="infos">
    <th>Nomor Ponsel: </th>
    <td>088888888888</td>
  </tr>
  <tr class="infos">
    <th>Golongan Darah: </th>
    <td>AB</td>
  </tr>
  <tr class="infos">
    <th>Penyakit Turunan: </th>
    <td>Diabetes</td>
  </tr>
  
</table> 
                </div>
                
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                {/* <!-- Yearly Breakup --> */}
                <div class="col-lg-12">

                
              </div>
              </div>
              <div class="card overflow-hidden">
                  <div class="card-body p-4">
                    <h5 class="card-title mb-9 fw-semibold">Aktivitas terbaru</h5>
                    <div class="row align-items-center">
                      <div class="col-8"  style={{ overflowY: 'auto', maxHeight: '100%', height:'380px'}}>
                      <ul class="timeline-widget mb-0 position-relative mb-n5">
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-primary flex-shrink-0 my-8"></span>
                      <span class="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1">Diberikan infus
                    <div class="timeline-time text-dark">09:30</div>
                    </div>
                    
                  </li>
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-info flex-shrink-0 my-8"></span>
                      <span class="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1 ">Diberikan makan siang
                    <div class="timeline-time text-dark">12:00 am</div>
                    </div>
                  </li>
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                      <span class="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1">Pengecekan suhu tubuh
                    <div class="timeline-time text-dark">12:30 am</div>
                    </div>
                  </li>
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-warning flex-shrink-0 my-8"></span>
                      <span class="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1">Pasien melakukan pembayaran
                    <div class="timeline-time text-dark">09:30 am</div>
                    </div>
                  </li>
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-danger flex-shrink-0 my-8"></span>
                      <span class="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1 ">Pasien keluar dan sudah dinyatakan sembuh 
                    <div class="timeline-time text-dark">09:30 am</div>
                    </div>
                  </li>
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1">Pembayaran selesai
                    <div class="timeline-time text-dark">09:30 am</div>
                    </div>
                  </li>
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1">Pembayaran selesai
                    <div class="timeline-time text-dark">09:30 am</div>
                    </div>
                  </li>
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1">Pembayaran selesai
                    <div class="timeline-time text-dark">09:30 am</div>
                    </div>
                  </li>
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1">Pembayaran selesai
                    <div class="timeline-time text-dark">09:30 am</div>
                    </div>
                  </li>
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1">Pembayaran selesai
                    <div class="timeline-time text-dark">09:30 am</div>
                    </div>
                  </li>
                  <li class="timeline-item d-flex position-relative overflow-hidden">
                    <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span class="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                    </div>
                    <div class="timeline-desc fs-3 text-dark mt-n1">Pembayaran selesai
                    <div class="timeline-time text-dark">09:30 am</div>
                    </div>
                  </li>
                  
                </ul>
                      </div>
                      <div class="col-4">
                        <div class="d-flex justify-content-center">
                          <div id="breakup"></div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
      <div className="col-lg-8 d-flex align-items-stretch" style={{ width: '100%' }}>
        <div className="card w-100">
          <div className="card-body p-4 width">
              <div className="tab">
                <h4 className="fw-semibold" style={{ paddingTop: '20px' }}>Observasi Nurse</h4>
                <div className="accord" style={{ maxWidth: '100%' }}> {/* Tetapkan maksimum lebar sesuai kebutuhan */}
                  <details>
                    <summary>
                      Tambah MR
                    </summary>
    
                    <div className="form-group">
  <div className="row"style={{ boxShadow: 'none', backgroundColor: 'transparent', padding:'0px'}}>
    <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
      <h6 className="Tanda fw-bold">Tekanan Darah Sistolik</h6>
      <input type="text" name="TDS" className="form-control" placeholder="mmHg" onChange={handleChange}  />
    </div>
    <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
      <h6 className="Tanda fw-bold">Tekanan Darah Diastolik</h6>
      <input type="text" name="TDD" className="form-control" placeholder="mmHg" onChange={handleChange} />
    </div>
  </div>
  <div className="row"style={{ boxShadow: 'none', backgroundColor: 'transparent', padding:'0px'}}>
    <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
      <h6 className="Tanda fw-bold">Temperatur</h6>
      <input type="text" name="Temp" className="form-control" placeholder="C" onChange={handleChange} />
    </div>
    <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
      <h6 className="Tanda fw-bold">Nadi</h6>
      <input type="text" name="Nadi" className="form-control" placeholder="Nadi" onChange={handleChange} />
    </div>
  </div>
  <div className="row"style={{ boxShadow: 'none', backgroundColor: 'transparent', padding:'0px'}}>
    <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
      <h6 className="Tanda fw-bold">Laju Pernafasan</h6>
      <input type="text" name="LP" className="form-control" placeholder="LP" onChange={handleChange} />
    </div>
    <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
      <h6 className="Tanda fw-bold">Presentase SpO2</h6>
      <input type="text" name="Spot" className="form-control" placeholder="Laju Presentase" onChange={handleChange} />
    </div>
  </div>
  <div className="row"style={{ boxShadow: 'none', backgroundColor: 'transparent', padding:'0px'}}>
    <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
      <h6 className="Tanda fw-bold">Tinggi Badan</h6>
      <input type="text" name="TB" className="form-control" placeholder="Cm" onChange={handleChange} />
    </div>
    <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
      <h6 className="Tanda fw-bold">Berat Badan</h6>
      <input type="text" name="BB" className="form-control" placeholder="Kg" onChange={handleChange} />
    </div>
  </div>
  <div className="row"style={{ boxShadow: 'none', backgroundColor: 'transparent', padding:'0px'}}>
    <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
      <h6 className="Tanda fw-bold">LILA</h6>
      <input type="text" name="LILA" className="form-control" placeholder="LILA" onChange={handleChange} />
    </div>
    <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
      <h6 className="Tanda fw-bold">AVPU</h6>
      <input type="text" name="AVPU" className="form-control" placeholder="AVPU" onChange={handleChange} />
    </div>
  </div>
  <button type="submit" className="btn btn-primary" onClick={tambahMR}>
    <i className="ti ti-playlist-add"></i> Tambah MR
  </button>
</div>

        
                  </details>
                </div>
                <div className="accord" style={{ maxWidth: '100%' }}>
                    {renderRiwayat() }    
                </div>
                
              </div>
            </div>
        </div>
      </div>
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
export default Susterdashboard;
