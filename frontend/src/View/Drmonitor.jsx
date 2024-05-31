import React, { useState ,useEffect } from "react";
import profiles from '../source/user-1.jpg'
import logo from '../source/logo.png'
import '../css/login.css';
import '../css/admindash.css'
import images from '../source/Picture1.png'
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png'
function Drmonitor() {
  const [showLabOverlay, setShowLabOverlay] = useState(false);
  const [showXRayOverlay, setShowXRayOverlay] = useState(false);
  const [formData, setFormData] = useState({
    Anamnesis: '',
    Diagnosa: '',
    Xray:'',
    StatusLokalis: '',
    PemeriksaanPenunjang: '',
    RencanaTerapi: '',
    DiagnosaICD11: '',
    Rujukan: '',
});

const [labSelections, setLabSelections] = useState([]);


const handleLabChange = (event) => {
  const { value, checked } = event.target;
  if (checked) {
    setLabSelections([...labSelections, value]);
  } else {
    setLabSelections(labSelections.filter(item => item !== value));
  }
};

const handleSaveLab = () => {
  setFormData({ ...formData, Rujukan: labSelections.join(', ') });
  toggleLabOverlay();
};
const [summary, setSummary] = useState(null);

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
};

const handleSave = () => {
    // Lakukan penyimpanan data ke database atau proses lainnya di sini
    
    console.log('Data disimpan:', formData);

    // Menampilkan ringkasan data yang disimpan
    setSummary(formData);
};
const toggleLabOverlay = () => {
  setShowLabOverlay(!showLabOverlay);
};

