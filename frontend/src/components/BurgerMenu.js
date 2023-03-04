import { Link } from 'react-router-dom';
import React from "react";

const BurgerMenu = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "lightblue",
      }}
    >
      <h1 style={{ margin: 0 }}>Pixel</h1>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/bidprice">Bid Price</Link>
        <Link to="/userlist">Table Data</Link>
      </nav>
    </div>
  );
};

export default BurgerMenu;
