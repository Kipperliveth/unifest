import React from "react";
import { useState, useEffect } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { txtdb } from "../../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { CiSearch } from "react-icons/ci";

function Uploads() {
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const getData = async () => {
    const valRef = collection(txtdb, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    setFilteredData(allData);
  };
  //

  const deleteItem = async (itemId) => {
    try {
      await deleteDoc(doc(txtdb, "txtData", itemId));
      setData(data.filter((item) => item.id !== itemId));
      setFilteredData(filteredData.filter((item) => item.id !== itemId)); // Update filteredData after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  //
  const handleSearchClick = () => {
    const filtered = data.filter(
      (value) =>
        value.txtVal &&
        value.txtVal.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };
  //
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="adminHome">
      <AdminDashboard />

      <div className="adminUploads adminContent">
        <h2 className="admin-current-page">Uploads</h2>

        <div className="search-container">
          <span>
            <CiSearch className="search-icon" />
            <input
              className="searchInput"
              type="text"
              placeholder="search for an upload..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </span>

          <button onClick={handleSearchClick}>Search</button>
        </div>

        <div className="categories-container">
          <h3 className="categories-header">
            Categories
          </h3>
          <div className="categories">

          </div>
        </div>

        <div className="uploads-container">
          {filteredData.map((value) => (
            <div className="product" key={value.id}>
              <img
                src={value.imgUrl}
                height="200px"
                width="200px"
                alt="product"
              />

              <div className="product-info">
                <h2 className="product-name">{value.txtVal}</h2>

                <p className="product-description">{value.desc}</p>

                <p className="prodiuct-category">{value.category}</p>
                <span>
                  <p className="product-price"> &#8358;{value.price}</p>
                  <button onClick={() => deleteItem(value.id)}>Delete</button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Uploads;

// .filter((value) => {
//   if (searchTerm.trim() === " ") {
//     return true;
//   } else if (
//     value.txtVal && value.txtVal.toLowerCase().includes(searchTerm.toLowerCase())
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// })
