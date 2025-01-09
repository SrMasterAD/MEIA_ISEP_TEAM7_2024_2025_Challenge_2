import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Home from "./Home";
import Rankings from "./Rankings";
import Classification from "./Classification";

const App = () => {
  return (
    <Router>
      <main className="flex flex-col">
        <Banner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/classification" element={<Classification />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
