import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Box, Badge } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import './PatientListItem.css';
import dummyAvatar from  "../../assets/demo-profile.svg"

const PatientListItem = ({ patient, isSelected, onClick }) => {
  return (
    <ListItem 
      button 
      className={`patient-list-item ${isSelected ? 'selected-patient' : ''}`}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Avatar className="patient-avatar">
          {patient.avatar ? (
            <img src={patient.avatar} alt={patient.name} />
          ) : (
            <img src={dummyAvatar} />
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText 
        primary={<span className="patient-name">{patient.name}</span>} 
        secondary={<span className="patient-info">{patient.info}</span>} 
      />
      <Box className="patient-meta">
        {patient.unread > 0 && (
          <Badge 
            color="error" 
            badgeContent={patient.unread} 
            className="unread-badge"
          />
        )}
        <span className="patient-timestamp">{patient.timestamp}</span>
      </Box>
    </ListItem>
  );
};

export default PatientListItem;