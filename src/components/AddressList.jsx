const AddressList = ({ addresses }) => {
  return (
    <div className="address-container">
      {addresses.map((address, idx) => (
        <ul className="address-list" key={idx}>
          <li>{address.line_1}</li>
          <li>{address.line_2}</li>
          <li>{address.zip_code}</li>
          <li>{address.city}</li>
          <li>{address.state}</li>
        </ul>
      ))}
    </div>
  );
};

export default AddressList;
