import { useState, useEffect } from "react";
import React from "react";
import UserNav from "../App-components/UserNav";
// import { storage } from "../../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc, updateDoc,
  setDoc, onSnapshot
} from "firebase/firestore";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { auth } from "../../firebase-config";
import { txtdb } from "../../firebase-config";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";



function Store() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [data, setData] = useState([]);

  //getting current user
  const currentUser = auth.currentUser;

  //cart logic
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);

    if (currentUser) {
      const userId = currentUser.uid;
      const productRef = collection(txtdb, `userCart/${userId}/products`); // User-specific cart collection
      

      if(product.sizes.length > 0 && product.color.length > 0){
        console.log("testing")
        if (!selectedColor && product.color.length > 0) {
          handleProductClick(product)
          setPopupMessage("Please choose a color");
            setVariationPopup(true);
          setTimeout(() => setVariationPopup(false), 3000);
          return;
        }
    
        if (!selectedSize && product.sizes.length > 0) {
          handleProductClick(product)
          setPopupMessage("Please choose a size");
          setVariationPopup(true);
          setTimeout(() => setVariationPopup(false), 3000);
          return;
        }
        // return;
        addDoc(productRef, {
          imgUrl: product.imgUrl,
          txtVal: product.txtVal,
          desc: product.desc,
          category: product.category,
          price: product.price,
          quantity: 1
          // Other product details
        })
        .then((docRef) => {
          console.log("Product added to user cart");
          const documentId = docRef.id;
          updateDoc(doc(txtdb, `userCart/${userId}/products/${documentId}`), {
            productId: docRef.id,
          });
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000); 
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
      }else{
        console.log("aint")
        addDoc(productRef, {
          productId: product.id,
          imgUrl: product.imgUrl,
          txtVal: product.txtVal,
          desc: product.desc,
          category: product.category,
          price: product.price,
          quantity: 1
          // Other product details
        })
        .then(() => {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000); 
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });

      }
    
    
    } else {
      // Implement logic for temporary cart (optional)
    }

  }


  //listening for changes for butuuon switch
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const cartRef = collection(txtdb, `userCart/${userId}/products`);
      const unsubscribe = onSnapshot(cartRef, (querySnapshot) => {
        const cartItems = querySnapshot.docs.map((doc) => doc.data());
        setCartItems(cartItems);
      });
      return () => unsubscribe(); // Unsubscribe when component unmounts
    }
  }, [currentUser]);
  //

    // Function to handle item deletion from the cart
    const removeFromCart = async (productId) => {
      if (currentUser) {
        const userId = currentUser.uid;
        const cartRef = collection(txtdb, `userCart/${userId}/products`); // Reference the collection of products in the user's cart
        try {
          // Query the cart collection to find the document that contains the product with the given ID
          const querySnapshot = await getDocs(cartRef);
          querySnapshot.forEach((doc) => {
            const productData = doc.data();
            if (productData.productId === productId) {
              // If the product ID matches, delete the document
              deleteDoc(doc.ref);
            }
          });
    
          // Update the cart items in the local state after deletion
          const updatedCartItems = cartItems.filter((item) => item.productId !== productId);
          setCartItems(updatedCartItems);
          console.log("Product deletion completed");
          setremovedPopup(true)
      setTimeout(() => setremovedPopup(false), 3000);

        } catch (error) {
          console.error("Error removing product:", error);
        }
      } else {
        // Implement logic for temporary cart (optional)
      }
    }
    
    

  //popup

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
    document.title = "Merch - UNIFEST"
    getData();
  }, []);

  //skeleton loading
  useEffect(() => {
    setIsLoading(true); // Start loading before fetching data
    getData().then(() => {
      setIsLoading(false); // Stop loading after data is fetched
    });
  }, []);

  //modal add to cart
  const [popupMessage, setPopupMessage] = useState("");

  const popupcart = (selectedProductData) => {
    setCartItems((prevCartItems) => [...prevCartItems, selectedProductData]);

    

    if (currentUser) {
      const userId = currentUser.uid;
      const productRef = collection(txtdb, `userCart/${userId}/products`); // User-specific cart collection

      if(selectedProductData.color.length > 1 &&  selectedProductData.sizes.length > 1){

        if (!selectedColor && selectedProductData.color.length > 1) {
          setPopupMessage("Please choose a color");
            setVariationPopup(true);
          setTimeout(() => setVariationPopup(false), 3000);
          return;
        }
    
        if (!selectedSize && selectedProductData.sizes.length > 1) {
          setPopupMessage("Please choose a size");
          setVariationPopup(true);
          setTimeout(() => setVariationPopup(false), 3000);
          return;
        }

        addDoc(productRef, {
          imgUrl: selectedProductData.imgUrl,
          txtVal: selectedProductData.txtVal,
          desc: selectedProductData.desc,
          category: selectedProductData.category,
          price: selectedProductData.price,
          quantity: 1,
          color: selectedColor,
          size: selectedSize
          // Other product details
        })
        .then((docRef) => {
          console.log("Product added to user cart");
          const documentId = docRef.id;
          updateDoc(doc(txtdb, `userCart/${userId}/products/${documentId}`), {
            productId: docRef.id,
          });
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000); 
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });

      }else{
        addDoc(productRef, {
          productId: selectedProductData.id,
          imgUrl: selectedProductData.imgUrl,
          txtVal: selectedProductData.txtVal,
          desc: selectedProductData.desc,
          category: selectedProductData.category,
          price: selectedProductData.price,
          quantity: 1
          // Other product details
        })
        .then(() => {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000); 
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
      }
    
    } else {
      // Implement logic for temporary cart (optional)
    }
  }

  //buy now

  const gotocart = () => {
    navigate('/cart')
  }

  const buynow = (selectedProductData) => {
    setCartItems((prevCartItems) => [...prevCartItems, selectedProductData]);


    if (currentUser) {
      const userId = currentUser.uid;
      const productRef = collection(txtdb, `userCart/${userId}/products`); // User-specific cart collection
    
      if(selectedProductData.color.length > 1 &&  selectedProductData.sizes.length > 1){

        if (!selectedColor && selectedProductData.color.length > 1) {
          setPopupMessage("Please choose a color");
            setVariationPopup(true);
          setTimeout(() => setVariationPopup(false), 3000);
          return;
        }
    
        if (!selectedSize && selectedProductData.sizes.length > 1) {
          setPopupMessage("Please choose a size");
          setVariationPopup(true);
          setTimeout(() => setVariationPopup(false), 3000);
          return;
        }

        addDoc(productRef, {
          imgUrl: selectedProductData.imgUrl,
          txtVal: selectedProductData.txtVal,
          desc: selectedProductData.desc,
          category: selectedProductData.category,
          price: selectedProductData.price,
          quantity: 1,
          color: selectedColor,
          size: selectedSize
          // Other product details
        })
        .then((docRef) => {
          console.log("Product added to user cart");
          const documentId = docRef.id;
          updateDoc(doc(txtdb, `userCart/${userId}/products/${documentId}`), {
            productId: docRef.id,
          });
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000); 
        })
        .finally(() =>{
          navigate('/cart')
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });

      }else{
        addDoc(productRef, {
          productId: selectedProductData.id,
          imgUrl: selectedProductData.imgUrl,
          txtVal: selectedProductData.txtVal,
          desc: selectedProductData.desc,
          category: selectedProductData.category,
          price: selectedProductData.price,
          quantity: 1
          // Other product details
        })
        .then(() => {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000); 
        })
        .finally(() =>{
          navigate('/cart')
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
      }
    } else {
      // Implement logic for temporary cart (optional)
    }
  }
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  function handleColorSelect(color) {
    setSelectedColor(color);
}
function handleSizeSelect(size) {
  setSelectedSize(size);
}

