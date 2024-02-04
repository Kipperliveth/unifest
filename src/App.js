import Navbar from "./Components/Navbar";
import "./Styles/Main.scss"
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./Pages/AnimatedRoutes";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      
      <Router>

      <Navbar />

      <AnimatedRoutes />

      <Footer />

      </Router>

    </div>
  );
}

export default App;
