import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, IconButton, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../../components/Header/Header';
import TabsContainer from '../../components/TabsContainer/TabsContainer';
import SearchBar from '../../components/SearchBar/SearchBar';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import PatientList from '../../components/PatientList/PatientList';
import ConversationHeader from '../../components/ConversationHeader/ConversationHeader';
import ConversationArea from '../../components/ConversationArea/ConversationArea';
import MessageInput from '../../components/MessageInput/MessageInput';
import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
import app_active from "../../assets/msg-cht.svg";
import app_inactive from "../../assets/app_inactive.svg";
import sms_active from "../../assets/sms_active.svg";
import sms_inactive from "../../assets/sms_inactive.svg";
import './Message.css';

const inAppPatients = [
  { 
    id: 1, 
    name: 'Lucilla Clayton', 
    avatar: null, 
    info: 'What is your pain level today?',
    timestamp: 'Mar 20, 2025',
    dob: 'Dec 12, 1993',
    unread: 0
  },
  { 
    id: 2, 
    name: 'Lauretta Spencer', 
    avatar: null, 
    info: 'What is your pain level today?',
    timestamp: 'Mar 20, 2025',
    unread: 0
  },
  { 
    id: 3, 
    name: 'Garry Yoshiko', 
    avatar: null, 
    info: 'Do you have difficulty breathing?',
    timestamp: 'Mar 20, 2025',
    unread: 1
  },
  { 
    id: 4, 
    name: 'Oswaldo H Elmo', 
    avatar: null, 
    info: 'What is your pain level today?',
    timestamp: 'Mar 20, 2025',
    unread: 0
  },
  { 
    id: 5, 
    name: 'Chas Booker', 
    avatar: null, 
    info: 'Do you have any Fatigue today?',
    timestamp: 'Mar 20, 2025',
    unread: 0
  },
  { 
    id: 6, 
    name: 'Latanya Aurelio', 
    avatar: null, 
    info: 'Have you used your medication today?',
    timestamp: 'Mar 20, 2025',
    unread: 2
  }
];

// Sample patient data for SMS messages
const smsPatients = [
  { 
    id: 1, 
    name: 'Jeanette Miller', 
    avatar: null, 
    info: `'I've scheduled your appointment for Friday'`,
    timestamp: 'Mar 20, 2025',
    unread: 1
  },
  { 
    id: 2, 
    name: 'Samuel Parker', 
    avatar: null, 
    info: 'Please confirm your appointment',
    timestamp: 'Mar 20, 2025',
    unread: 0
  },
  { 
    id: 3, 
    name: 'Victoria Reed', 
    avatar: null, 
    info: 'Your prescription is ready for pickup',
    timestamp: 'Mar 19, 2025',
    unread: 0
  }
];

// Sample messages
const messages = [
  {
    id: 1,
    role: 'Care Coordinator',
    content: 'What is your pain level? (Please answer on a scale of 0 to 10, where 0-2 is "No Pain", 3-7 is "Trouble" and 8-10 is "Unable To Move.")',
    timestamp: '09:05 am'
  },
  {
    id: 2,
    dateDivider: 'Mar 14,2025',
    role: 'Care Coordinator',
    content: 'Hi Lucilla, we are from Dev4 Hospital!',
    timestamp: '09:05 am'
  },
  {
    id: 3,
    role: 'Care Coordinator',
    content: 'What is your pain level? (Please answer on a scale of 0 to 10, where 0-2 is "No Pain", 3-7 is "Trouble" and 8-10 is "Unable To Move.")',
    timestamp: '09:05 am'
  },
  {
    id: 4,
    dateDivider: 'Mar 15,2025',
    role: 'Care Coordinator',
    content: 'sgjagbvjigavvavhvjkbsl',
    timestamp: ''
  },
  {
    id: 5,
    dateDivider: 'Mar 15,2025',
    role: 'Care Coordinator',
    content: 'sgjagbvjigavvavhvjkbsl',
    timestamp: ''
  },
  
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function Message() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('RPM');
  const [messageText, setMessageText] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPatients, setCurrentPatients] = useState([]);
  
  // For mobile view
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMain, setShowMain] = useState(false);

  // Calculate the total number of unread messages for the In-App counter
  // const inAppUnreadCount = inAppPatients.reduce((total, patient) => 
  //   total + (patient.unread || 0), 0);

  // Define tabs data
  const tabsData = [
    {
      label: "In-App",
      activeIcon: app_active,
      inactiveIcon: app_inactive,
      iconWidth: activeTab === 0 ? "16px" : "18px",      
    },
    {
      label: "SMS",
      activeIcon: sms_active,
      inactiveIcon: sms_inactive,
      iconWidth: "10px",
      badgeCount: 0
    }
  ];

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      setCurrentPatients(activeTab === 0 ? inAppPatients : smsPatients);
      setLoading(false);
    };
    
    loadData();
  }, [activeTab]);

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

  // Update view based on screen size and selection state
  useEffect(() => {
    if (isMobile) {
      if (selectedPatient) {
        setShowSidebar(false);
        setShowMain(true);
      } else {
        setShowSidebar(true);
        setShowMain(false);
      }
    } else {
      setShowSidebar(true);
      setShowMain(true);
    }
  }, [selectedPatient, isMobile]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedPatient(null);
    setTimer(0);
    setTimerRunning(false);
  };

  const handlePatientSelect = (patient) => {
    // Reset timer when selecting a new patient
    if (selectedPatient?.id !== patient.id) {
      setTimer(0);
    }
    
    setSelectedPatient(patient);
    setTimerRunning(true);
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
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
        {showSidebar && (
          <Box className="sidebar">
            <Header title="Messages" timer={timerRunning ? formatTime(timer) : "0 Sec"} />
            <TabsContainer 
              activeTab={activeTab} 
              handleTabChange={handleTabChange}
              tabsData={tabsData}
            />
            <Box className="search-container">
              <SearchBar value={searchText} onChange={handleSearchChange} />
              <DropdownMenu value={category} onChange={handleCategoryChange} options={['RPM', 'CCM', 'PCM', 'RTM', 'TCM', 'MTM']} />
            </Box>
            
            {loading ? (
              <LoadingAnimation />
            ) : (
              <PatientList 
                patients={currentPatients} 
                selectedPatient={selectedPatient} 
                onSelectPatient={handlePatientSelect}
              />
            )}
          </Box>
        )}
        
        {showMain && (
          <Box className="main-content">
            {selectedPatient ? (
              <>
                <ConversationHeader 
                  patient={selectedPatient} 
                  isMobile={isMobile}
                  onBackClick={handleBackToList}
                />
                <ConversationArea messages={messages} />
                <MessageInput 
                  value={messageText} 
                  onChange={handleMessageChange} 
                  onSend={handleSendMessage} 
                  activeTab={activeTab}
                />
              </>
            ) : (
              <Box className="select-patient-message">
                Please select your patient to start chatting.
              </Box>
            )}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default Message;