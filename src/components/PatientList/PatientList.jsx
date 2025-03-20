import React from 'react';
import { List } from '@mui/material';
import PatientListItem from '../PatientListItem/PatientListItem';
import './PatientList.css';

const PatientList = ({ patients, selectedPatient, onSelectPatient }) => {
  return (
    <List className="patient-list">
      {patients.map((patient) => (
        <PatientListItem
          key={patient.id}
          patient={patient}
          isSelected={selectedPatient && selectedPatient.id === patient.id}
          onClick={() => onSelectPatient(patient)}
        />
      ))}
    </List>
  );
};

export default PatientList;