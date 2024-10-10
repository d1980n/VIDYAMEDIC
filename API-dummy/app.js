const express = require('express');
const cors = require('cors');
const app = express();
const dataDokter = require('./dataDokter');
const dataSuster = require('./dataSuster');

// Middleware untuk parsing JSON
app.use(express.json());
app.use(cors());

// Endpoint: Get all dokter
app.get('/api/dokter', (req, res) => {
  res.json(dataDokter);
});

// Endpoint: Get dokter by kode_dok
app.get('/api/dokter/:kode_dok', (req, res) => {
  const dokter = dataDokter.find(d => d.kode_dok === req.params.kode_dok);
  if (!dokter) {
    return res.status(404).json({ message: 'Dokter not found' });
  }
  res.json(dokter);
});

// Endpoint: Create new dokter
app.post('/api/dokter', (req, res) => {
  const newDokter = req.body;
  dataDokter.push(newDokter);
  res.status(201).json(newDokter);
});

// Endpoint: Update dokter by kode_dok
app.put('/api/dokter/:kode_dok', (req, res) => {
  const index = dataDokter.findIndex(d => d.kode_dok === req.params.kode_dok);
  if (index === -1) {
    return res.status(404).json({ message: 'Dokter not found' });
  }
  dataDokter[index] = { ...dataDokter[index], ...req.body };
  res.json(dataDokter[index]);
});

// Endpoint: Delete dokter by kode_dok
app.delete('/api/dokter/:kode_dok', (req, res) => {
  const index = dataDokter.findIndex(d => d.kode_dok === req.params.kode_dok);
  if (index === -1) {
    return res.status(404).json({ message: 'Dokter not found' });
  }
  const deletedDokter = dataDokter.splice(index, 1);
  res.json({ message: 'Dokter deleted', deletedDokter });
});

//=====================================================================================================================================================================================================

// Endpoint: Get all suster
app.get('/api/suster', (req, res) => {
  res.json(dataSuster);
});

// Endpoint: Get suster by kode_sus
app.get('/api/suster/:kode_sus', (req, res) => {
  const suster = dataSuster.find(s => s.kode_sus === req.params.kode_sus);
  if (!suster) {
    return res.status(404).json({ message: 'Suster not found' });
  }
  res.json(suster);
});

// Endpoint: Create new dokter
app.post('/api/suster', (req, res) => {
  const newSuster = req.body;
  dataSuster.push(newSuster);
  res.status(201).json(newSuster);
});

// Endpoint: Update dokter by kode_dok
app.put('/api/suster/:kode_sus', (req, res) => {
  const index = dataSuster.findIndex(s => s.kode_sus === req.params.kode_sus);
  if (index === -1) {
    return res.status(404).json({ message: 'Suster not found' });
  }
  dataSuster[index] = { ...dataSuster[index], ...req.body };
  res.json(dataSuster[index]);
});

// Endpoint: Delete dokter by kode_dok
app.delete('/api/suster/:kode_sus', (req, res) => {
  const index = dataSuster.findIndex(s => s.kode_sus === req.params.kode_sus);
  if (index === -1) {
    return res.status(404).json({ message: 'Suster not found' });
  }
  const deletedSuster = dataSuster.splice(index, 1);
  res.json({ message: 'Suster deleted', deletedSuster });
});

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
