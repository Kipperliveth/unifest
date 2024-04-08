import { useState, useEffect } from "react";
import React from "react";
import UserNav from "../App-components/UserNav";
// import { storage } from "../../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { txtdb } from "../../firebase-config";
import { CiSearch } from "react-icons/ci";
import all from "../../stock/allmain.png";
import sitting from "../../stock/couchicon.png";
import curtains from "../../stock/curtainicon.png";
import room from "../../stock/roomicon.png";
import lights from "../../stock/lighticon.png";
import tables from "../../stock/tableicon.png";
import storageicon from "../../stock/storageicon.png";
import { MdCancel } from "react-icons/md";

function Store() {
  const [imageList, setImageList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [data, setData] = useState([]);

  //pop

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState(null);

  const handleProductClick = (productData) => {
    setIsProductModalOpen(true);
    setSelectedProductData(productData); // Store clicked product data
  };

  const handleCloseModal = () => {
    setIsProductModalOpen(false);
    setSelectedProductData(null); // Clear selected product on close
  };

  //get data

  const getData = async () => {
    const valRef = collection(txtdb, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    setFilteredData(allData);
  }; //

  const handleSearchClick = () => {
    const filtered = data.filter(
      (value) =>
        value.txtVal &&
        value.txtVal.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };
  //


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

  //display data onload
  useEffect(() => {
    getData();
  }, []);

  //skeleton loading
  useEffect(() => {
    setIsLoading(true); // Start loading before fetching data
    getData().then(() => {
      setIsLoading(false); // Stop loading after data is fetched
    });
  }, []);

  return (
    <div className="theStore">
      <UserNav />

      <div className="uploaded-posts-container">
        <div className="search-container">
          <span>
            <CiSearch className="search-icon" />
            <input
              className="searchInput"
              type="text"
              placeholder="search for an something..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </span>

          <button onClick={handleSearchClick}>Search</button>
        </div>

          <h3 className="categories-header">Categories</h3>
        <div className="categories-container">
          <div className="categories">
            <span className="category-name">
              <button onClick={() => handleCategoryClick("All")}>
                <img src={all} alt="" />
              </button>
              All
            </span>

            <span className="category-name">
              <button onClick={() => handleCategoryClick("Sitting")}>
                <img src={sitting} alt="" />
              </button>
              <p>Sitting</p>
            </span>

            <span className="category-name">
              <button onClick={() => handleCategoryClick("Curtains")}>
                <img src={curtains} alt="" />
              </button>
              <p>Curtains</p>
            </span>

            <span className="category-name">
              <button onClick={() => handleCategoryClick("Tables")}>
                <img src={tables} alt="" />
              </button>
              <p>Tables</p>
            </span>

            <span className="category-name">
              <button onClick={() => handleCategoryClick("Room")}>
                <img src={room} alt="" />
              </button>
              <p>Room</p>
            </span>

            <span className="category-name">
              <button onClick={() => handleCategoryClick("Lights")}>
                <img src={lights} alt="" />
              </button>
              <p>Lights</p>
            </span>

            <span className="category-name">
              <button onClick={() => handleCategoryClick("Storage")}>
                <img src={storageicon} alt="" />
              </button>
              <p>Storage</p>
            </span>
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
          <div className="uploaded-posts">
            {filteredData.map((value) => (
              <div
                className="product"
                key={value.id}
                onClick={() => handleProductClick(value)}
              >
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
                    <p className="product-price"> &#8358;{value.price}</p>
                    <button>
                      Add to Cart
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={`product-modal ${isProductModalOpen ? "open" : ""}`}>
          {selectedProductData && (
            <div className="popup-details">
              <div className="closeIcon">
                <MdCancel className="close" onClick={handleCloseModal} />
              </div>
              <img src={selectedProductData.imgUrl} alt="Product" />
              <h2>{selectedProductData.txtVal}</h2>
              {/* Add image */}
              <p>{selectedProductData.desc}</p>

              <p className="price"> &#8358;{selectedProductData.price}</p>
              {/* ... other product details ... */}
              <div className="buy-now">
                <button>Buy Now</button>
                <button>Add to Cart</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Store;
