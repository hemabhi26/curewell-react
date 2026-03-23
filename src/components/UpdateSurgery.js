import React, { useState } from 'react';
import { editSurgery } from '../services/api';

// totalMinutes e.g. 570 -> { hours: '9', minutes: '30' }
const minutesToHoursMinutes = (totalMinutes) => {
  const mins    = Math.round(parseFloat(totalMinutes));
  const hours   = Math.floor(mins / 60);
  const minutes = mins % 60;
  return { hours: String(hours), minutes: String(minutes) };
};

// hours + minutes -> totalMinutes e.g. 9, 30 -> 570
const toTotalMinutes = (hours, minutes) => {
  return parseInt(hours) * 60 + parseInt(minutes);
};

export default function UpdateSurgery({ navigate, params }) {
  const [surgeryId]       = useState(params?.surgeryId       || '');
  const [doctorId]        = useState(params?.doctorId        || '');
  const [surgeryDate]     = useState(params?.surgeryDate      || '');
  const [surgeryCategory] = useState(params?.surgeryCategory  || '');

  const initStart = minutesToHoursMinutes(params?.startTime ?? 0);
  const initEnd   = minutesToHoursMinutes(params?.endTime   ?? 0);

  const [startHour,   setStartHour]   = useState(initStart.hours);
  const [startMinute, setStartMinute] = useState(initStart.minutes);
  const [endHour,     setEndHour]     = useState(initEnd.hours);
  const [endMinute,   setEndMinute]   = useState(initEnd.minutes);

  const [touchedStart, setTouchedStart] = useState(false);
  const [touchedEnd,   setTouchedEnd]   = useState(false);
  const [errorMsg, setErrorMsg]         = useState('');

  const isStartEmpty = startHour === '' || startMinute === '';
  const isEndEmpty   = endHour   === '' || endMinute   === '';

  const handleEditSurgery = async () => {
    setTouchedStart(true);
    setTouchedEnd(true);
    if (isStartEmpty || isEndEmpty) return;

    const st = toTotalMinutes(startHour, startMinute);
    const et = toTotalMinutes(endHour,   endMinute);

    if (st >= et) {
      alert('Start time must be less than End time.');
      return;
    }

    try {
      const status = await editSurgery({ surgeryId, startTime: st, endTime: et });
      if (status.success) {
        alert('Surgery details updated successfully!');
        console.log('Updated surgery details successfully.');
        navigate('view-todays-surgery');
      } else {
        alert('Surgery details not updated');
        navigate('view-todays-surgery');
      }
    } catch (error) {
      setErrorMsg('Some error occurred');
      alert('Some error occurred');
      navigate('view-todays-surgery');
    }
  };

  return (
    <div className="card card-medium">
      <h2 className="section-title">Update Surgery</h2>

      {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

      <div className="form-group">
        <label className="form-label">Surgery Id</label>
        <input className="form-control" value={surgeryId} readOnly />
      </div>

      <div className="form-group">
        <label className="form-label">Doctor Id</label>
        <input className="form-control" value={doctorId} readOnly />
      </div>

      <div className="form-group">
        <label className="form-label">Surgery Date</label>
        <input className="form-control" value={`${surgeryDate}T00:00:00`} readOnly />
      </div>

      <div className="form-group">
        <label className="form-label">
          Start Time <span className="readonly-note">(24 Hours Format)</span>
        </label>
        <div className="time-inputs">
          <div className="time-field">
            <input className="form-control" type="number" min="0" max="23"
              value={startHour} onChange={e => setStartHour(e.target.value)}
              onBlur={() => setTouchedStart(true)} placeholder="HH" />
            <span className="time-label">Hours</span>
          </div>
          <span className="time-colon">:</span>
          <div className="time-field">
            <input className="form-control" type="number" min="0" max="59"
              value={startMinute} onChange={e => setStartMinute(e.target.value)}
              onBlur={() => setTouchedStart(true)} placeholder="MM" />
            <span className="time-label">Minutes</span>
          </div>
        </div>
        {touchedStart && isStartEmpty && <div className="error-text">Start Time is required.</div>}
      </div>

      <div className="form-group">
        <label className="form-label">
          End Time <span className="readonly-note">(24 Hours Format)</span>
        </label>
        <div className="time-inputs">
          <div className="time-field">
            <input className="form-control" type="number" min="0" max="23"
              value={endHour} onChange={e => setEndHour(e.target.value)}
              onBlur={() => setTouchedEnd(true)} placeholder="HH" />
            <span className="time-label">Hours</span>
          </div>
          <span className="time-colon">:</span>
          <div className="time-field">
            <input className="form-control" type="number" min="0" max="59"
              value={endMinute} onChange={e => setEndMinute(e.target.value)}
              onBlur={() => setTouchedEnd(true)} placeholder="MM" />
            <span className="time-label">Minutes</span>
          </div>
        </div>
        {touchedEnd && isEndEmpty && <div className="error-text">End Time is required.</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Surgery Category</label>
        <input className="form-control" value={surgeryCategory} readOnly />
      </div>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={handleEditSurgery}>Update</button>
        <button className="btn btn-outline" onClick={() => navigate('view-todays-surgery')}>Cancel</button>
      </div>
    </div>
  );
}
