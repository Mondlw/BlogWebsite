import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import "../styles/homepage.css";



export const HomePage = () => {
  const { profile } = useAuthContext();
  const navigate = useNavigate();

  // this is not the cleanest way to handle "authentication routing" but works for now
  if (!profile) {
    console.warn("profile is not defined. Redirecting to /login.");
    return <Navigate to={"/login"} />;
  }

  function navigatetoBlogs() {
    navigate("/my-blogs/");
  }

  return (
    <div id="home">
      <div className="content">
        <h1 className="überschrift">Welcome to VibrantBlogVoyage</h1>

        <h2 className="slogan">A Vibrant Odyssey in Every Post</h2>

        <div className="logo">
          <img
            src="https://i.ibb.co/7YqWdP3/Logo.jpg"
            alt="Beschreibung des Bildes"
          ></img>
        </div>

        <h3 className="satz">Create your own blog using the button below</h3>
        <div className="home-getstarted-post-div">
          <button onClick={navigatetoBlogs}className="home-getstarted-post">Get started</button>
        </div>
      </div>
    </div>
  );
};
