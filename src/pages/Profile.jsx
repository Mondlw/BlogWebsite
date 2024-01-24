import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import '../styles/profile.css';

export const Profile = () => {
  const { profile } = useAuthContext();

  // this is not the cleanest way to handle "authentication routing" but works for now
  if (!profile) {
    console.warn("profile is not defined. Redirecting to /login.");
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="profile-container">

      <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />

      <div className="profile-header">
        <h1>‎ ‎ ‎ ‎ ‎ ‎ ‎ PROFILE ‎ ‎ ‎ ‎ ‎‎ ‎  </h1>
        <span id="profile-greeting">Hello </span> <span id="profile-username"> {profile.displayName}</span>
      </div>

      <div className="profile-email">
        <i className="fas fa-envelope"></i>
        <h3>Email: {profile.email}</h3>
      </div>
    </div>
  );
};
