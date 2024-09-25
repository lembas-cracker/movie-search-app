import InfoPopup from "./InfoPopup";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-container">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <span className="nav-logo">MovieFind</span>
      </Link>
      <NavLink
        to="/movies"
        style={{ textDecoration: "none" }}
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        Movies
      </NavLink>
      <Link
        to="https://github.com/lembas-cracker/movie-search-app"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <img
          src="https://img.icons8.com/m_sharp/200/FFFFFF/github.png"
          alt=""
          style={{ width: "20px", height: "20px" }}
        />
      </Link>
      <InfoPopup />
      <span className="nav-text">About this project</span>
    </div>
  );
};

export default Navbar;
