import React, { useState, useEffect } from 'react';
import { getAllSpecializations } from '../services/api';

export default function ViewSpecializations({ navigate }) {
  const [specializationList, setSpecializationList] = useState(null);
  const [errorMsg, setErrorMsg]                     = useState('');

  const getSpecialization = async () => {
    try {
      const data = await getAllSpecializations();
      setSpecializationList(data);
      console.log('Specialization Fetched Successfully');
    } catch (error) {
      setSpecializationList(null);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    getSpecialization();
  }, []);

  const viewDoctorsBySpecialization = (specializationCode, specializationName) => {
    navigate('view-doctors', { specializationCode, specializationName });
  };

  return (
    <div className="card">
      <h2 className="page-title">View Specialization</h2>

      {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

      <table>
        <thead>
          <tr>
            <th>Specialization Code</th>
            <th>Specialization Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {specializationList === null && (
            <tr><td colSpan={3} className="table-empty">Loading...</td></tr>
          )}
          {specializationList && specializationList.length === 0 && (
            <tr><td colSpan={3} className="table-empty">No specializations found.</td></tr>
          )}
          {specializationList && specializationList.map(s => (
            <tr key={s.specializationCode}>
              <td>{s.specializationCode}</td>
              <td>{s.specializationName}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => viewDoctorsBySpecialization(s.specializationCode, s.specializationName)}
                >
                  View Doctors
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
