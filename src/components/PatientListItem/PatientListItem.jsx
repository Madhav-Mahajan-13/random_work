import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box, Badge } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import './PatientListItem.css';

const PatientListItem = ({ patient, isSelected, onClick }) => {
  const defaultAvatar = patient.avatar || null;
  
  return (
    <ListItem 
      button 
      className={`patient-list-item ${isSelected ? 'selected-patient' : ''}`}
      onClick={onClick}
    >
      <ListItemAvatar>
        {defaultAvatar ? (
          <Avatar src={defaultAvatar} alt={patient.name} className="patient-avatar" />
        ) : (
          <Avatar className="patient-avatar">
            <img src="https://prtlimages.healtharc.io/images/icons/demo-profile.svg" alt="" width={"50px"} />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography component="span" variant="body1" className="patient-name">
            {patient.name}
          </Typography>
        }
        secondary={
          patient.info ? (
            <Typography component="span" variant="body2" className="patient-info">
              {patient.info}
            </Typography>
          ) : null
        }
      />
      <Box className="patient-meta">
        {patient.unread ? (
          <Badge badgeContent={patient.unread} color="primary" className="unread-badge" />
        ) : null}
        <Typography variant="body2" className="patient-timestamp">
          {patient.timestamp}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default PatientListItem;