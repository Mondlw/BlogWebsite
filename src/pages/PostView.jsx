import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { useEffect } from "react";
import { useFirebaseContext } from "../providers/FirebaseProvider";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const PostView = () => {
  const { profile, addSubscriber } = useAuthContext();
  const { blogId, postId } = useParams();
  const { state } = useLocation();
  const thePost = state.post.data ? state.post.data : state.post;
  const theBlogId = state.blogId;

  console.log("Postid is", postId);
  // this is not the cleanest way to handle "authentication routing" but works for now

  const { myFS } = useFirebaseContext();

  useEffect(() => {
    const postsRef = collection(myFS, "posts");
    console.log("the post", thePost)
    const q = query(postsRef, where("title", "==", thePost.title));

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

  console.log("the post", thePost);
  // restructre data from inconsistent data structure
  const post = thePost.data ? thePost.data : thePost;

  return (
    <div>
      <div className="post-container">
        <a href="#">
          <h2 className="post-title">{post.title}</h2>
        </a>
        <p className="post-description">{post.content}</p>

        <img
          src={post.imagelink}
          alt="Post image"
          className="post-image rounded"
        />

        <button
          className="blog-item-subscribe"
          onClick={() => addSubscriber(post.author.uid)}
        >
          Subscribe to Author
        </button>
      </div>
    </div>
  );
};
