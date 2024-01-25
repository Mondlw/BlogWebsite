import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
//import { useFirebaseContext } from '../providers/FirebaseProvider';
import { addDoc, collection, query, getDocs, where } from "firebase/firestore";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useFirebaseContext } from "../providers/FirebaseProvider";
import { useState } from "react";
import { useConfigContext } from "../providers/ConfigProvider";

// Create a root reference

export const PostCreate = () => {
  const { profile } = useAuthContext();
  const { blogId } = useParams();
  const navigate = useNavigate();

  const { state }= useLocation();
  const theBlog = state?.blog;

  

  const { myStorage, myFS } = useFirebaseContext();
  const { config, addLocation } = useConfigContext();

  const [titleInput, setTitleInput] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState("");

  // this is not the cleanest way to handle "authentication routing" but works for now
  if (!profile) {
    return <Navigate to={"/login"} />;
  }

  async function doesBlogExist(blogid) {
    const q = query(collection(myFS, "blogs"), where("id", "==", blogid));

    const querySnapshot = await getDocs(q);

    if (querySnapshot) {
      return true;
    } else {
      return false;
    }
  }

  async function uploadFile(file) {
    const metadata = {
      contentType: "image/jpeg",
    };
    console.log("File:", file);
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(myStorage, "images/" + file.name);
    const uploadSnapshot = await uploadBytes(storageRef, file, metadata);

    const downloadUrl = await getDownloadURL(uploadSnapshot.ref);
    console.log("Downloadurl:", downloadUrl);
    return downloadUrl;
  }

  async function saveData(imglink) {
    let data = {
      title: titleInput,
      content: content,
      author: profile,
      blogId: blogId,
    };

    console.log("Data is", data);

    if (imglink) {
      data.imagelink = imglink;
    }

    if(location) {
      data.location = location;
    }

    let docRef = await addDoc(collection(myFS, "posts"), data);
    console.log("DocRef is", docRef.path);
    return docRef.id;
  }

  async function submitForm() {
    let imageslink = null;
    if (location) {
        if(!config.locations.includes(location)) {
          addLocation(location)
        }
      }
    
    if (image) {
      imageslink = await uploadFile(image);
    }

    await saveData(imageslink);

    navigate(`/my-blogs/${blogId}` , {state:{blog: theBlog}});
  }

  if (!blogId || !doesBlogExist(blogId)) {
    console.warn("blogId is not defined");
    return <Navigate to={"/my-blogs"} />;
  }
  console.log("Titleinput", titleInput, "Content", content);
  return (
    <div>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        onChange={(event) => {
          setTitleInput(event.target.value);
        }}
        value={titleInput}
        id="title"
        name="title"
        required
      />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        name="content"
        rows="10"
        cols="50"
        required
        onChange={(event) => {
          setContent(event.target.value);
        }}
        value={content}
      ></textarea>

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        onChange={(event) => {
          setLocation(event.target.value);
        }}
        value={location}
        id="location"
        name="location"
      />

      <label htmlFor="images">Images:</label>
      <input
        type="file"
        id="images"
        name="images"
        accept="image/jpeg, image/png, image/gif"
        onChange={(event) => {
          console.log("new value set image", event.target.files);
          setImage(event.target.files[0]);
        }}
      />

      <input onClick={() => submitForm()} type="submit" value="Submit" />
    </div>
  );
};
