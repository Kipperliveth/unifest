import { useState, useEffect } from "react";
import React from "react";
import UserNav from "../App-components/UserNav";
// import { storage } from "../../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import { txtdb } from "../../firebase-config";

function Store() {
  const [imageList, setImageList] = useState([]);

  const [data, setData] = useState([]);

  //get data

  const getData = async () => {
    const valRef = collection(txtdb, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  // const imageListRef = ref(storage, "images/");

  // useEffect(() => {
  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, { url, ref: item }]);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <div className="theStore">
      <UserNav />

      <div className="uploaded-posts-container">
        <h1> welcome to the store</h1>

        <div className="uploaded-posts">
          {data.map((value) => (
            <div key={value.id}>
              <img
                src={value.imgUrl}
                height="200px"
                width="200px"
                alt="product"
              />
              <h1>{value.txtVal}</h1>
              <p className="product-desciption">{value.desc}</p>
              <h1>{value.price}</h1>
              <p>{value.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;
