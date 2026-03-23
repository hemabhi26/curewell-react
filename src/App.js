import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ViewDoctors from './components/ViewDoctors';
import AddDoctor from './components/AddDoctor';
import UpdateDoctor from './components/UpdateDoctor';
import ViewSpecializations from './components/ViewSpecializations';
import ViewSurgery from './components/ViewSurgery';
import AddSurgery from './components/AddSurgery';
import UpdateSurgery from './components/UpdateSurgery';

export default function App() {
  const [page, setPage]                         = useState('view-doctors');
  const [editDoctorParam, setEditDoctorParam]   = useState(null);
  const [editSurgeryParam, setEditSurgeryParam] = useState(null);
  const [viewDoctorsParam, setViewDoctorsParam] = useState(null);

  const navigate = (pg, params) => {
    if (pg === 'update-doctor')  setEditDoctorParam(params);
    if (pg === 'update-surgery') setEditSurgeryParam(params);
    if (pg === 'view-doctors')   setViewDoctorsParam(params || null);
    setPage(pg);
  };

  return (
    <>
      <Navbar page={page} navigate={navigate} />
      <div className="page">
        {page === 'view-doctors'         && <ViewDoctors         navigate={navigate} filterParam={viewDoctorsParam} />}
        {page === 'add-doctor'           && <AddDoctor           navigate={navigate} />}
        {page === 'update-doctor'        && <UpdateDoctor        navigate={navigate} params={editDoctorParam} />}
        {page === 'view-specializations' && <ViewSpecializations navigate={navigate} />}
        {page === 'view-todays-surgery'  && <ViewSurgery         navigate={navigate} />}
        {page === 'add-surgery'          && <AddSurgery          navigate={navigate} />}
        {page === 'update-surgery'       && <UpdateSurgery       navigate={navigate} params={editSurgeryParam} />}
      </div>
    </>
  );
}
