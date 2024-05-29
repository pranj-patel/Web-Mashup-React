import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setArea } from "../../redux/features/area";
import { useAutoCompleteQuery } from "../../redux/Apis/geoSlice";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSortDescending, HiOutlineSortAscending } from "react-icons/hi";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar2 = () => {
  // Auth0 logout function
  const { logout } = useAuth0();

  // State to toggle the display of the middle section
  const [toggle, setToggle] = useState(true);

  // React Router navigation hook
  const navigate = useNavigate();

  // State for the search input
  const [search, setSearch] = useState("");

  // State for storing autocomplete suggestions
  const [suggest, setSuggest] = useState([]);

  // Getting the current area state from the Redux store
  const state = useSelector((state) => state.area);

  // Fetching autocomplete data from an API using a custom hook
  const { data: autoSearch, isLoading, error } = useAutoCompleteQuery(search);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Effect to update suggestions when the autocomplete data changes
  useEffect(() => {
    const data = autoSearch?.features;
    if (data) {
      // Mapping API response to suggestions
      const suggestions = data.map((arr) => {
        return {
          name: arr.properties.formatted,
          placeId: arr.properties.place_id,
        };
      });
      console.log(suggestions); // Debugging log to show suggestions
      setSuggest(suggestions);
    }
  }, [autoSearch]);

  console.log(state); // Debugging log to show current state

  // Function to handle area selection
  const handleArea = (area) => {
    // Dispatching the selected area to the Redux store
    dispatch(setArea(area));
    // Navigating to the home page
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">VisitBites</Link>
      </div>

      {/* Middle section, toggles visibility based on state */}
      <div
        style={{
          display: `${toggle ? "flex" : "none"}`,
        }}
        className="navbar-mid"
      >
        <ul className="navbar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          {/* Future link for places */}
          {/* <li>
            <Link to="/places">Places</Link>
          </li> */}
        </ul>
        <div className="navbar-search">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(() => e.target.value);
            }}
            placeholder="Search..."
          />
          {suggest && (
            <div className="suggest">
              <select
                name=""
                className="select"
                value={state}
                style={{
                  display: `${suggest ? "flex" : "none"}`,
                }}
                onChange={(e) => {
                  handleArea(JSON.parse(e.target.value));
                }}
                id=""
              >
                <option value={""}></option>
                {suggest.map((s, index) => {
                  const value = JSON.stringify(s).toString();
                  return (
                    <option key={index} value={value}>
                      {s.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </div>

      <ul className="navbar-links2">
        <button
          className="btn btn-outline-secondary btn-block"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </button>
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
          className="nav-toggle"
        >
          {toggle ? <HiOutlineSortAscending /> : <HiOutlineSortDescending />}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar2;
