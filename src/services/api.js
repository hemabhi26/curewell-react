// CureWell API Service - connects to Node.js backend at localhost:5000

const DOCTORS         = 'http://localhost:5000/api/doctors';
const SPECIALIZATIONS = 'http://localhost:5000/api/specializations';
const SURGERIES       = 'http://localhost:5000/api/surgeries';

const errorHandler = (error) => {
  console.error('API Error:', error);
  throw error;
};

// Doctor APIs

export const getDoctors = async () => {
  try {
    const response = await fetch(`${DOCTORS}`);
    if (!response.ok) throw new Error('Failed to fetch doctors');
    return await response.json();
  } catch (error) { return errorHandler(error); }
};

export const addDoctor = async (doctorObj) => {
  try {
    const response = await fetch(`${DOCTORS}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorObj),
    });
    if (!response.ok) throw new Error('Failed to add doctor');
    return await response.json();
  } catch (error) { return errorHandler(error); }
};

export const editDoctorDetails = async (doctorObj) => {
  try {
    const response = await fetch(`${DOCTORS}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorObj),
    });
    if (!response.ok) throw new Error('Failed to update doctor');
    return await response.json();
  } catch (error) { return errorHandler(error); }
};

// force=true deletes doctor along with all their surgeries
export const deleteDoctor = async (doctorId, force = false) => {
  try {
    const response = await fetch(`${DOCTORS}?doctorId=${doctorId}&force=${force}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) { return errorHandler(error); }
};

export const getDoctorsBySpecialization = async (specializationCode) => {
  try {
    const response = await fetch(`${DOCTORS}/by-specialization?specializationCode=${specializationCode}`);
    if (!response.ok) throw new Error('Failed to fetch doctors by specialization');
    return await response.json();
  } catch (error) { return errorHandler(error); }
};

// Specialization APIs

export const getAllSpecializations = async () => {
  try {
    const response = await fetch(`${SPECIALIZATIONS}`);
    if (!response.ok) throw new Error('Failed to fetch specializations');
    return await response.json();
  } catch (error) { return errorHandler(error); }
};

// Surgery APIs

export const getSurgeriesForToday = async () => {
  try {
    const response = await fetch(`${SURGERIES}/today`);
    if (!response.ok) throw new Error('Failed to fetch surgeries');
    return await response.json();
  } catch (error) { return errorHandler(error); }
};

export const addSurgery = async (surgeryObj) => {
  try {
    const response = await fetch(`${SURGERIES}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(surgeryObj),
    });
    if (!response.ok) throw new Error('Failed to add surgery');
    return await response.json();
  } catch (error) { return errorHandler(error); }
};

export const editSurgery = async (surgeryObj) => {
  try {
    const response = await fetch(`${SURGERIES}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(surgeryObj),
    });
    if (!response.ok) throw new Error('Failed to update surgery');
    return await response.json();
  } catch (error) { return errorHandler(error); }
};

export const deleteSurgery = async (surgeryId) => {
  try {
    const response = await fetch(`${SURGERIES}?surgeryId=${surgeryId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete surgery');
    return await response.json();
  } catch (error) { return errorHandler(error); }
};
