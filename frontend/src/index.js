import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Register from './View/Register'
import Drmonitor from './View/Drmonitor.jsx'
import Home from './View/home'
import RiwayatMedis from './View/RiwayatMedis';
import Faktorresiko from './View/Faktorresiko';
import Prediksiresiko from './View/prediksiresiko';
import Riwayatdeteksi from './View/Riwayatdeteksi';
import Treatment from './View/Treatment.jsx'
import Rekomendasi from './View/Rekomendasi'
import Drdashboard from './View/Drdashboard.jsx'
import Antrian from './View/Antrian.jsx';
import Susterdashboard from './View/Susterdashboard'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
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
    path: "/Drdashboard",
    element: <Drdashboard/>
  },
  {
    path: "/Susterdashboard",
    element: <Susterdashboard/>
  },
  {
    path: "/Antrian",
    element: <Antrian/>
  }
]);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);