import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { useConfigContext } from "../providers/ConfigProvider";

export const Explore = () => {
  const { profile, addSubscriber } = useAuthContext();

  const { allposts } = useConfigContext();

  if (!profile) {
    console.warn("profile is not defined. Redirecting to /login.");
    return <Navigate to={"/login"} />;
  }


  if (!allposts) return <p>Loading..</p>;
  const random = Math.random() * allposts.length;
  const thePost = allposts[random];
  if (!thePost) return <p>No Posts found</p>;
  return (
    <div>
      <div className="post-container">
        <h2 className="post-title">{thePost.data.title}</h2>
        <button onClick={() => addSubscriber(thePost.data.author.uid)}></button>
        <p className="post-description">{thePost.data.content}</p>

        <img
          src={thePost.data.imagelink}
          alt="Post image"
          className="post-image rounded"
        />
      </div>
    </div>
  );
};
