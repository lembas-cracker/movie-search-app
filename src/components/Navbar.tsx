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

      <NavLink
        to="/actors"
        style={{ textDecoration: "none" }}
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        Actors
      </NavLink>
    </div>
  );
};

export default Navbar;
