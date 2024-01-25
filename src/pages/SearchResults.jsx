import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

export const SearchResults = () => {
  const { profile } = useAuthContext();

  // this is not the cleanest way to handle "authentication routing"
  if (!profile) {
    console.warn("profile is not defined. Redirecting to /login.");
    return <Navigate to={"/login"} />;
  }

  return(
  <div>
    <div className="exterior-border">
        <h2 id="searchResults">Search results</h2>
        <div className="inner-border">
            <h3 className="post-name">POSTNAME</h3>
            <h4 className="post-content">CONTENTCONTENT</h4>
            <img className="post-img"src="workINprogress" alt="This image does not NEED to exist, its optional" />
        </div>
    </div>
  </div>
  );
};
