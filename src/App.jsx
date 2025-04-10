import { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import UserProfile from "./components/UserProfile";
import { user } from "./data/data";

const App = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [contacts, setContacts] = useState([]);

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

  return (
    <div className="app-container">
      <div className="button-wrapper">
        <button className="toggle-button" onClick={() => setShowProfile(!showProfile)}>
          {showProfile ? "Ver Contactos" : "Ver Perfil"}
        </button>
      </div>

      {showProfile ? (
        <UserProfile user={user} />
      ) : (
        <ContactList contacts={contacts} cities={[]} states={[]} />
      )}
    </div>
  );
};

export default App;
