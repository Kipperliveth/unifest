import React from "react";
import { useState, useEffect } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import { txtdb } from "../../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { CiSearch } from "react-icons/ci";

function Uploads() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

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
  //
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.category === category);
      setFilteredData(filtered);
    }
  };
  //

  useEffect(() => {
    setIsLoading(true); // Start loading before fetching data
    getData().then(() => {
      setIsLoading(false); // Stop loading after data is fetched
    });
  }, []);

  return (
    <div className="adminHome">
      <AdminDashboard />

      <h2 className="admin-current-page mobile-content">Uploads</h2>

      <div className="adminUploads adminContent">
        <h2 className="admin-current-page desktop-content">Uploads</h2>

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
          <h3 className="categories-header">Categories</h3>

          <div className="categories">

          {["All", "Shirts", "Vests", "Hoodies", "Socks", "Shorts", "Crocs", "Backpacks", "Caps", "Beanies"].map((category) => (
              <span className="category-name" key={category}>
                <p
                  onClick={() => handleCategoryClick(category)}
                  style={{
                    backgroundColor: selectedCategory === category ? 'black' : 'transparent',
                    color: selectedCategory === category ? 'white' : 'black',
                    borderRadius: '20px',
                  }}
                >
                  {category}
                </p>
              </span>
            ))}


          </div>

        </div>

        {isLoading ? (
          <div className="loading-message">
            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>

            <div className="loading-card">
              <div className="loading-img"></div>
              <div className="loading-text"></div>
              <div className="loading-text-II"></div>
            </div>
          </div>
        ) : (
          <div className="uploads-container">
            {filteredData.length === 0 ? (
            <div className="no-results">
              No products found.
            </div>
          ) : (filteredData.map((value) => (
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

                            <p className="product-category">{value.category}</p>
                            <span>
                              <p className="product-price">&#8358;&nbsp;{parseFloat(value.price).toLocaleString('en-US')}</p>
                              <button onClick={() => deleteItem(value.id)}>Delete</button>
                            </span>
                          </div>
                        </div>
                    ) ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Uploads;
