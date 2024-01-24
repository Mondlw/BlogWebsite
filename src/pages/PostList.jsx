import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuthContext } from '../providers/AuthProvider';
import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../providers/FirebaseProvider';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const PostList = () => {
  const { profile } = useAuthContext();
  const { blogId } = useParams();
  const { state } = useLocation();
  const theBlog = state.blog

  // this is not the cleanest way to handle "authentication routing" but works for now

  

  const [posts, setPosts] = useState();

  const { myFS } = useFirebaseContext();

  useEffect(() => {
    const postsRef = collection(myFS, "posts");
    const q = query(postsRef,where("blogId", "==", blogId))

    const unsub = onSnapshot(q, (postssnapshot) => {
      const docs = [];
      postssnapshot.forEach((docsnap) => {
        docs.push({data: docsnap.data(), id: docsnap.id});
      });
      setPosts(docs);
    });
    return unsub;
  }, []);

  
  if (!profile) {
    console.warn("profile is not defined. Redirecting to /login.");
    return <Navigate to={"/login"} />;
  }

  if (!blogId) {
    console.warn('blogId is not defined');
    return <Navigate to={'/my-blogs'} />;
  }

  let table;
  if(posts?.length > 0) {
    table = posts.map((post, index) => (
        <h1 className="indiv_posts" key={index}>
          {post.data.title} : {post.data.content} : <img src={post.data.imagelink}/>
        </h1>
      ))
  } else if(posts?.length === 0) {
    table = <p>Create a new blog using the button</p>
  } else {
    table = <p>Loading..</p>
  }
  return (
    <div>
      <h1>Post List for {theBlog.data.name}</h1>
      {table}
      <Link to={`/my-blog/${blogId}/create`}><button id="my-post_create-post">+</button></Link>

    </div>
  );
};
