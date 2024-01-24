import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import "../styles/homepage.css";

export const HomePage = () => {
  const { profile } = useAuthContext();

  // this is not the cleanest way to handle "authentication routing" but works for now
  if (!profile) {
    console.warn("profile is not defined. Redirecting to /login.");
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <img id="home-background" src="../pics/Berge.jpg" alt="Background Image" />
      <span id="home-welcome-text">Welcome</span> <br />
      <span id="home-blog-text1">Blog your</span>{" "}
      <span id="home-blog-text2">PRESET</span>
      <button id="home-getstarted-blog">Create your Blog</button>
      <button id="home-getstarted-post">Add a new Post</button>
    </div>
  );
};
