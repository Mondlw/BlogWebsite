import { Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
//import { useFirebaseContext } from '../providers/FirebaseProvider';
import { doc, setDoc, collection, query, getDocs, where,  } from "firebase/firestore"; 

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Create a root reference
const storage = getStorage();



<script src="../scripts/script.js"></script>;

export const PostCreate = () => {
  const { profile } = useAuthContext();
  const { blogId } = useParams();

  //const { myStorage, myFS } = useFirebaseContext();

  // this is not the cleanest way to handle "authentication routing" but works for now
  if (!profile) {
    return <Navigate to={"/login"} />;
  }

  async function doesBlogExist(blogid) {
    const q = query(collection(db, "blogs"), where("", "==", blogid));

    const querySnapshot = await getDocs(q);

    if(querySnapshot) { return  true } else { return false}
    
  }

  doesBlogExist();

  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const imageInput = document.getElementById("images");

  function uploadFile(file) {
    const metadata = {
      contentType: 'image/jpeg'
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          return downloadURL;
        });
      }
    );
  }

  async function saveData(title, content, imglink) {

    await setDoc(doc(db, "cities", "LA"), {
      title: title,
      content: content,
      imagelink: imglink,
      author: profile
    });

  }

  function submitForm() {
    const title = titleInput.value;
    const content = contentInput.value;
    const images = imageInput.files;

    var imageslink = uploadFile(images)


  }

  if (!blogId) {
    console.warn("blogId is not defined");
    return <Navigate to={"/blogs"} />;
  }

  return (
    <form>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" required />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        name="content"
        rows="10"
        cols="50"
        required
      ></textarea>

      <label htmlFor="images">Images:</label>
      <input
        type="file"
        id="images"
        name="images"
        multiple
        accept="image/jpeg, image/png, image/gif"
      />

      <input onClick={submitForm()} type="submit" value="Submit" />
    </form>
  );
};
