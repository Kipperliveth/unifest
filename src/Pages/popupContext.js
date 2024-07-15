import React, { createContext, useContext, useState } from 'react';

// Create a context
const PopupContext = createContext();

// Create a provider component
export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

// Custom hook to use the Popup context
export const usePopup = () => useContext(PopupContext);
