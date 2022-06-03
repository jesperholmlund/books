import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Retrive all books from
 * @function Books
 * @param {object} props Values from parent component
 * @param {function} props.callback Send data upstate
 * @param {string} props.title Param used to filter books
 * @returns {object} Component for menu
 */

const MainComponent = (props) => {
  /**
   * @typedef {object} books - Books stored  in array after filtering books
   */
  const [books, setBooks] = useState([]);
  /**
   * @function handleInfo Used to send  books upstate
   */
  const handleInfo = () => {
    props.callback(books);
  };
  /**
   * Get all books and filters them with @see param.title, returns array with all books and send array to @see books
   * @function useEffect
   */
  useEffect(() => {
    axios({
      url: "http://localhost:3001/api/",
      headers: { "Content-type": "application/json" },
      method: "get",
    }).then((response) => {
      const found = response.data.filter((f) => f.era === props.title);
      setBooks(found);
    });
  }, []);
  return (
    <>
      <span
        onClick={handleInfo}
        style={{ padding: "15px", gap: "5px", background: "none" }}
        className="chip h5"
      >
        {props.title}
      </span>
    </>
  );
};

export default MainComponent;
