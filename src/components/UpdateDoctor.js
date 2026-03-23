import React, { useState } from 'react';
import { editDoctorDetails } from '../services/api';

export default function UpdateDoctor({ navigate, params }) {
  const [doctorId]                  = useState(params?.doctorId   || '');
  const [doctorName, setDoctorName] = useState(params?.doctorName || '');
  const [touched, setTouched]       = useState(false);
  const [errorMsg, setErrorMsg]     = useState('');

  const handleEditDoctorDetails = async () => {
    setTouched(true);
    if (!doctorName.trim()) return;

    try {
      const status = await editDoctorDetails({ doctorId, doctorName: doctorName.trim() });
      if (status.success) {
        alert("Doctor's name updated successfully!");
        console.log('Updated doctor details successfully.');
        navigate('view-doctors');
      } else {
        alert("Doctor's name not updated");
        navigate('view-doctors');
      }
    } catch (error) {
      setErrorMsg('Some error occurred');
      alert('Some error occurred');
      navigate('view-doctors');
    }
  };

  return (
    <div className="card card-narrow">
      <h2 className="page-title">Update Doctor</h2>
      <p className="info-text">All fields are mandatory</p>

      {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

      <div className="form-group">
        <label className="form-label">Doctor Id</label>
        <input className="form-control" value={doctorId} readOnly />
      </div>

      <div className="form-group">
        <label className="form-label">Doctor Name</label>
        <input
          className="form-control"
          value={doctorName}
          onChange={e => setDoctorName(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Enter doctor name"
        />
        {touched && !doctorName.trim() && (
          <div className="error-text">Name is required</div>
        )}
      </div>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={handleEditDoctorDetails}>Update</button>
        <button className="btn btn-outline" onClick={() => navigate('view-doctors')}>Cancel</button>
      </div>
    </div>
  );
}
