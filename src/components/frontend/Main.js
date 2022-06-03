import axios from "axios";
import React, { useEffect, useState } from "react";
import Books from "./Books";
import MainInfo from "./MainInfo";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

/**
 *
 * @function Main
 * @returns {Object} Component for whole page
 */
const Main = () => {
  /**
   *Store data from api request
   * @typedef {object} data
   */
  const [data, setData] = useState();
  /**
   * Used to update list on change
   * @typedef {Boolean} update
   */
  const [update, setUpdate] = useState(false);
  /**
   * Used to store data from Books component
   * @typedef {Object} componentInfo
   */
  const [componentInfo, setComponentInfo] = useState([]);
  /**
   * Handles ternary operator in redering component
   * @typedef {boolean} loading
   */
  const [loading, setLoading] = useState(false);
  /**
   * @typedef {function} delay Creating a timmer
   * @param {number} ms
   * @returns {object} Timer
   */
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  /**
   * @function useEffect Gathers eras
   */
  useEffect(() => {
    axios({
      url: "http://localhost:3001/api/eras",
      headers: { "Content-type": "application/json" },
      method: "get",
    }).then(async (response) => {
      await setData(response.data);
      await delay(1000);
      await setLoading(true);
    });
  }, [update]);

  /**
   *
   * @function callInfo
   * @param {object} a Data sent from books component
   */
  const callInfo = (a) => {
    setComponentInfo(a);
  };
  return (
    <div>
      <Header></Header>
      {loading === false ? (
        <></>
      ) : (
        <div
          className=""
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2px",
            fontSize: "20px",
            padding: "15px",
          }}
        >
          {data.map((d) => (
            <NavLink
              key={d._id}
              style={{ padding: "0", textDecoration: "none", color: "#000000" }}
              to={"/frontend/" + d.title.replace(/\s/g, "-").toLowerCase()}
              className={({ isActive }) =>
                "chip " + (isActive ? "active" : "notActive")
              }
            >
              <Books key={d._id} title={d.title} callback={callInfo}></Books>
            </NavLink>
          ))}
        </div>
      )}
      <MainInfo info={componentInfo}></MainInfo>
      <Footer></Footer>
    </div>
  );
};

export default Main;
