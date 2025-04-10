const ContactDetails = ({ contact }) => {
    return (
      <div style={{ border: "1px solid gray", padding: "10px", borderRadius: "8px" }}>
        <h3>{contact.first_name} {contact.last_name}</h3>
        <img src={contact.avatar_url} alt="avatar" />
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Teléfono:</strong> ({contact.phone.area_code}) {contact.phone.number}</p>
        <p><strong>Dirección:</strong> {contact.addresses[0].line_1}, {contact.addresses[0].line_2}</p>
        <p><strong>Ciudad:</strong> {contact.addresses[0].city}</p>
        <p><strong>Estado:</strong> {contact.addresses[0].state}</p>
        <p><strong>ZIP:</strong> {contact.addresses[0].zip_code}</p>
        <p><strong>Detalles:</strong> {contact.details}</p>
      </div>
    );
  };
  
  export default ContactDetails;
  