import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import Header from '../../components/Header/Header';
import TabsContainer from '../../components/TabsContainer/TabsContainer';
import SearchBar from '../../components/SearchBar/SearchBar';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import PatientList from '../../components/PatientList/PatientList';
import ConversationHeader from '../../components/ConversationHeader/ConversationHeader';
import ConversationArea from '../../components/ConversationArea/ConversationArea';
import MessageInput from '../../components/MessageInput/MessageInput';
import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';
// import Timer from '../../components/Timer/Timer'; 
// import TimerFormatter from '../../components/Timer/TimerFormatter';
import SimpleTimer from '../../components/Timer/SimpleTimer';
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
    content: "Yes Doctor, I have done the screen process and try to complete it.",
    sender: "Michael Aiden",
    role: "received",
    timestamp: "05:55 pm",
    isRead: true
  },
  {
    id: 2,
    content: "Let's create something new and very use full that can helpful too and see then how we can get benefit from this.",
    sender: "Care Coordinator",
    role: "sent",
    timestamp: "06:10 pm",
    isRead: true
  },
  {
    id: 3,
    content: "Hello, Doctor",
    sender: "Michael Aiden",
    role: "received",
    timestamp: "06:20 pm",
    dateDivider: "Today",
    isRead: true
  },
  {
    id: 4,
    content: "Have you received the files over the email",
    sender: "Care Coordinator",
    role: "sent",
    timestamp: "06:22 pm",
    isRead: true
  },
  {
    id: 5,
    content: "Yeah! I already received and share to the concern section for review the report.",
    sender: "Michael Aiden",
    role: "received",
    timestamp: "06:30 pm",
    isRead: false
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
  const [loading, setLoading] = useState(true);
  const [currentPatients, setCurrentPatients] = useState([]);
  
  // State for the timer
  const [timerValue, setTimerValue] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  
  // For mobile view
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMain, setShowMain] = useState(false);

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
      await new (resolve => setTimeout(resolve, 3000));
      setCurrentPatients(activeTab === 0 ? inAppPatients : smsPatients);
      setLoading(false);
    };
    
    loadData();
  }, [activeTab]);

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

  // Handle timer updates from SimpleTimer component
  const handleTimerUpdate = (seconds) => {
    setTimerValue(seconds);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedPatient(null);
    setTimerActive(false);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setTimerActive(true);
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
    setTimerActive(false);
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
      {/* Only mount the timer component when active */}
      {timerActive && (
        <SimpleTimer 
          isActive={timerActive}
          onTimerUpdate={handleTimerUpdate}
        />
      )}
      <Box className="app-container">
        {showSidebar && (
          <Box className="sidebar">
            <Header title="Messages" timer={timerActive ? formatTime(timerValue) : "0 Sec"} />
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