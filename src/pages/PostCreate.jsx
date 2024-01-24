import { Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
//import { useFirebaseContext } from '../providers/FirebaseProvider';
import {
  addDoc,
  collection,
  query,
  getDocs,
  where,
  getFirestore,
} from "firebase/firestore";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useFirebaseContext } from "../providers/FirebaseProvider";
import { useState } from "react";

// Create a root reference

export const PostCreate = () => {
  const { profile } = useAuthContext();
  const { blogId } = useParams();

  const { myStorage, myFS } = useFirebaseContext();

  const [titleInput, setTitleInput] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState();

  // this is not the cleanest way to handle "authentication routing" but works for now
  if (!profile) {
    return <Navigate to={"/login"} />;
  }

  async function doesBlogExist(blogid) {
    const db = getFirestore();
    const q = query(collection(db, "blogs"), where("id", "==", blogid));

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
    console.log("File:", file)
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
      imagelink: imglink,
      author: profile,
    };

    console.log("Data is", data)

    let docRef = await addDoc(collection(myFS, "posts"), data);
    console.log("DocRef is", docRef.path)
  }

  async function submitForm() {
    let imageslink = await uploadFile(image);

    await saveData(imageslink);
  }

  if (!blogId || !doesBlogExist(blogId)) {
    console.warn("blogId is not defined");
    return <Navigate to={"/blogs"} />;
  }
  console.log("Titleinput", titleInput, "Content", content)
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

      <label htmlFor="images">Images:</label>
      <input
        type="file"
        id="images"
        name="images"
        accept="image/jpeg, image/png, image/gif"
        onChange={(event) => {
          console.log("new value set image", event.target.files)
          setImage(event.target.files[0]);
        }}
      />

      <input onClick={() => submitForm()} type="submit" value="Submit" />
    </div>
  );
};
