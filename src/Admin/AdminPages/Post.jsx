import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { imgdb, txtdb } from "../../firebase-config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ImSpinner8 } from "react-icons/im";
import { FaCloud } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaCheckDouble } from "react-icons/fa6";

function Post() {
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState("");
  const [desc, setDescTxt] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadInProgress, setUploadInProgress] = useState(false);

  //
  const [data, setData] = useState([]);

  const handleUpload = (e) => {
    // console.log(e.target.files[0]);
    const imgs = ref(imgdb, `imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        setImg(val);
        // setUploadSuccess(true);
      });
    });
  };

  const handleClick = async () => {
    setIsLoggedIn(true);
    setTimeout(() => {
      setIsLoggedIn(false);
    }, 2000);

    setUploadInProgress(true);

    if (!txt || !desc || !category || !price || !img) {
      setErrorMessage("Please fill in all fields before uploading.");
      return;
    }
    // Clear any previous error message
    setErrorMessage("");

    try {
      const valRef = collection(txtdb, "txtData");
      await addDoc(valRef, { txtVal: txt, desc, category, price, imgUrl: img });
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading data: ", error);
      setErrorMessage("An error occurred while uploading. Please try again.");
    }

    setUploadInProgress(false);
  };

  const getData = async () => {
    const valRef = collection(txtdb, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  //validation
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="adminHome">
      <AdminDashboard />

      <h2 className="admin-current-page mobile-content">Upload a Product</h2>

      <div className="adminContent adminPost">

      <h2 className="admin-current-page desktop-content">Upload a Product</h2>


        <div style={{ display: uploadSuccess ? "none" : "block" }}>
          <div className="post-container">
            <input
              type="file"
              onChange={(e) => handleUpload(e)}
              placeholder="browse"
            />

            <input
              type="text"
              name="name"
              placeholder="product name"
              onChange={(e) => setTxt(e.target.value)}
              required
            />

            <input
              type="text"
              name="description"
              placeholder="product description"
              onChange={(e) => setDescTxt(e.target.value)}
              required
            />
            {/* 
            <input
              type="text"
              name="cateogory"
              placeholder="product category"
              onChange={(e) => setCategory(e.target.value)}
              required
            /> */}
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Sitting">Sitting</option>
              <option value="Curtains">Curtains</option>
              <option value="Room">Room</option>
              <option value="Tables">Tables</option>
              <option value="Lights">Lights</option>
              <option value="Storage">storage</option>
            </select>

            <input
              type="number"
              name="price"
              placeholder="product price (without commas)"
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <span>
              <button onClick={handleClick}>
                {uploadInProgress ? (
                  <ImSpinner8 className="load-spinner" />
                ) : (
                  "Upload Product"
                )}
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </span>
          </div>
        </div>

        {uploadSuccess && (
          <div className="success-message">
            <FaCloud className="success-icon" />

            <div className="msg">
              <p>Product Successfully uploaded!</p>
              <FaCheckDouble />
            </div>

            <NavLink to="/uploads">Go to Uploads</NavLink>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Post;
