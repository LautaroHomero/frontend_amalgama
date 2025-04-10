const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <img src={user.avatar_url} alt="Avatar" className="avatar-large" />
      <h2 className="user-name">{user.first_name} {user.last_name}</h2>
      <p><strong>Company:</strong> {user.company}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
    </div>
  );
};

export default UserProfile;

  