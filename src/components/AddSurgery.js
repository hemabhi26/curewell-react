import React, { useState, useEffect } from 'react';
import { addSurgery, getDoctors, getAllSpecializations } from '../services/api';

export default function AddSurgery({ navigate }) {
  const [doctorId, setDoctorId]               = useState('');
  const [surgeryDate, setSurgeryDate]         = useState('');
  const [startHour, setStartHour]             = useState('');
  const [startMinute, setStartMinute]         = useState('');
  const [endHour, setEndHour]                 = useState('');
  const [endMinute, setEndMinute]             = useState('');
  const [surgeryCategory, setSurgeryCategory] = useState('');
  const [doctors, setDoctors]                 = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [touched, setTouched]                 = useState(false);
  const [errorMsg, setErrorMsg]               = useState('');
  const [showDiv, setShowDiv]                 = useState(false);

  useEffect(() => {
    getDoctors().then(setDoctors).catch(() => {});
    getAllSpecializations().then(setSpecializations).catch(() => {});
  }, []);

  const toTotalMinutes = (hours, minutes) =>
    parseInt(hours) * 60 + parseInt(minutes);

  const handleAddSurgery = async () => {
    setTouched(true);

    if (!doctorId || !surgeryDate || startHour === '' || startMinute === '' ||
        endHour === '' || endMinute === '' || !surgeryCategory) return;

    const st = toTotalMinutes(startHour, startMinute);
    const et = toTotalMinutes(endHour,   endMinute);

    if (st >= et) {
      setErrorMsg('Start time must be less than End time.');
      return;
    }

    try {
      const status = await addSurgery({
        doctorId:        parseInt(doctorId),
        surgeryDate,
        startTime:       st,
        endTime:         et,
        surgeryCategory,
      });

      if (status.success) {
        setShowDiv(true);
        setErrorMsg('');
        console.log('Add surgery completed');
        // Reset form
        setDoctorId('');
        setSurgeryDate('');
        setStartHour('');
        setStartMinute('');
        setEndHour('');
        setEndMinute('');
        setSurgeryCategory('');
        setTouched(false);
      } else {
        setErrorMsg(status.message || 'Some error occured');
        setShowDiv(false);
      }
    } catch (error) {
      setErrorMsg('Some error occured');
      setShowDiv(false);
    }
  };

  return (
    <div className="card card-medium">
      <h2 className="page-title">Add a new Surgery</h2>

      {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

      <div className="form-group">
        <label className="form-label">Doctor Id</label>
        <select
          className="form-control"
          value={doctorId}
          onChange={e => setDoctorId(e.target.value)}
          onBlur={() => setTouched(true)}
        >
          <option value="">-- Select Doctor --</option>
          {doctors.map(d => (
            <option key={d.doctorId} value={d.doctorId}>
              {d.doctorId} — {d.doctorName}
            </option>
          ))}
        </select>
        {touched && !doctorId && <div className="error-text">Doctor is required</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Surgery Date</label>
        <input
          className="form-control"
          type="date"
          value={surgeryDate}
          onChange={e => setSurgeryDate(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        {touched && !surgeryDate && <div className="error-text">Surgery Date is required</div>}
      </div>

      <div className="form-group">
        <label className="form-label">
          Start Time <span className="readonly-note">(24 Hours Format)</span>
        </label>
        <div className="time-inputs">
          <div className="time-field">
            <input className="form-control" type="number" min="0" max="23"
              value={startHour} onChange={e => setStartHour(e.target.value)}
              onBlur={() => setTouched(true)} placeholder="HH" />
            <span className="time-label">Hours</span>
          </div>
          <span className="time-colon">:</span>
          <div className="time-field">
            <input className="form-control" type="number" min="0" max="59"
              value={startMinute} onChange={e => setStartMinute(e.target.value)}
              onBlur={() => setTouched(true)} placeholder="MM" />
            <span className="time-label">Minutes</span>
          </div>
        </div>
        {touched && (startHour === '' || startMinute === '') && (
          <div className="error-text">Start Time is required</div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          End Time <span className="readonly-note">(24 Hours Format)</span>
        </label>
        <div className="time-inputs">
          <div className="time-field">
            <input className="form-control" type="number" min="0" max="23"
              value={endHour} onChange={e => setEndHour(e.target.value)}
              onBlur={() => setTouched(true)} placeholder="HH" />
            <span className="time-label">Hours</span>
          </div>
          <span className="time-colon">:</span>
          <div className="time-field">
            <input className="form-control" type="number" min="0" max="59"
              value={endMinute} onChange={e => setEndMinute(e.target.value)}
              onBlur={() => setTouched(true)} placeholder="MM" />
            <span className="time-label">Minutes</span>
          </div>
        </div>
        {touched && (endHour === '' || endMinute === '') && (
          <div className="error-text">End Time is required</div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Surgery Category</label>
        <select
          className="form-control"
          value={surgeryCategory}
          onChange={e => setSurgeryCategory(e.target.value)}
          onBlur={() => setTouched(true)}
        >
          <option value="">-- Select Category --</option>
          {specializations.map(s => (
            <option key={s.specializationCode} value={s.specializationCode}>
              {s.specializationCode} — {s.specializationName}
            </option>
          ))}
        </select>
        {touched && !surgeryCategory && (
          <div className="error-text">Surgery Category is required</div>
        )}
      </div>

      {showDiv && <div className="alert alert-success">Surgery added successfully!</div>}

      <div className="btn-group">
        <button className="btn btn-primary" onClick={handleAddSurgery}>Add Surgery</button>
        <button className="btn btn-outline" onClick={() => navigate('view-todays-surgery')}>Cancel</button>
      </div>
    </div>
  );
}
