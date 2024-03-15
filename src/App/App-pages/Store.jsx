import {useState, useEffect } from "react";
import React from "react";
import UserNav from "../App-components/UserNav";
import { storage } from "../../firebase-config";
import {
  ref,
  listAll,
  getDownloadURL,
  
} from "firebase/storage";


function Store() {

  const [imageList, setImageList] = useState([]);


  const imageListRef = ref(storage, "images/");


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
    <div className="theStore">
      <UserNav />

      <div className="uploaded-posts-container">
        <h1> welcome to the store</h1>

        <div className="uploaded-posts">

          {imageList.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt="market" />
              <p>{image.description}</p>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;
