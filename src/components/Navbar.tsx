import InfoPopup from "./InfoPopup";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="nav-logo">MovieFind</span>
        </Link>
        <Link
          to="https://github.com/lembas-cracker/movie-search-app"
          style={{ color: "inherit", textDecoration: "none" }}
          className="nav-item"
        >
          <img
            src="https://img.icons8.com/m_sharp/200/FFFFFF/github.png"
            className="nav-icon"
            alt=""
            style={{ width: "20px", height: "20px" }}
          />
          <span className="nav-text">GitHub source code</span>
        </Link>
        <InfoPopup />
      </div>
    </div>
  );
};

export default Navbar;
