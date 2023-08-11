import { Route, Routes, useLocation } from 'react-router-dom';
import TicketInfo from './components/common/TicketInfo/TicketInfo';
import Navbar from './components/common/Navbar/Navbar';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import UserProfile from './pages/UserProfile.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import OrganizerRegistrationForm from './components/user/OrganizerRegistrationForm';
import Topbar from './components/common/TopBar/TopBar';
import AddEventPage from './pages/AddEventPage';
import Tickets from './pages/Ticketspage';
import AddTicketPage from './pages/AddTicketPage';
import OrderPage from './pages/OrderPage.jsx';

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
        <Route path="/events/add-event" element={<AddEventPage />} />
        <Route path="/event/:eventId/tickets" element={<Tickets />} />
        <Route path="/event/:eventId/tickets/add" element={<AddTicketPage />} />
        <Route path="/event/:eventId/tickets/:ticketId/order" element={<OrderPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/organizer-register" element={<OrganizerRegistrationForm />} />
      </Routes>
    </>
  );
}

export default App;
