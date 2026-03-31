import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";

function Navbar({ searchData }) {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <Logo />
      </Link>
      <div style={{ flex:1, margin: "0 400px" }}>
        <Search
          placeholder="Search a album of your choice"
          searchData={searchData}
        />
      </div>
      <Button>Give Feedback</Button>
    </nav>
  );
}

export default Navbar;
