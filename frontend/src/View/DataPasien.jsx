import React, { useState ,useEffect } from "react";
import profiles from '../source/user-1.jpg'
import logo from '../source/logo.png'
import '../css/login.css';
import '../css/admindash.css'
import images from '../source/Picture1.png'
import { NavLink } from 'react-router-dom';
import images2 from '../source/img2.png'
function DataPasien() {
  const [showModal, setShowModal] = useState(false);
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
  const [Medicalrecords, setMedicalrecords] = useState([]);
  const [formData, setFormData] = useState({});

  const [daftarPasien, setDaftarPasien] = useState([]);

  
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
          TDS,
          TDD,
          Temperatur,
          Nadi,
          LP,
          Spot,
          TB,
          BB,
          LILA,
          AVPU
    
        };
      
        // Log data untuk memeriksa
        console.log('Form Data:', formData);
      
        try {
          const response = await fetch('http://localhost:3000/medicalrecords', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      console.log('response : ', response);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.statusText}. Server returned: ${errorText}`);
          }
      
          const data = await response.json();
          console.log('Response Data:', data);
      
          if (!data.success) {
            console.error('Server Error:', data.message);
            return;
          }
      
          // Reset form setelah pengiriman berhasil
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
          setShowModal(false);
    
          // Fetch data again after adding a new patient
          fetchMedicalrecords();
        } catch (error) {
          console.error('Error:', error.message);
        }
      };


      const fetchMedicalrecords = async () => {
         try {
    const response = await fetch('http://localhost:3000/medicalrecords/tambah', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${response.statusText}. Server returned: ${errorText}`);
    }

    const data = await response.json();
    console.log('Response Data:', data);

    if (!data.message) {
      console.error('Server Error:', data.message);
      return;
    }

    // Reset form fields
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
    setShowModal(false);

    // Fetch updated medical records
    fetchMedicalrecords();
  } catch (error) {
    console.error('Error:', error.message);
  }
  const fetchMedicalrecords = async () => {
    try {
      const response = await fetch('http://localhost:3000/medicalrecords');
      const data = await response.json();
      if (data.success) {
        setMedicalrecords(data.patients); // Menyimpan data pasien ke state
      } else {
        console.error('Failed to fetch patients:', data.message);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

    // Reset form fields
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
    setShowModal(false);


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

    
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };
  
  
  const fetchDaftarPasien = async (_id) => {
    try {
      const response = await fetch('http://localhost:3000/patients');
      const data = await response.json();
      console.log("response : ", response);
      console.log("data pasien: ", data.patients);

      if (data.success) {
        // Filter patients to get the one with the matching ID
        const selectedPatient = data.patients.find(patient => patient._id === _id);
        
        if (selectedPatient) {
          setDaftarPasien(selectedPatient); // Set state hanya dengan satu pasien
        } else {
          console.error('Patient not found with id:', _id);
        }
      } else {
        console.error('Failed to fetch patients:', data.message);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  };
  useEffect(() => {
    const patientId =  "66f4333649efe987ef467f0c";
    fetchDaftarPasien(patientId);
  }, []);
  
  
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
                <NavLink 
                        className={`sidebar-link ${activePage === 'DataPasien' ? 'active' : ''}`} 
                        to="/DataPasien" 
                        aria-expanded="false" 
                        onClick={() => handleSetActivePage('Datapasien')}
                    >
                        <span><i className="ti ti-layout-dashboard"></i></span>
                        <span className="hide-menu">Data Pasien</span>
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
      <div class="container-fluid" style={{paddingTop: '24px'}}>
        <body className="login">
        </body>
        {/* <!--  Row 1 --> */}
         
          <div class="row" style={{flexWrap:'nowrap'}}>
          <div class="col-lg-8 d-flex align-items-strech " style={{width:'100%'}} >
            <div class="card w-100" style={{maxHeight: '100%', height:'33.2em'}}>
              <div class="card-body">
                <div class="d-sm-flex d-block align-items-center justify-content-between mb-9">
                  <div class="mb-3 mb-sm-0">
                    <h5 class="card-title fw-semibold">Data Pasien</h5>
                  </div>

                </div>

                <div class="chart">
                  <div className="photos" max-width="10">
                    <br/>
                    <br />  
                    <img src={images2} className="photos"height="auto"/>
                  </div>
                <div style={{minWidth: '29rem'}}  className="details">
               
                <table   className="info">
                  <tr class="infos">
                    <th>Nama:</th>
                    <td>{daftarPasien.namaLengkap}</td>
                  </tr>
                  <tr class="infos">
                    <th>Nomor MR: </th>
                    <td>{daftarPasien.nomorMR}</td>
                  </tr>
                  <tr class="infos">
                    <th>Usia: </th>
                    <td>82 Tahun</td>
                  </tr>
                  <tr  class="infos">
                    <th>Alamat: </th>
                    <td>{daftarPasien.alamatLengkap}</td>
                  </tr>
                  <tr class="infos">
                    <th>Jenis Kelamin: </th>
                    <td>{daftarPasien.jenisKelamin}</td>
                  </tr>
                  <tr class="infos">
                    <th>Nomor Ponsel: </th>
                    <td>{daftarPasien.phone_number}</td>
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
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <div className="row"style={{ boxShadow: 'none', backgroundColor: 'transparent', padding:'0px'}}>
                      <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
                        <h6 className="Tanda fw-bold">Tekanan Darah Sistolik</h6>
                        <input type="text" name="TDS" className="form-control" placeholder="mmHg" value={TDS} onChange={(e) => setTekananDarahSistolik(e.target.value)}  />
                      </div>
                      <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
                        <h6 className="Tanda fw-bold">Tekanan Darah Diastolik</h6>
                        <input type="text" name="TDD" className="form-control" placeholder="mmHg" value={TDD} onChange={(e) => setTekanandarahDiastolik(e.target.value)} />
                      </div>
                    </div>
                    <div className="row"style={{ boxShadow: 'none', backgroundColor: 'transparent', padding:'0px'}}>
                      <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
                        <h6 className="Tanda fw-bold">Temperatur</h6>
                        <input type="text" name="Temperatur" className="form-control" placeholder="C" value={Temperatur} onChange={(e) => setTemperatur(e.target.value)} />
                      </div>
                      <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
                        <h6 className="Tanda fw-bold">Nadi</h6>
                        <input type="text" name="Nadi" className="form-control" placeholder="Nadi" value={Nadi} onChange={(e) => setNadi(e.target.value)} />
                      </div>
                    </div>
                    <div className="row"style={{ boxShadow: 'none', backgroundColor: 'transparent', padding:'0px'}}>
                      <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
                        <h6 className="Tanda fw-bold">Laju Pernafasan</h6>
                        <input type="text" name="LP" className="form-control" placeholder="LP" value={LP} onChange={(e) => setLajuPernafasan(e.target.value)} />
                      </div>
                      <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
                        <h6 className="Tanda fw-bold">Presentase SpO2</h6>
                        <input type="text" name="Spot" className="form-control" placeholder="Laju Presentase" value={Spot} onChange={(e) => setSpot(e.target.value)} />
                      </div>
                    </div>
                    <div className="row"style={{ boxShadow: 'none', backgroundColor: 'transparent', padding:'0px'}}>
                      <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
                        <h6 className="Tanda fw-bold">Tinggi Badan</h6>
                        <input type="text" name="TB" className="form-control" placeholder="Cm" value={TB} onChange={(e) => setTinggiBadan(e.target.value)} />
                      </div>
                      <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
                        <h6 className="Tanda fw-bold">Berat Badan</h6>
                        <input type="text" name="BB" className="form-control" placeholder="Kg" value={BB} onChange={(e) => setBeratBadan(e.target.value)} />
                      </div>
                    </div>
                    <div className="row"style={{ boxShadow: 'none', backgroundColor: 'transparent', padding:'0px'}}>
                      <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
                        <h6 className="Tanda fw-bold">LILA</h6>
                        <input type="text" name="LILA" className="form-control" placeholder="LILA" value={LILA} onChange={(e) => setLILA(e.target.value)} />
                      </div>
                      <div className="col-lg-6" style={{ boxShadow: 'none', backgroundColor: 'transparent', paddingBottom:'0px', paddingTop:'0px' }}>
                        <h6 className="Tanda fw-bold">AVPU</h6>
                        <input type="text" name="AVPU" className="form-control" placeholder="AVPU" value={AVPU} onChange={(e) => setAVPU(e.target.value)} />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={tambahMR}>
                      <i className="ti ti-playlist-add"></i> Tambah MR
                    </button>
                  </div>
                  </form>

        
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
export default DataPasien;
