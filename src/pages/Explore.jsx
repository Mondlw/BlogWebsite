import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { useEffect } from "react";
import { useFirebaseContext } from "../providers/FirebaseProvider";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const PostView = () => {
  const { profile } = useAuthContext();
  const { blogId, postId } = useParams();
  

  console.log("Postid is", postId);
  // this is not the cleanest way to handle "authentication routing" but works for now

  const { myFS } = useFirebaseContext();

  useEffect(() => {
    const postsRef = collection(myFS, "posts");
    const q = query(postsRef, where("title", "==", thePost.data.title));

    const unsub = onSnapshot(q, (postssnapshot) => {
      const docs = [];
      postssnapshot.forEach((docsnap) => {
        docs.push({ data: docsnap.data(), id: docsnap.id });
      });
    });
    return unsub;
  }, []);

  if (!profile) {
    console.warn("profile is not defined. Redirecting to /login.");
    return <Navigate to={"/login"} />;
  }

  if (!blogId) {
    console.warn("blogId is not defined");
    return <Navigate to={"/my-blogs"} />;
  }

  return (
    <div>
      <div className="post-container">
        <a href="#">
          <h2 className="post-title">{thePost.data.title}</h2>
        </a>
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
