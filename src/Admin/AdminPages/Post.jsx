import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { imgdb, txtdb } from "../../firebase-config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

function Post() {
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState("");

  //
  const [data, setData] = useState([]);

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(imgdb, `imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        setImg(val);
      });
    });
  };

  const handleClick = async () => {
    const valRef = collection(txtdb, "txtData");
    await addDoc(valRef, { txtVal: txt, imgUrl: img });
    alert("data added");
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

  return (
    <div className="adminHome">
      <AdminDashboard />

      <div className="adminContent adminPost">
        <div className="post-container">
          <input type="file" onChange={(e) => handleUpload(e)} />

          <input
            type="text"
            name="description"
            placeholder="image description"
            onChange={(e) => setTxt(e.target.value)}
          />

          <button onClick={handleClick}>Upload</button>
        </div>

        {/* <div>
          {data.map((value) => (
            <div key={value.id}>
              <img src={value.imgUrl} height="200px" width="200px" />
              <h1>{value.txtVal}</h1>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Post;
