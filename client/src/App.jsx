import { Route, Routes, useLocation } from 'react-router-dom';
import TicketInfo from './components/common/TicketInfo/TicketInfo';
import Navbar from './components/common/Navbar/Navbar';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import EventDetails from './pages/EventDetails.jsx';
import UserProfile from './pages/UserProfile.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import OrganizerRegistrationForm from './components/user/OrganizerRegistrationForm';
import Topbar from './components/common/TopBar/TopBar';

function App() {
  const location = useLocation();

  const pathsToHideNavbarAndTicketInfo = ['/signin', '/signup', '/organizer-register'];

  // Check if the current location matches any of the paths to hide Navbar and TicketInfo
  const shouldHideNavbarAndTicketInfo = pathsToHideNavbarAndTicketInfo.includes(location.pathname);

  return (
    <>
      {/* Conditionally render the TicketInfo */}
      {!shouldHideNavbarAndTicketInfo && <TicketInfo />}
      {!shouldHideNavbarAndTicketInfo && <Topbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/organizer-register" element={<OrganizerRegistrationForm />} />
      </Routes>
    </>
  );
}

export default App;
