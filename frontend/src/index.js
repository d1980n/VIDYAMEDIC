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
import ProtectedRoute from './protectedRoute.js'; // Import komponen ProtectedRoute
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import { persistor } from './redux/store';
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
    element: (
      <ProtectedRoute>
        <Drmonitor />
      </ProtectedRoute>
    ),
  },
  {
    path: "/RiwayatMedis",
    element: (
      <ProtectedRoute>
        <RiwayatMedis />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Faktorresiko",
    element: (
      <ProtectedRoute>
        <Faktorresiko />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Prediksiresiko",
    element: (
      <ProtectedRoute>
        <Prediksiresiko />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Riwayatdeteksi",
    element: (
      <ProtectedRoute>
        <Riwayatdeteksi />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Treatment",
    element: (
      <ProtectedRoute>
        <Treatment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Rekomendasi",
    element: (
      <ProtectedRoute>
        <Rekomendasi />
      </ProtectedRoute>
    ),
  },
  {
    path: "/DrAntri",
    element: (
      <ProtectedRoute>
        <DrAntri />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Susterdashboard",
    element: (
      <ProtectedRoute>
        <Susterdashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/SusAntri",
    element: (
      <ProtectedRoute>
        <SusAntri />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Antrian",
    element: (
      <ProtectedRoute>
        <Antrian />
      </ProtectedRoute>
    ),
  },
  {
    path: "/DataPasien",
    element: (
      <ProtectedRoute>
        <DataPasien />
      </ProtectedRoute>
    ),
  },
  {
    path: "/SuperAdmin",
    element: (
      <ProtectedRoute>
        <SuperAdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/DataNakes",
    element: (
      <ProtectedRoute>
        <DataNakes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Target",
    element: (
      <ProtectedRoute>
        <Target />
      </ProtectedRoute>
    ),
  },
  {
    path: "/DrDashboard",
    element: (
      <ProtectedRoute>
        <DrDashboard/>
      </ProtectedRoute>
    ),
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
     <Provider store={store}>
  <PersistGate persistor={persistor} loading={null}>
 <RouterProvider router={router}/>
 </PersistGate>
  </Provider>
  </StrictMode>
);