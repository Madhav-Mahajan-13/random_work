import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header/Header';
import TabsContainer from './components/TabsContainer/TabsContainer';
import SearchBar from './components/SearchBar/SearchBar';
import DropdownMenu from './components/DropdownMenu/DropdownMenu';
import PatientList from './components/PatientList/PatientList';

import './App.css';
import Animation from './components/LoadingAnimation/Animation';

// Sample patient data
const patients = [
  { 
    id: 1, 
    name: 'Katrine Reichert', 
    avatar: 'https://statics.teams.cdn.office.net/evergreen-assets/avatars/default-avatar.png', 
    info: 'https://statics.teams.cdn.office.net/evergreen-assets/safelinks/1/atp-safelinks.html',
    dob: 'Dec 12, 1994',
    timestamp: '22:37'
  },
  { 
    id: 2, 
    name: 'Marie Charles', 
    avatar: null, 
    info: 'test test',
    timestamp: '13:03',
    unread: 2
  },
  { 
    id: 3, 
    name: 'Cicero Von', 
    avatar: null, 
    info: '',
    timestamp: '00:22'
  },
  { 
    id: 4, 
    name: 'Madeline Stamm', 
    avatar: null, 
    info: '',
    timestamp: '00:22'
  },
  { 
    id: 5, 
    name: 'Lenora Haley', 
    avatar: null, 
    info: '',
    timestamp: '00:22'
  },
  { 
    id: 6, 
    name: 'Desmond Hermann', 
    avatar: null, 
    info: '',
    timestamp: '00:22'
  },
  { 
    id: 7, 
    name: 'Andy Joe', 
    avatar: 'https://statics.teams.cdn.office.net/evergreen-assets/avatars/colored-avatar.png', 
    info: '',
    timestamp: '00:22'
  }
];

// Sample messages
const messages = [
  {
    id: 1,
    sender: 'Katrine Reichert',
    content: 'Hello',
    timestamp: '2 weeks ago'
  },
  {
    id: 2,
    sender: 'Katrine Reichert',
    content: '123',
    timestamp: '2 weeks ago'
  },
  {
    id: 3,
    sender: 'Katrine Reichert',
    content: 'https://statics.teams.cdn.office.net/evergreen-assets/safelinks/1/atp-safelinks.html',
    timestamp: '2 weeks ago',
    isLink: true
  },
  {
    id: 4,
    sender: 'Katrine Reichert',
    content: 'https://statics.teams.cdn.office.net/evergreen-assets/safelinks/1/atp-safelinks.html',
    timestamp: '2 weeks ago',
    isLink: true
  }
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('RPM');
  const [messageText, setMessageText] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Calculate the total number of unread messages for the In-App counter
  const inAppUnreadCount = patients.reduce((total, patient) => 
    total + (patient.unread || 0), 0);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    if (!timerRunning) {
      setTimerRunning(true);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-container">
        <Box className="sidebar">
          <Header title="Messages" timer={timerRunning ? formatTime(timer) : "0 Sec"} />
          <TabsContainer 
            activeTab={activeTab} 
            handleTabChange={handleTabChange}
            inAppCount={inAppUnreadCount}
          />
          <Box className="search-container">
            <SearchBar value={searchText} onChange={handleSearchChange} />
            <DropdownMenu value={category} onChange={handleCategoryChange} options={['RPM', 'CCM', 'PCM', 'RTM', 'TCM', 'MTM']} />
          </Box>
          <PatientList 
            patients={patients} 
            selectedPatient={selectedPatient} 
            onSelectPatient={handlePatientSelect}
          />
        </Box>

            <Box className="main-content" >
              <Animation/>
            </Box>
        
        {/* <Box className="main-content">
          {selectedPatient ? (
            <>
              <ConversationHeader patient={selectedPatient} />
              <ConversationArea messages={messages} />
              <MessageInput 
                value={messageText} 
                onChange={handleMessageChange} 
                onSend={handleSendMessage} 
              />
            </>
          ) : (
            <Box className="select-patient-message">
              Please select your patient to start chatting.
            </Box>
          )}
        </Box> */}
      </Box>
    </ThemeProvider>
  );
}

export default App;