const toggleXRayOverlay = () => {
  setShowXRayOverlay(!showXRayOverlay);
};

  

  const [medicines, setMedicines] = useState([
    { namaObat: '', jumlah: '', kandungan: '', waktuMakan: '', berapaKali: '', harga: '' }
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...medicines];
    list[index][name] = value;
    setMedicines(list);
  };

  const handleAddClick = () => {
    setMedicines([...medicines, { namaObat: '', jumlah: '', kandungan: '', waktuMakan: '', berapaKali: '', harga: '' }]);
  };

  const handleRemoveClick = index => {
    const list = [...medicines];
    list.splice(index, 1);
    setMedicines(list);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
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
                        to="/Drdashboard" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Dashboard')}
                    >
                        <span><i className="ti ti-layout-dashboard"></i></span>
                        <span className="hide-menu">Dashboard</span>
                    </NavLink>
                    <NavLink 
                        className={`sidebar-link ${activePage === 'Monitoring' ? 'active' : ''}`} 
                        to="/Drmonitor" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Monitoring')}
                    >
                        <span><i className="ti ti-heart-rate-monitor"></i></span>
                        <span className="hide-menu">Monitoring</span>
                    </NavLink>
                    <NavLink 
                        className={`sidebar-link ${activePage === 'Riwayat Medis' ? 'active' : ''}`} 
                        to="/RiwayatMedis" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Riwayat Medis')}
                    >
                        <span><i className="ti ti-heart"></i></span>
                        <span className="hide-menu">Riwayat Medis</span>
                    </NavLink>
                    <NavLink 
                        className={`sidebar-link ${activePage === 'Faktor Resiko' ? 'active' : ''}`} 
                        to="/Faktorresiko" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Faktor Resiko')}
                    >
                        <span>
                  <i class="ti ti-device-heart-monitor"></i>
                </span>
                <span class="hide-menu">Faktor Resiko</span>
                    </NavLink>
                    <NavLink 
    className={`sidebar-link ${activePage === 'Prediksi Resiko' ? 'active' : ''}`} 
    to="/prediksiresiko" 
    aria-expanded="false" 
    onClick={() => handleSetActivePage('Prediksi Resiko')}
>
    <span><i className="ti ti-calculator"></i></span>
    <span className="hide-menu">Prediksi Resiko</span>
</NavLink>
<NavLink 
    className={`sidebar-link ${activePage === 'Riwayat Deteksi' ? 'active' : ''}`} 
    to="/riwayatdeteksi" 
    aria-expanded="false" 
    onClick={() => handleSetActivePage('Riwayat Deteksi')}
>
    <span><i className="ti ti-history"></i></span>
    <span className="hide-menu">Riwayat Deteksi</span>
</NavLink>
<NavLink 
    className={`sidebar-link ${activePage === 'Treatment' ? 'active' : ''}`} 
    to="/treatment" 
    aria-expanded="false" 
    onClick={() => handleSetActivePage('Treatment')}
>
    <span><i className="ti ti-hand-finger"></i></span>
    <span className="hide-menu">Treatment</span>
</NavLink>
<NavLink 
    className={`sidebar-link ${activePage === 'Rekomendasi' ? 'active' : ''}`} 
    to="/rekomendasi" 
    aria-expanded="false" 
    onClick={() => handleSetActivePage('Rekomendasi')}
>
    <span><i className="ti ti-thumb-up"></i></span>
    <span className="hide-menu">Rekomendasi</span>
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
        <div class="row">
          
          <div class="col-lg-8 d-flex align-items-stretch" style={{width: '100%'}}>
            <div class="card w-100">
              <div class="card-body p-4 width" >
                <h5 class="card-title fw-semibold mb-4">Ringkasan Riwayat Medis</h5>
                <div class="table-responsive">
                  <table class="table text-nowrap mb-0 align-middle">
                    <thead class="text-dark fs-4">
                      <tr>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">No</h6>
                        </th>

                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Anamnesa</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Priority</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Waktu</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">1</h6></td>
                        <td class="border-bottom-0">
                          <p class="mb-0 fw-normal">Sakit di bagian dada</p>
                        </td>
                        <td class="border-bottom-0">
                          <div class="d-flex align-items-center gap-2">
                            <span class="badge bg-danger rounded-3 fw-semibold">High</span>
                          </div>
                        </td>
                        <td class="border-bottom-0">
                          <h6 class="fw mb-0 fs-4">17/02/23</h6>
                        </td>
                      </tr> 
                      <tr>
                        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">2</h6></td>
                        <td class="border-bottom-0">
                          <p class="mb-0 fw-normal">Sesak Nafas</p>
                        </td>
                        <td class="border-bottom-0">
                          <div class="d-flex align-items-center gap-2">
                          <span class="badge bg-secondary rounded-3 fw-semibold">Medium</span>
                          </div>
                        </td>
                        <td class="border-bottom-0">
                        <h6 class="fw mb-0 fs-4">17/02/23</h6>
                        </td>
                      </tr> 
                      <tr>
                        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">3</h6></td>
                        <td class="border-bottom-0">
                          <p class="mb-0 fw-normal">Rasa panas yang tinggi tapi pusing dan meriang</p>
                        </td>
                        <td class="border-bottom-0">
                          <div class="d-flex align-items-center gap-2">
                          <span class="badge bg-secondary rounded-3 fw-semibold">Medium</span>
                          </div>
                        </td>
                        <td class="border-bottom-0">
                        <h6 class="fw mb-0 fs-4">17/02/23</h6>
                        </td>
                      </tr> 
                      <tr>
                        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">4</h6></td>
                        <td class="border-bottom-0">
                          <p class="mb-0 fw-normal">gelisah galau merana</p>
                        </td>
                        <td class="border-bottom-0">
                          <div class="d-flex align-items-center gap-2">
                            <span class="badge bg-primary rounded-3 fw-semibold">Low</span>
                          </div>
                        </td>
                        <td class="border-bottom-0">
                          <h6 class="fw mb-0 fs-4">17/02/23</h6>
                        </td>
                      </tr>                    
                    </tbody>
                  </table>
                </div>
                
              </div>
              
              
            </div>
            
          </div>
          
        </div>
        <div class="row">
          
          <div class="col-lg-8 d-flex align-items-stretch" style={{width: '100%'}}>
            <div class="card w-100">
              <div class="card-body p-4 width" >
                <h5 class="card-title fw-semibold mb-4">Details</h5>
                <div class="table-responsive">
                <div class="tabs">

                    <input type="radio" name="tabs" id="tabone"/>
                    <label for="tabone">Observasi</label>
                    <div class="tab">
                      <h4 className="fw-semibold" style={{paddingTop:'20px'}}>Observasi Nurse</h4> 
                    
            <div className="row">
              <div className="col-md-4" style={{width : '100%'}}>
                
                <div className="accord">
	<details>
		<summary className="fw-semibold">
			12 Maret 2039 <br/><h8 className="fw-light">08:21</h8>
		</summary>
		<div>
      <h5>Pemeriksaan Tanda Vital</h5>
      <h6>Tekanan Darah Sistolik: <h8 className="fw-light">12</h8></h6>
      <h6>Tekanan Darah Diastolik: <h8 className="fw-light">12</h8></h6>
      <h6>Temperatur: <h8 className="fw-light">12</h8></h6>
      <h6>Laju Pernafasan: <h8 className="fw-light">12</h8></h6>
      <h6>Presentase SpO2: <h8 className="fw-light">12</h8></h6>
      <h6>Tinggi Badan: <h8 className="fw-light">12</h8></h6>
      <h6>Berat Badan: <h8 className="fw-light">12</h8></h6>
      <h6>LILA: <h8 className="fw-light">12</h8></h6>
      <h6>AVPU: <h8 className="fw-light">12</h8></h6>

		</div>
	</details>
	<details>
  <summary className="fw-semibold">
			12 Maret 2039 <br/><h8 className="fw-light">08:21</h8>
		</summary>
		<div>
    <h5>Pemeriksaan Tanda Vital</h5>
      <h6>Tekanan Darah Sistolik: <h8 className="fw-light">12</h8></h6>
      <h6>Tekanan Darah Diastolik: <h8 className="fw-light">12</h8></h6>
      <h6>Temperatur: <h8 className="fw-light">12</h8></h6>
      <h6>Laju Pernafasan: <h8 className="fw-light">12</h8></h6>
      <h6>Presentase SpO2: <h8 className="fw-light">12</h8></h6>
      <h6>Tinggi Badan: <h8 className="fw-light">12</h8></h6>
      <h6>Berat Badan: <h8 className="fw-light">12</h8></h6>
      <h6>LILA: <h8 className="fw-light">12</h8></h6>
      <h6>AVPU: <h8 className="fw-light">12</h8></h6>
		</div>
	</details>
	<details>
  <summary className="fw-semibold">
			21 April 2019 <br/><h8 className="fw-light">12:21</h8>
		</summary>
		<div>
    <h5>Pemeriksaan Tanda Vital</h5>
      <h6>Tekanan Darah Sistolik: <h8 className="fw-light">12</h8></h6>
      <h6>Tekanan Darah Diastolik: <h8 className="fw-light">12</h8></h6>
      <h6>Temperatur: <h8 className="fw-light">12</h8></h6>
      <h6>Laju Pernafasan: <h8 className="fw-light">12</h8></h6>
      <h6>Presentase SpO2: <h8 className="fw-light">12</h8></h6>
      <h6>Tinggi Badan: <h8 className="fw-light">12</h8></h6>
      <h6>Berat Badan: <h8 className="fw-light">12</h8></h6>
      <h6>LILA: <h8 className="fw-light">12</h8></h6>
      <h6>AVPU: <h8 className="fw-light">12</h8></h6>
			</div>
	</details>
	<details>
  <summary className="fw-semibold">
			17 Agustus 2039 <br/><h8 className="fw-light">09:11</h8>
		</summary>
		<div>
    <h5>Pemeriksaan Tanda Vital</h5>
      <h6>Tekanan Darah Sistolik: <h8 className="fw-light">12</h8></h6>
      <h6>Tekanan Darah Diastolik: <h8 className="fw-light">12</h8></h6>
      <h6>Temperatur: <h8 className="fw-light">12</h8></h6>
      <h6>Laju Pernafasan: <h8 className="fw-light">12</h8></h6>
      <h6>Presentase SpO2: <h8 className="fw-light">12</h8></h6>
      <h6>Tinggi Badan: <h8 className="fw-light">12</h8></h6>
      <h6>Berat Badan: <h8 className="fw-light">12</h8></h6>
      <h6>LILA: <h8 className="fw-light">12</h8></h6>
      <h6>AVPU: <h8 className="fw-light">12</h8></h6>
			</div>
	</details>
</div>
              </div>
        
                      </div>  
                                     
                    </div>
                    
                     

                    <input type="radio" name="tabs" id="tabtwo"/>
                    <label for="tabtwo">Diagnosa</label>
                    <div className="tab">
            <div>
                <h6 className="Tanda fw-bold">Anamnesis dan Pemeriksaan fisik</h6>
                <textarea name="Anamnesis" value={formData.Anamnesis} onChange={handleChange} className="form-sels" />
                <h6 className="Tanda fw-bold">Diagnosa (A)</h6>
                <textarea name="Diagnosa" value={formData.Diagnosa} onChange={handleChange} className="form-sels" />
                <h6 className="Tanda fw-bold">Status Lokalis</h6>
                <select name="StatusLokalis" value={formData.StatusLokalis} onChange={handleChange} className="form-sels">
                    <option value="">Pilih status</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <h6 className="Tanda fw-bold">Pemeriksaan Penunjang</h6>
                <textarea name="PemeriksaanPenunjang" value={formData.PemeriksaanPenunjang} onChange={handleChange} className="form-sels" />
                <h6 className="Tanda fw-bold">Rencana dan Terapi</h6>
                <textarea name="RencanaTerapi" value={formData.RencanaTerapi} onChange={handleChange} className="form-sels" />
                <h5 className="Tanda fw-bold">Diagnosa Berdasarkan ICD-11</h5>
                <input name="DiagnosaICD11" type="text" value={formData.DiagnosaICD11} onChange={handleChange} className="ctw-input" autoComplete="off" data-ctw-ino="1" />
                <h6 className="Tanda fw-bold">Dirujuk Ke</h6>
                <div className="Rujukbtn">
                    <button type="button" className="btn btn-primary" onClick={toggleLabOverlay}>
                        Lab
                    </button>
                    <button type="button" className="btn btn-primary" onClick={toggleXRayOverlay}>
                        X-Ray
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSave}>
                        Simpan
                    </button>
                </div>
            </div>
            {showLabOverlay && (
        <div className="modal fade show" id="labOverlay" tabIndex="-1" aria-labelledby="labOverlayLabel" aria-hidden="true" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="labOverlayLabel">Pilih Jenis Pemeriksaan Lab</h5>
                <button type="button" className="btn-close" onClick={toggleLabOverlay}></button>
              </div>
              
              <div className="modal-body">
              <h6>Jenis Pemeriksaan Lab:</h6>
              <div className="lalala">
  <div className="Organ">
    <h6>Organ:</h6>
  <label className="checkbox-label">
    <input type="checkbox" value="carnial" onChange={handleLabChange} />
    Carnial
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="waters" onChange={handleLabChange} />
    Waters
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="vert_cervical" onChange={handleLabChange} />
    Vert cervical
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="clavicula" onChange={handleLabChange} />
    Clavicula
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="thorax" onChange={handleLabChange} />
    Thorax
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="bno" onChange={handleLabChange} />
    BNO
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="pelvis" onChange={handleLabChange} />
    Pelvis
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="manus" onChange={handleLabChange} />
    Manus
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="wrist" onChange={handleLabChange} />
    Wrist
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="antebrachi" onChange={handleLabChange} />
    Antebrachi
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="elbow" onChange={handleLabChange} />
    Elbow
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="humerus" onChange={handleLabChange} />
    Humerus
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="shoulder" onChange={handleLabChange} />
    Shoulder
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="femur" onChange={handleLabChange} />
    Femur
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="cruris" onChange={handleLabChange} />
    Cruris
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="genu" onChange={handleLabChange} />
    Genu
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="ankle" onChange={handleLabChange} />
    Ankle
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="pedis" onChange={handleLabChange} />
    Pedis
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="vert_thoracal" onChange={handleLabChange} />
    Vert thoracal
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="vert_lumbosacral" onChange={handleLabChange} />
    Vert lumbosacral
  </label>
  </div>
  <div className="Organ">
  <h6>Hematologi:</h6>
  <label className="checkbox-label">
    <input type="checkbox" value="darah_lengkap" onChange={handleLabChange} />
    Darah Lengkap
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="darah_rutin" onChange={handleLabChange} />
    Darah Rutin
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="hemoglobin" onChange={handleLabChange} />
    Hemoglobin
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="lekosit" onChange={handleLabChange} />
    Lekosit
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="eritrosit" onChange={handleLabChange} />
    Eritrosit
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="trombosit" onChange={handleLabChange} />
    Trombosit
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="hermatokrit" onChange={handleLabChange} />
    Hematokrit
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="diff_count" onChange={handleLabChange} />
    Diff Count
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="mcv_mch_mchc" onChange={handleLabChange} />
    MCV MCH MCHC
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="gol_dar_rhesus" onChange={handleLabChange} />
    Gol. Darah & Rhesus
  </label>
</div>
<div className="Organ">
  <h6>Urinologi:</h6>
  <label className="checkbox-label">
    <input type="checkbox" value="urin_lengkap" onChange={handleLabChange} />
    Urin Lengkap
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="urin_rutin" onChange={handleLabChange} />
    Urin Rutin
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="glukosa_urin" onChange={handleLabChange} />
    Glukosa Urin
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="protein_urin" onChange={handleLabChange} />
    Protein Urin
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="bilirubin_urin" onChange={handleLabChange} />
    Bilirubin Urin
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="tes_kehamilan" onChange={handleLabChange} />
    Tes Kehamilan
  </label>
</div>
<div className="Organ">
  <h6>Kimia Darah:</h6>
  <label className="checkbox-label">
    <input type="checkbox" value="gula_darah_sewaktu" onChange={handleLabChange} />
    Gula Darah Sewaktu
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="gula_darah_puasa" onChange={handleLabChange} />
    Gula Darah Puasa
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="gula_darah_2_jam_pp" onChange={handleLabChange} />
    Gula Darah 2 Jam PP
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="hba_1c" onChange={handleLabChange} />
    HbA1c
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="cholestrol" onChange={handleLabChange} />
    Cholestrol
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="trigliserida" onChange={handleLabChange} />
    Trigliserida
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="hdl_cholestrol" onChange={handleLabChange} />
    HDL Cholestrol
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="ldl_cholestrol" onChange={handleLabChange} />
    LDL Cholestrol
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="asam_urat" onChange={handleLabChange} />
    Asam Urat
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="ureum" onChange={handleLabChange} />
    Ureum
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="keratin" onChange={handleLabChange} />
    Keratin
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="sgot" onChange={handleLabChange} />
    SGOT
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="sgpt" onChange={handleLabChange} />
    SGPT
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="bilirubin_total" onChange={handleLabChange} />
    Bilirubin Total
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="bilirubin_i_d" onChange={handleLabChange} />
    Bilirubin I.D.
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="albumin" onChange={handleLabChange} />
    Albumin
  </label>
</div>
<div className="Organ">
  <h6>Imunologi & Serologi:</h6>
  <label className="checkbox-label">
    <input type="checkbox" value="widai_test" onChange={handleLabChange} />
    Widal Test
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="hbs_ag" onChange={handleLabChange} />
    HBsAg
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="anti_hcv" onChange={handleLabChange} />
    Anti-HCV
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="vdrl" onChange={handleLabChange} />
    VDRL
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="tpha" onChange={handleLabChange} />
    TPHA
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="rf" onChange={handleLabChange} />
    RF
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="asto" onChange={handleLabChange} />
    ASTO
  </label>
  <label className="checkbox-label">
    <input type="checkbox" value="ns_1_dengue" onChange={handleLabChange} />
    NS-1 Dengue
  </label>
</div>

</div>
</div>


              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleSaveLab}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
            {showXRayOverlay && (
                <div className="modal fade show" id="xRayOverlay" tabIndex="-1" aria-labelledby="xRayOverlayLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="xRayOverlayLabel">Pilih Jenis Pemeriksaan X-Ray</h5>
                                <button type="button" className="btn-close" onClick={toggleXRayOverlay}></button>
                            </div>
                            <div className="modal-body">
                                {/* Konten overlay untuk memilih jenis pemeriksaan X-Ray */}
                                <h6>Jenis Pemeriksaan X-Ray:</h6>
                                <textarea name="Xray" value={formData.Xray} onChange={handleChange} className="form-sels" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleXRayOverlay}>Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {summary && (
                <div className="summary">
                  <br />
                    <h2>Ringkasan Data:</h2>
                    <ul>
                        {Object.entries(summary).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

                    <input type="radio" name="tabs" id="tabthree"/>
                    <label for="tabthree">Obat</label>
                    <div class="tab">
                    <div>
      <h6>Input Obat</h6>
      {medicines.map((medicine, index) => (
        <div key={index}>
          <div className="Obat">
                      <div className="inputand">
                        <h6>Nama Obat</h6>    
                        <div className="input-wrapper">
                         <input  type="text" name="namaObat" value={medicine.namaObat} onChange={event => handleInputChange(index, event)} className="form-sel" />
                          <span className="placeholder"></span>
                        </div>
                      </div>
                      
                      <div className="inputand">
                        <h6>Jumlah Obat</h6>    
                        <div className="input-wrapper">
                         <input              type="text"
            name="jumlah"
            value={medicine.jumlah}
            onChange={event => handleInputChange(index, event)} className="form-sel" />
                          <span className="placeholder"></span>
                        </div>
                      </div>
                      <div className="inputand">
                        <h6>Kandungan</h6>    
                        <div className="input-wrapper">
                         <input type="text"
            name="kandungan"
            value={medicine.kandungan}
            onChange={event => handleInputChange(index, event)} className="form-sel" />
                          <span className="placeholder"></span>
                        </div>
                      </div>
                      <div className="inputand">
                        <h6>Waktu Makan</h6>    
                        <div className="input-wrapper">
                         <input type="text"
            name="kandungan"
            value={medicine.kandungan}
            onChange={event => handleInputChange(index, event)} className="form-sel" />
                          <span className="placeholder"></span>
                        </div>
                      </div>
                      <div className="inputand">
                        <h6>Waktu Makan</h6>    
                        <div className="input-wrapper">
                         <input  type="text"
            placeholder="Waktu Makan"
            name="waktuMakan"
            value={medicine.waktuMakan}
            onChange={event => handleInputChange(index, event)} className="form-sel" />
                          <span className="placeholder"></span>
                        </div>
                      </div>
                      <div className="inputand">
                        <h6>Total Sehari</h6>    
                        <div className="input-wrapper">
                         <input  type="text"
            name="berapaKali"
            value={medicine.berapaKali}
            onChange={event => handleInputChange(index, event)} className="form-sel" />
                          <span className="placeholder"></span>
                        </div>
                      </div>
            </div>
          {index === medicines.length - 1 && <button class="btn btn-info m-1" onClick={handleAddClick}>Tambah Obat</button>}
          {index > 0 && <button class="btn btn-danger m-1" onClick={() => handleRemoveClick(index)}>Hapus Obat</button>}
        </div>
      ))}
      <div>
        <button class="btn btn-success m-1">Simpan</button>
      </div>
    </div>
                    </div>
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
export default Drmonitor;
