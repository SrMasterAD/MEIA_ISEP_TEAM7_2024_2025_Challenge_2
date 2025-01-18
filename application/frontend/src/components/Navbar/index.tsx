import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChartLine, FaLightbulb } from "react-icons/fa";

const Navbar: React.FC = () => {
  const location = useLocation();

  const linkClasses = (path: string) =>
    location.pathname === path
      ? "text-rose-500 text-lg flex items-center"
      : "text-white text-lg flex items-center hover:underline";

  return (
    <nav className="bg-gray-800 p-8">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className={linkClasses("/")}>
            <FaHome className="mr-2" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/rankings" className={linkClasses("/rankings")}>
            <FaChartLine className="mr-2" /> Rankings
          </Link>
        </li>
        <li>
          <Link to="/classification" className={linkClasses("/classification")}>
            <FaLightbulb className="mr-2" /> Predictions
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
