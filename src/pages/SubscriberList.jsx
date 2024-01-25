import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useFirebaseContext } from "../providers/FirebaseProvider";

export const SubscriberList = () => {
  const { profile } = useAuthContext();
  const [blogs, setBlogs] = useState();

  const { myFS } = useFirebaseContext();

  useEffect(() => {
    const blogsRef = collection(myFS, "blogs");
    const q = query(blogsRef, where("blogs.author.uid", "in", ));
    const unsub = onSnapshot(q, (blogssnapshot) => {
      const docs = [];
      blogssnapshot.forEach((docsnap) => {
        docs.push({data: docsnap.data(), id: docsnap.id});
      });
      setBlogs(docs);
    });
    return unsub;
  }, []);

  
  if (!profile) {
    console.warn("profile is not defined. Redirecting to /login.");
    return <Navigate to={"/login"} />;
  }

  

  return (
    <div>
      <h1>Blog List</h1>
      <p>
        In this component, add code to fetch all of the <em>blogs</em> documents
        from Firestore (they should be in a single <em>blogs</em> collection).
      </p>
      <p>
        You will use a `useEffect` to asynchronously fetch the data, put it into
        a state variable (`useState`) and then display the values in that state
        variable here using `.map()`
      </p>
      {blogs ? (
        blogs.map((blog, index) => (
          <h1 className="indiv_blogs" key={index}>
            {blog.data.name}
          </h1>
        ))
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};
