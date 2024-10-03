import React, { useEffect, useState } from 'react';

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await fetch('http://localhost:3000/medical'); // Update this URL if needed
        if (!response.ok) {
          throw new Error('Failed to fetch medical records');
        }
        const data = await response.json();
        setMedicalRecords(data.medicalRecords); // Assuming your API returns an object with 'medicalRecords'
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Medical Records</h1>
      <ul>
        {medicalRecords.map((record) => (
          <li key={record._id}>
            <h3>Record ID: {record._id}</h3>
            <p>Patient Name: {record.patientName}</p>
            <p>Diagnosis: {record.diagnosis}</p>
            {/* Add other fields as necessary */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalRecords;
