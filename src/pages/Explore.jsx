import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { useConfigContext } from "../providers/ConfigProvider";
import { Button } from "@mui/material";

export const Explore = () => {
  const { profile, addSubscriber } = useAuthContext();

  const { allposts } = useConfigContext();

  if (!profile) {
    console.warn("profile is not defined. Redirecting to /login.");
    return <Navigate to={"/login"} />;
  }


  if (!allposts) return <p>Loading..</p>;
  const random = Math.floor(Math.random() * allposts.length);
  const thePost = allposts[random].data;
  console.log("thePost is", thePost)
  if (!thePost) return <p>No Posts found</p>;
  return (
    <div>
      <div className="post-container">
        <h2 className="post-title">{thePost.title}</h2>
        <Button
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '8px',
            padding: '10px 20px',
            margin: "1rem",
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
          className="blog-item-subscribe"
          onClick={() => addSubscriber(thePost.author.uid)} >
          Subscribe to Author
        </Button>
        <p className="post-description">{thePost.content}</p>

        {thePost?.imagelink && (
          <img
            src={thePost.imagelink}
            className="post-image rounded"
            alt={thePost.name}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite fallback loop
              e.target.src = "https://static.vecteezy.com/system/resources/thumbnails/005/337/799/small/icon-image-not-found-free-vector.jpg";
            }}
          />
        )}
      </div>
    </div>
  );
};
