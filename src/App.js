import Navbar from "./Components/Navbar";
import "./Styles/Main.scss";
import "./App/App-styles/AllStyles.scss";
import "./Admin/AdminStyles/AdminstylesMain.scss";
import { BrowserRouter as Router } from "react-router-dom"; 
import AnimatedRoutes from "./Pages/AnimatedRoutes";
import Footer from "./Components/Footer";
import TawkToChat from "./App/App-components/TawkToChat";
import Pop from "./Pages/Pop";

function App() {
  return (
    <div className="App">
      
      <Router>

      <Navbar />

      <AnimatedRoutes />
      <Pop />

      <TawkToChat />

      <Footer />

      </Router>

    </div>
  );
}

export default App;
