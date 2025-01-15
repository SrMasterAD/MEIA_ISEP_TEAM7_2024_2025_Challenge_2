import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Classification from "./Classification";
import Home from "./Home";
import Rankings from "./Rankings";

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <main className="flex flex-col">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/classification" element={<Classification />} />
      </Routes>
      <Footer />
    </main>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
