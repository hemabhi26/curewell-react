import React, { useState, useEffect } from 'react';
import { getSurgeriesForToday, deleteSurgery } from '../services/api';

const formatTime = (totalMinutes) => {
  const mins    = Math.round(parseFloat(totalMinutes));
  const hours   = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export default function ViewSurgery({ navigate }) {
  const [surgeryList, setSurgeryList] = useState(null);
  const [errorMsg, setErrorMsg]       = useState('');
  const [successMsg, setSuccessMsg]   = useState('');

  const getTodaySurgery = async () => {
    try {
      const data = await getSurgeriesForToday();
      setSurgeryList(data);
      console.log("Today's Surgery Fetched Successfully");
    } catch (error) {
      setSurgeryList(null);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    getTodaySurgery();
  }, []);

  const editSurgery = (surgery) => {
    navigate('update-surgery', {
      surgeryId:       surgery.surgeryId,
      doctorId:        surgery.doctorId,
      surgeryDate:     surgery.surgeryDate,
      startTime:       surgery.startTime,
      endTime:         surgery.endTime,
      surgeryCategory: surgery.surgeryCategory,
    });
  };

  const removeSurgery = async (surgeryId) => {
    try {
      const status = await deleteSurgery(surgeryId);
      if (status.success) {
        setSuccessMsg('Surgery deleted successfully.');
        setErrorMsg('');
        alert('Surgery deleted successfully!');
        getTodaySurgery();
      } else {
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
      <div className="page-header">
        <h2 className="page-title">View Today's Surgery</h2>
        <button className="btn btn-primary" onClick={() => navigate('add-surgery')}>
          + Add Surgery
        </button>
      </div>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg   && <div className="alert alert-error">{errorMsg}</div>}

      <table>
        <thead>
          <tr>
            <th>Surgery Id</th>
            <th>Doctor Id</th>
            <th>Doctor Name</th>
            <th>Surgery Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Surgery Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {surgeryList === null && (
            <tr><td colSpan={8} className="table-empty">Loading...</td></tr>
          )}
          {surgeryList && surgeryList.length === 0 && (
            <tr><td colSpan={8} className="table-empty">No surgeries scheduled today.</td></tr>
          )}
          {surgeryList && surgeryList.map(s => (
            <tr key={s.surgeryId}>
              <td>{s.surgeryId}</td>
              <td>{s.doctorId ?? 'Deleted'}</td>
              <td>{s.doctorName ?? '—'}</td>
              <td>{s.surgeryDate}</td>
              <td>{formatTime(s.startTime)}</td>
              <td>{formatTime(s.endTime)}</td>
              <td>{s.surgeryCategory}</td>
              <td>
                <div className="td-actions">
                  <button className="btn btn-primary btn-sm" onClick={() => editSurgery(s)}>
                    Edit Surgery Time
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => removeSurgery(s.surgeryId)}>
                    Delete Surgery
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
