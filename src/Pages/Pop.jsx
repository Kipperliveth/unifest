import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Popup from './Presale';

const Pop = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <Navbar setShowPopup={setShowPopup} />
      <Popup showPopup={showPopup} setShowPopup={setShowPopup} />
    </div>
  );
};

export default Pop;
