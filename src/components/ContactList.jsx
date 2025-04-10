import ContactCard from "./ContactCard";

const ContactList = ({ contacts, cities, states }) => {
  return (
    <div className="contact-list-container">

      <h1 className="page-title">Contacts 👥</h1>

      {contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} cities={cities} states={states} />
      ))}
    </div>
  );
};

export default ContactList;
