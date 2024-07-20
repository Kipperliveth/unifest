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
import UserDashboard from "../App/App-pages/UserDashboard";
import ProfilePicture from "../App/App-auth/ProfilePicture";
import ProtectedRoute from "../App/App-auth/AuthGuard";
import AdminRoute from "../App/App-auth/AdminGuard";
import MasterclassMain from "../App/App-pages/MasterclassMain";
import Store from "../App/App-pages/Store";
import Cart from "../App/App-pages/Cart";
import UserProfile from "../App/App-pages/UserProfile";
import UserNotifications from "../App/App-pages/UserNotifications";
import AdminHome from "../Admin/AdminPages/AdminHome";
import AdminNotifications from "../Admin/AdminPages/AdminNotifications";
import Post from "../Admin/AdminPages/Post";
import Uploads from "../Admin/AdminPages/Uploads";
import Onboarding from "../App/App-auth/Onboarding";
import Address from "../App/App-auth/Address";
import Orders from "../Admin/AdminPages/Orders";
import Editaddress from "../App/App-auth/Editaddress";
import Myorders from "../App/App-pages/Myorders";
import PasswordReset from "../App/App-auth/PasswordReset";
import GetHelp from "../App/App-pages/GetHelp";
import ProfileEdit from "../App/App-auth/ProfileEdit";
import Adminlog from "../Admin/AdminPages/Adminlog";
import NotFound from "./NotFound";

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
        <Route path="/memories" element={<Masterclass />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reset" element={<PasswordReset />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        
        {/* proteted routes */}

        {/* <Route path='/marketplace' element={<ProtectedRoute>
                      <Marketplace />
                    </ProtectedRoute> }/> */}
        {/* <Route path="/marketplace" element={<Marketplace />} /> */}

        {/* <Route path="/userDashboard" element={<ProtectedRoute> <UserDashboard /></ProtectedRoute>} /> */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userProfile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <UserNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/address"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />

        <Route path='/editAddress' element={<ProtectedRoute><Editaddress /></ProtectedRoute>} />
        <Route path='/editprofile' element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>}/>

        {/* neutered */}
        {/* <Route path='/profilePic'  element={<ProtectedRoute><ProfilePicture /></ProtectedRoute>}/> */}
        {/* <Route path="/userDashboard" element={ <UserDashboard />} /> */}

        <Route
          path="/myorders"
          element={
            <ProtectedRoute>
              <Myorders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/merch"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gethelp"
          element={
            <ProtectedRoute>
              <GetHelp />
            </ProtectedRoute>
          }
        />

        <Route
          path="/comingsoon"
          element={
              <MasterclassMain />
          }
        />

        {/* admin routes */}
        <Route
          path="/adminHome"
          element={
            <AdminRoute>
              {" "}
              <AdminHome />
            </AdminRoute>
          }
        />
        <Route
          path="/adminNotifications"
          element={
            <AdminRoute>
              <AdminNotifications />
            </AdminRoute>
          }
        />
        <Route
          path="/post"
          element={
            <AdminRoute>
              <Post />
            </AdminRoute>
          }
        />
        <Route path="/orders" element={<AdminRoute><Orders /></AdminRoute> } />
        <Route
          path="/adminlog"
          element={
            <AdminRoute>
              <Adminlog />
            </AdminRoute>
          }
        />
        <Route path='/uploads' element={<AdminRoute><Uploads /></AdminRoute>}/>
        {/* <Route path="/uploads" element={<Uploads />} />
        <Route path="/orders" element={<Orders />} /> */}

      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
