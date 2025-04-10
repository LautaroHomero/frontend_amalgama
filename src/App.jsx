import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ContactList from "./components/ContactList";
import UserProfile from "./components/UserProfile";
import { user } from "./data/data";
import Login from "./pages/Login";
import "./index.css";

const App = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map((user, idx) => ({
          id: idx + 1,
          avatar_url: user.picture.medium,
          first_name: user.name.first,
          last_name: user.name.last,
          company: "Company Inc.",
          email: user.email,
          phone: {
            area_code: user.phone.split(" ")[0],
            number: user.phone.split(" ").slice(1).join(" ")
          },
          details: `From ${user.location.city}, ${user.location.country}`,
          addresses: [
            {
              line_1: `${user.location.street.name} ${user.location.street.number}`,
              line_2: user.location.city,
              zip_code: user.location.postcode,
              city_id: 1,
              state_id: 1,
              city: user.location.city,
              state: user.location.state
            }
          ]
        }));

        setContacts(formatted);
      });
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  const LoginRoute = () => {
    return isLoggedIn ? <Navigate to="/contacts" replace /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  };

  return (
    <Router>
      <div className="app-container">
        <div className="button-wrapper" style={{ justifyContent: "space-between" }}>
          {isLoggedIn && (
            <>
              <button className="toggle-button" onClick={() => setShowProfile(!showProfile)}>
                {showProfile ? "Contacts" : "Profile"}
              </button>
              <button className="toggle-button" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>

        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                {showProfile ? (
                  <UserProfile user={user} />
                ) : (
                  <ContactList contacts={contacts} cities={[]} states={[]} />
                )}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/contacts" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
