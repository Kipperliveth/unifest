import { React, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home";
import Shop from "./Shop";
import Masterclass from "./Masterclass";
import About from "./About";
import Contact from "./Contact";
import Login from "../App/App-auth/Login";
import SignUp from "../App/App-auth/SignUp";
// import Marketplace from "../App/App-pages/Marketplace";
// import AdminDashboard from "../Admin/AdminComponents/AdminDashboard";
import ProtectedRoute from "../App/App-auth/AuthGuard";
import MasterclassMain from "../App/App-pages/MasterclassMain";
import Store from "../App/App-pages/Store";
import UserDashboard from "../App/App-pages/UserDashboard";
import Cart from "../App/App-pages/Cart";
import UserProfile from "../App/App-pages/UserProfile";
import AdminHome from "../Admin/AdminPages/AdminHome";
import AdminNotifications from "../Admin/AdminPages/AdminNotifications";
import Post from "../Admin/AdminPages/Post";
import Uploads from "../Admin/AdminPages/Uploads";
import Onboarding from "../App/App-auth/Onboarding";
import Address from "../App/App-auth/Address";
import ProfilePicture from "../App/App-auth/ProfilePicture";


function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top when the route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/masterclass" element={<Masterclass />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* proteted routes */}
        {/* <Route path='/marketplace' element={<ProtectedRoute>
                      <Marketplace />
                    </ProtectedRoute> }/> */}
        {/* <Route path="/marketplace" element={<Marketplace />} /> */}
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminNotifications" element={<AdminNotifications />} />
        <Route path="/post" element={<Post />}/>
        <Route path='/uploads' element={<Uploads />}/>
        <Route path='/onboarding' element={<Onboarding />}/>
        <Route path="/address" element={<Address />}/>
        <Route path='/profilePic'  element={<ProfilePicture />}/>

        <Route
          path="/userMasterclass"
          element={
            <ProtectedRoute>
              <MasterclassMain />
            </ProtectedRoute>
          }
        />

        <Route path="/store" element={<Store />} />

        {/* <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
