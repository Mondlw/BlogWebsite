import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useFirebaseContext } from "../providers/FirebaseProvider";

export const MyBlogs = () => {
  const { profile } = useAuthContext();
  const [blogs, setBlogs] = useState();

  const { myFS } = useFirebaseContext();

  useEffect(() => {
    const blogsRef = collection(myFS, "blogs");
    const q = query(blogsRef,where("author.uid", "==", profile.uid))

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

  let table;
  if(blogs?.length > 0) {
    table = blogs.map((blog, index) => (
        <h1 className="indiv_blogs" key={index}>
          {blog.data.name} : {blog.data.posts.length}
        </h1>
      ))
  } else if(blogs?.length === 0) {
    table = <p>Create a new blog using the button</p>
  } else {
    table = <p>Loading..</p>
  }

  return (
    <div>
      <h1>Blog List</h1>
      {table}
      <Link to="/my-blogs/create"><button id="my-blogs_create-blog">+</button></Link>

      <Link to="/posts/12345"><button id="my-blogs_test"></button></Link>
    </div>
  );
};