const [showPopup, setShowPopup] = useState(false);
const [removedPopup, setremovedPopup] = useState(false);
const [variationPopup, setVariationPopup] = useState(false)



  return (
    <div className="theStore ">
      <UserNav />

      <div className="uploaded-posts-container page">
        <div className="search-container">
          <span>
            <CiSearch className="search-icon" />
            <input
              className="searchInput"
              type="text"
              placeholder="search for something..."
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
          </div>
        ) : (
          <div className="uploaded-posts">
          {filteredData.length > 0 ? (
            filteredData.map((product) => {
              const isInCart = cartItems.some(
                (item) => item.productId === product.id
              );
              return (
                <div className="product" key={product.id}>
                  <img
                    src={product.imgUrl}
                    onClick={() => handleProductClick(product)}
                    height="200px"
                    width="200px"
                    alt="product"
                  />
                  <div className="product-info">
                    <h2 className="product-name">{product.txtVal}</h2>
                    <p className="product-description">{product.desc}</p>
                    <p className="product-category">{product.category}</p>
                    <span>
                      <p className="product-price">
                        &#8358;&nbsp;{parseFloat(product.price).toLocaleString('en-US')}
                      </p>
                      {isInCart ? (
                        <button onClick={() => removeFromCart(product.id)}>Remove</button>
                      ) : (
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                      )}
                    </span>
                  </div>
                </div>
              );
            })
          ) : null}
        </div>
        )}

        {filteredData.length === 0 && (
          <div className="no-results">No products found</div>
        )}

        <div className={`product-modal ${isProductModalOpen ? "open" : ""}`}>
          {selectedProductData && (
            
            <div className="popup-details">

              <div className="closeIcon">
                <p className="close" onClick={handleCloseModal} > <IoIosArrowBack />back to store</p>
              </div>


              <div className="container">

              <div className="left">
              {selectedProductData.imgUrl && selectedProductData.imgUrl.map((url, index) => (
                    <img key={index} src={url} alt="Product" />
                  ))}
              </div>

              <div className="right">

              <h2>{selectedProductData.txtVal}</h2>
              {/* Add image */}

              <p className="price"> &#8358; {parseFloat(selectedProductData.price).toLocaleString('en-us')}</p>
              <p>{selectedProductData.desc}</p>

              {(selectedProductData.color.length > 0 || selectedProductData.sizes.length > 0) && (
                <h5>VARIATIONS:</h5>
              )}

               {selectedProductData.color.length > 0? (
              <div className="color">
              {selectedProductData.color.map((color) => (
                <button  onClick={() => handleColorSelect(color)} className='variation' key={color}    style={{
                  border: selectedColor === color ? '2px solid black' : '1px solid gray', // Change border style based on selection
                }}>
                {color}
              </button>
              ))}
              </div>
              ) : null}

                {selectedProductData.sizes.length > 0? (
                <div className="size">
                    {selectedProductData.sizes.map((size) => (
                      <button onClick={() => handleSizeSelect(size)} className="variation" key={size}  style={{
                        border: selectedSize === size ? '2px solid black' : '1px solid gray', // Change border style based on selection
                      }}>{size}</button>
                    ))}
                </div>
              ) : null}
           
              
              {/* ... other product details ... */}
              <div className="buy-now">
               

                {cartItems.some(item => item.productId === selectedProductData.id) ? (
                        <button onClick={() => gotocart()}>Buy now</button>
                      ) : (
                        <button  onClick={() => buynow(selectedProductData)}>Buy Now</button>
                      )}

                {cartItems.some(item => item.productId === selectedProductData.id) ? (
                        <button onClick={() => removeFromCart(selectedProductData.id)}>Remove from cart</button>
                      ) : (
                        <button onClick={() => popupcart(selectedProductData)}>Add to Cart</button>
                      )}
              </div>

              </div>

              </div>


            </div>
          )}
        </div>

        {showPopup && (
        <div className="popup">

          <div className="spinner" onClick={() => setShowPopup(false)}>
           <MdCancel className='icon' /> Item has been added to cart
          </div>

        </div>
      )}

    {variationPopup && (
        <div className="popup">

          <div className="spinner variation" onClick={() => setVariationPopup(false)}>
           <MdCancel className='icon' /> {popupMessage}
          </div>

        </div>
      )}

        {removedPopup && (
        <div className="popup">

          <div className="spinner removed" onClick={() => setremovedPopup(false)}>
           <MdCancel className='icon' /> Item has been removed from cart
          </div>

        </div>
      )}


      </div>
    </div>
  );
}

export default Store;
