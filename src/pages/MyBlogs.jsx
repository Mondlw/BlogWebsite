import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useFirebaseContext } from "../providers/FirebaseProvider";
import { Button } from "@mui/material";
import "../styles/myblogs.css";

export const MyBlogs = () => {
  const { profile } = useAuthContext();
  const [blogs, setBlogs] = useState();

  const { myFS } = useFirebaseContext();

  const navigate = useNavigate()

  useEffect(() => {
    const blogsRef = collection(myFS, "blogs");
    const q = query(blogsRef, where("author.uid", "==", profile.uid));

    const unsub = onSnapshot(q, (blogssnapshot) => {
      const docs = [];
      blogssnapshot.forEach((docsnap) => {
        docs.push({ data: docsnap.data(), id: docsnap.id });
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
  if (blogs?.length > 0) {
    table = blogs.map((blog, index) => {
      console.log("Imagelink is", blog.data.imagelink);
      return (
        <div key={index}>
          <div className="blog-list-container">
            <div className="blog-item" key={index}>
              <Link
                className="indiv_blogs-link"
                to={`/my-blogs/${blog.id}`}
                state={{ blog: blog }}
              >
                {blog.data.name}
              </Link>
              <p className="blog-item-text">{blog.data.content}</p>
              {blog.data?.imagelink && (
                <img
                  src={blog.data.imagelink }
                  className="blog-item-image"
                  alt={blog.data.name}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite fallback loop
                    e.target.src = "https://static.vecteezy.com/system/resources/thumbnails/005/337/799/small/icon-image-not-found-free-vector.jpg";
                  }}
                />
              )}
            </div>
          </div>
        </div>
      );
    });
  } else if (blogs?.length === 0) {
    table = <p>Create a new blog using the button</p>;
  } else {
    table = <p>Loading..</p>;
  }

  return (
    <div>
      <div id="blog-list">
        <h2 className="blog-list-heading">Blog List</h2>
        {table}
        <Button 
        sx={{
          backgroundColor: "secondary.main",
          color: "#FFFFFF",
          borderRadius: "5px",
          width: "200px",
          height: "50px",
          fontSize: "20px",
          marginTop: "20px",
          marginBottom: "20px",
          marginLeft: "20px",
        }}
        
        onClick={() => navigate(`/my-blogs/create`)}id="create-blog">+ Create Blog</Button>
      </div>
    </div>
  );
};
