import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import "../styles/styles.css"

export const HomePage = () => {
    const { profile } = useAuthContext();

  
    // this is not the cleanest way to handle "authentication routing" but works for now
    if (!profile) {
      console.warn('profile is not defined. Redirecting to /login.');
      return <Navigate to={'/login'} />;
    }
    
  
    return (
        
        <div className="flex-container">

        <img className="berge" src="Berge.jpg" />
        <div className="content">
  
          <h1 className="überschrift">Welcome to VibrantBlogVoyage</h1>
      
          <h2 className="slogan">A Vibrant Odyssey in Every Post</h2>
      
          <div className="image-container"></div>
      
          <div className="logo">
      
              
              <img src={import('../pics/Logo.jpg')} />
      
          </div>
      
          <h3 className="satz">Lets grow together &#129392</h3>
      
          
        </div>
        <img className="meer" src="Meer.jpg" />
      </div>
      
    );
  };