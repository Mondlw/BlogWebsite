import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

export const Profile = () => {
    const { profile } = useAuthContext();

  
    // this is not the cleanest way to handle "authentication routing" but works for now
    if (!profile) {
      console.warn('profile is not defined. Redirecting to /login.');
      return <Navigate to={'/login'} />;
    }
    
  
    return (
        
        <h1>Profile Page</h1>
      
    );
  };