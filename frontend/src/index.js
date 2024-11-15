import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Register from './View/Register.jsx'
import Drmonitor from './View/Drmonitor.jsx'
import Home from './View/home.jsx'
import RiwayatMedis from './View/RiwayatMedis.jsx';
import Faktorresiko from './View/Faktorresiko.jsx';
import Prediksiresiko from './View/prediksiresiko.jsx';
import Riwayatdeteksi from './View/Riwayatdeteksi.jsx';
import Treatment from './View/Treatment.jsx';
import Rekomendasi from './View/Rekomendasi.jsx';
import DrDashboard from './View/Drdashboard.jsx';
import Antrian from './View/Antrian.jsx';
import Susterdashboard from './View/Susterdashboard.jsx'
import SusAntri from './View/SusAntri.jsx'
import DataPasien from './View/DataPasien.jsx';
import DataNakes from './View/DataNakes.jsx';
import DataSuperAdmin from './View/DataSuperAdmin.jsx'
import DashboardGamma from './View/GammaDashboard.jsx'
import SuperAdminDashboard from './View/SuperAdminDashboard.jsx';
import DataMitra from './View/DataMitra.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.js';
import Login from './View/login.jsx';
import Target from './View/Target.jsx';

import DrAntri from './View/DrAntri.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/Register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/Drmonitor",
    element: <Drmonitor/>
  },
  {
    path: "/RiwayatMedis",
    element: <RiwayatMedis/>
  },
  {
    path: "/Faktorresiko",
    element: <Faktorresiko/>
  },
  {
    path: "/Prediksiresiko",
    element: <Prediksiresiko/>
  },
  {
    path: "/Riwayatdeteksi",
    element: <Riwayatdeteksi/>
  },
  {
    path: "/Treatment",
    element: <Treatment/>
  },
  {
    path: "/Rekomendasi",
    element: <Rekomendasi/>
  },
  {
    path: "/DrAntri",
    element: <DrAntri/>
  },
  {
    path: "/Susterdashboard",
    element: <Susterdashboard/>
  },
  {
    path: "/SusAntri",
    element: <SusAntri/>
  },
  {
    path: "/Antrian",
    element: <Antrian/>
  },
  {
    path: "/DataPasien",
    element: <DataPasien/>
  },
  {
    path: "/SuperAdmin",
    element: <SuperAdminDashboard/>
  },
  {
    path: "/DataNakes",
    element: <DataNakes/>
  },
  {
    path: "/Target",
    element: <Target/>
  },
  {
    path: "/DrDashboard",
    element: <DrDashboard/>
  },
  {
    path: "/DashboardGamma",
    element: <DashboardGamma/>
  },
  {
    path: "/DataSuperAdmin",
    element: <DataSuperAdmin/>
  },
  {
    path: "/DataMitra",
    element: <DataMitra/>
  }
]);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);