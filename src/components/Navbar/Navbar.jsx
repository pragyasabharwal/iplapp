import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ setSearch }) {
  const location = useLocation();
  const [display, setDisplay] = useState(true);

  return (
    <>
      <div className="flex-col">
        <div className="flex-row">
          <span className="logo">IPL</span>
          {location.pathname.includes("matches") && display && (
            <>
              <input
                type="search"
                placeholder="Enter team(s)"
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <span onClick={() => setDisplay(false)}>X</span>
            </>
          )}
        </div>
        <div className="tabs">
          <Link to="/matches">
            <div>MATCHES</div>
          </Link>
          <Link to="/table">
            <div>TABLES</div>
          </Link>
        </div>
      </div>
    </>
  );
}
