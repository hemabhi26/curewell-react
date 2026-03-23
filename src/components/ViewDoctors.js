import React, { useState, useEffect } from 'react';
import { getDoctors, deleteDoctor, getDoctorsBySpecialization } from '../services/api';

export default function ViewDoctors({ navigate, filterParam }) {
  const [doctorList, setDoctorList] = useState(null);
  const [errorMsg, setErrorMsg]     = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getDoctor = async () => {
    try {
      let data;
      if (filterParam?.specializationCode) {
        data = await getDoctorsBySpecialization(filterParam.specializationCode);
      } else {
        data = await getDoctors();
      }
      setDoctorList(data);
      setErrorMsg('');
      console.log('Doctors Fetched Successfully');
    } catch (error) {
      setDoctorList(null);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    getDoctor();
  }, [filterParam]);

  const editDoctorDetails = (doctorId, doctorName) => {
    navigate('update-doctor', { doctorId, doctorName });
  };

  const removeDoctor = async (doctorId, doctorName) => {
    try {
      // First attempt — check if doctor has surgeries
      const status = await deleteDoctor(doctorId, false);

      if (status.success) {
        // Deleted directly — no surgeries
        setSuccessMsg(`Doctor "${doctorName}" deleted successfully.`);
        setErrorMsg('');
        alert('Doctor deleted successfully!');
        getDoctor();

      } else if (status.hasSurgeries) {
        // Doctor has surgeries — ask user to confirm force delete
        const confirmed = window.confirm(
          `${status.message}\n\nClick OK to delete the doctor and all their surgeries.\nClick Cancel to keep the doctor.`
        );

        if (confirmed) {
          // Second attempt — force delete with surgeries
          const forceStatus = await deleteDoctor(doctorId, true);
          if (forceStatus.success) {
            setSuccessMsg(`Doctor "${doctorName}" and all their surgeries deleted successfully.`);
            setErrorMsg('');
            alert('Doctor and all their surgeries deleted successfully!');
            getDoctor();
          } else {
            setErrorMsg(forceStatus.message);
            setSuccessMsg('');
          }
        }

      } else {
        // Some other error
        setErrorMsg(status.message);
        setSuccessMsg('');
        alert(status.message);
      }

    } catch (error) {
      setErrorMsg('Some error occured');
      setSuccessMsg('');
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">
        {filterParam?.specializationName ? `Doctors — ${filterParam.specializationName}` : 'View Doctor'}
      </h2>

      {filterParam?.specializationName && (
        <div className="filter-bar">
          <button className="btn btn-outline btn-sm" onClick={() => navigate('view-specializations')}>
            ← Back to Specializations
          </button>
        </div>
      )}

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg   && <div className="alert alert-error">{errorMsg}</div>}

      <table>
        <thead>
          <tr>
            <th>Doctor Id</th>
            <th>Doctor Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctorList === null && (
            <tr><td colSpan={3} className="table-empty">Loading...</td></tr>
          )}
          {doctorList && doctorList.length === 0 && (
            <tr><td colSpan={3} className="table-empty">No doctors found.</td></tr>
          )}
          {doctorList && doctorList.map(d => (
            <tr key={d.doctorId}>
              <td>{d.doctorId}</td>
              <td>{d.doctorName}</td>
              <td>
                <div className="td-actions">
                  <button className="btn btn-primary btn-sm" onClick={() => editDoctorDetails(d.doctorId, d.doctorName)}>
                    Edit Doctor Details
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => removeDoctor(d.doctorId, d.doctorName)}>
                    Remove Doctor Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
