import axios from "axios";
import React, { useEffect, useState } from "react";
import BackendEntry from "./BackendEntry";
import AddPost from "./BackendAdd";

/**
 * This function collects data from a database trough axios
 * @function Backend
 * @returns {object} - Data that is sent to BackendEntry component
 */
const Backend = () => {
  /** Data stored from database
   * @constant {Array} data Data stored from database
   */
  const [data, setData] = useState([]);
  /**
   * Variable that updates list on change
   * @constant {boolean} update
   */
  const [update, setUpdate] = useState(false);
  /**
   * @constant {object} delay Timer
   * @param {number} ms
   */
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Get all books and store them in the variable data
   * Updates on change in variable update
   * @method useEffect
   */
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api",
      headers: { "Content-type": "application/json" },
    }).then(function (response) {
      setData(response.data);
    });
  }, [update]);

  /**
   * Listeningn for change in variable update
   * @function updateData
   */
  const updateData = async () => {
    if (update === false) {
      await delay(500);
      await setUpdate(true);
    } else {
      await delay(500);
      await setUpdate(false);
    }
  };
  return (
    <>
      <AddPost updateList={updateData}></AddPost>
      {data.map((d) => (
        <BackendEntry
          updateList={updateData}
          key={d._id}
          id={d._id}
          title={d.title}
          content={d.content}
          era={d.era}
          author={d.author}
          link={d.link}
          image={d.image}
        ></BackendEntry>
      ))}
    </>
  );
};

export default Backend;
