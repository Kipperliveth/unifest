import React from "react";
import { useState, useEffect } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { txtdb } from "../../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function Uploads() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const valRef = collection(txtdb, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };
  //

  const deleteItem = async (itemId) => {
    try {
      await deleteDoc(doc(txtdb, "txtData", itemId));
      setData(data.filter((item) => item.id !== itemId)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  //
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="adminHome">
      <AdminDashboard />

      <div className="adminUploads adminContent">
        <h2>uploads</h2>

        <div className="uploads-container">
          {data.map((value) => (
            <div key={value.id}>
              <img
                src={value.imgUrl}
                height="200px"
                width="200px"
                alt="product"
              />
              <h2>{value.txtVal}</h2>
              <p className="product-desciption">{value.desc}</p>
              <h5 className="product-price">{value.price}</h5>
              <p>{value.category}</p>
              <button onClick={() => deleteItem(value.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Uploads;
