import AddressList from "./AddressList";
import { truncate } from "../utils/truncate";
import { findById } from "../utils/findById";

const ContactCard = ({ contact, cities, states }) => {
  const formattedAddresses = contact.addresses.map(address => ({
    ...address,
    city: findById(cities, address.city_id),
    state: findById(states, address.state_id),
  }));

  return (
    <div className="contact-card">
      <div className="card-header">
        <img src={contact.avatar_url} alt={`${contact.first_name} ${contact.last_name}`} className="avatar" />
        <div>
          <h3 className="contact-name">{contact.first_name} {contact.last_name}</h3>
          <h4 className="contact-company">{contact.company}</h4>
        </div>
      </div>

      <p className="contact-details">{truncate(contact.details, 100)}</p>

      <ul className="contact-info">
        <li><strong>Email:</strong> {contact.email}</li>
        <li><strong>Phone:</strong> ({contact.phone.area_code}) {contact.phone.number}</li>
        <li>
          <h4>{formattedAddresses.length > 1 ? "Addresses:" : "Address:"}</h4>
          <AddressList addresses={formattedAddresses} />
        </li>
      </ul>
    </div>
  );
};

export default ContactCard;
