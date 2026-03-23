import React, { useState, useEffect } from 'react';
import { getDoctors, addDoctor, getAllSpecializations } from '../services/api';

export default function AddDoctor({ navigate }) {
  const [doctorId, setDoctorId]               = useState('');
  const [doctorName, setDoctorName]           = useState('');
  const [specializationCode, setSpecializationCode] = useState('');
  const [touchedId, setTouchedId]             = useState(false);
  const [touchedName, setTouchedName]         = useState(false);
  const [touchedSpec, setTouchedSpec]         = useState(false);
  const [showDiv, setShowDiv]                 = useState(false);
  const [msg, setMsg]                         = useState('');
  const [errorAddMsg, setErrorAddMsg]         = useState('');
  const [existingIds, setExistingIds]         = useState([]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    // Load existing doctor IDs for duplicate check
    getDoctors()
      .then(data => setExistingIds(data.map(d => d.doctorId)))
      .catch(() => {});

    // Load specializations for dropdown
    getAllSpecializations()
      .then(data => setSpecializations(data))
      .catch(() => {});
  }, []);

  const isDuplicateId = existingIds.includes(parseInt(doctorId));

  const handleAddDoctor = async () => {
    setTouchedId(true);
    setTouchedName(true);
    setTouchedSpec(true);
    if (!doctorId.trim() || !doctorName.trim() || !specializationCode || isDuplicateId) return;

    try {
      const status = await addDoctor({
        doctorId:          parseInt(doctorId),
        doctorName:        doctorName.trim(),
        specializationCode: specializationCode,
      });

      if (status.success) {
        setShowDiv(true);
        setMsg('Doctor successfully added');
        setErrorAddMsg('');
        console.log('Add doctor completed');
        setExistingIds(prev => [...prev, parseInt(doctorId)]);
        setDoctorId('');
        setDoctorName('');
        setSpecializationCode('');
        setTouchedId(false);
        setTouchedName(false);
        setTouchedSpec(false);
      } else {
        setErrorAddMsg(status.message || 'Some error occured');
        setShowDiv(false);
      }
    } catch (error) {
      setShowDiv(false);
      setErrorAddMsg('Some error occured');
    }
  };

  return (
    <div className="card card-narrow">
      <h2 className="page-title">Add a new Doctor</h2>

      {errorAddMsg && <div className="alert alert-error">{errorAddMsg}</div>}

      <div className="form-group">
        <label className="form-label">Doctor Id</label>
        <input
          className="form-control"
          type="number"
          value={doctorId}
          onChange={e => setDoctorId(e.target.value)}
          onBlur={() => setTouchedId(true)}
          placeholder="Enter doctor ID"
        />
        {touchedId && !doctorId.trim() && (
          <div className="error-text">Doctor Id is required</div>
        )}
        {touchedId && doctorId.trim() && isDuplicateId && (
          <div className="error-text">Doctor Id already exists. Please enter a unique Id</div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Doctor Name</label>
        <input
          className="form-control"
          value={doctorName}
          onChange={e => setDoctorName(e.target.value)}
          onBlur={() => setTouchedName(true)}
          placeholder="Enter doctor name"
        />
        {touchedName && !doctorName.trim() && (
          <div className="error-text">Name is required</div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Specialization</label>
        <select
          className="form-control"
          value={specializationCode}
          onChange={e => setSpecializationCode(e.target.value)}
          onBlur={() => setTouchedSpec(true)}
        >
          <option value="">-- Select Specialization --</option>
          {specializations.map(s => (
            <option key={s.specializationCode} value={s.specializationCode}>
              {s.specializationName}
            </option>
          ))}
        </select>
        {touchedSpec && !specializationCode && (
          <div className="error-text">Specialization is required</div>
        )}
      </div>

      {showDiv && msg && <div className="success-text">{msg}</div>}

      <div className="btn-group">
        <button className="btn btn-primary" onClick={handleAddDoctor}>Add Doctor</button>
        <button className="btn btn-outline" onClick={() => navigate('view-doctors')}>Cancel</button>
      </div>
    </div>
  );
}
