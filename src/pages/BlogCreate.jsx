import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../providers/AuthProvider';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { useFirebaseContext } from '../providers/FirebaseProvider';
import { addDoc, collection } from 'firebase/firestore';


export const BlogCreate = () => {
  const { profile } = useAuthContext();
  const { myStorage, myFS } = useFirebaseContext();
  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState("")
  const [image, setImage] = useState("")

  // this is not the cleanest way to handle "authentication routing" 
  if (!profile) {
    console.warn('profile is not defined. Redirecting to /login.');
    return <Navigate to={'/login'} />;
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
      name: titleInput,
      imagelink: imglink,
      author: profile,
    };

    console.log("Data is", data)

    let docRef = await addDoc(collection(myFS, "blogs"), data);
    console.log("DocRef is", docRef.path)
    return docRef.id
  }

  async function submitForm() {
    let imageslink = await uploadFile(image);

    let newBlogId = await saveData(imageslink);
    navigate(`/my-blogs/${newBlogId}`)
  }

  console.log("Titleinput", titleInput)
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
