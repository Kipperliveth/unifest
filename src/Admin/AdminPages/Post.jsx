import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { storage } from "../../firebase-config";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
// import Store from "../../App/App-pages/Store";

function Post() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageDescription, setImageDescription] = useState("");

  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [
          ...prev,
          { url, description: imageDescription, ref: snapshot.ref },
        ]);
        setImageDescription("");
      });
    });
  };

  const deleteImage = (index, imageRef) => {
    deleteObject(imageRef)
      .then(() => {
        setImageList((prev) => {
          const updatedList = [...prev];
          updatedList.splice(index, 1);
          return updatedList;
        });
      })
      .catch((error) => {
        console.log("Error deleting image:", error);
      });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, { url, ref: item }]);
        });
      });
    });
  }, []);

  return (
    <div className="adminHome">
      <AdminDashboard />

      <div className="adminContent adminPost">
        <div className="post-container">
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <input
            type="text"
            name="description"
            placeholder="image description"
            onChange={(event) => {
              setImageDescription(event.target.value);
            }}
          />
          <button onClick={uploadImage}>Upload Image</button>
        </div>

        <div>
          {imageList.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt="market" />
              <p>{image.description}</p>
              <button onClick={() => deleteImage(index, image.ref)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
