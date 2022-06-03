import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Function to add a a new book to a chosen era
 * @function BackendAdd
 * @param {object} props
 * @param {function} props.updateList Function to update list after action
 * @returns {object} Component to add new post
 */

const AddPost = (props) => {
  /**
   * Values gathered from handleChange function then values used in insertOne function
   * @typedef values
   * @type {object}
   * @property {string} title Book title
   * @property {string} content Book content
   * @property {string} author Book author
   * @property {string} era What era book play out in
   * @property {string} link Link to buy the book
   * @property {string} img Image for book cover
   *
   */
  const [values, setValues] = useState();
  /**
   * Retrived from collection in database
   * @typedef {object}
   */
  const [eras, setEras] = useState([]);
  /**
   * Function to post data to
   * @function insertOne
   * @param {object} e Click event
   * @param {function} e.preventDefault -Prevents default behaviour of submit button
   */
  const insertOne = (e) => {
    e.preventDefault();
    /**
     * Post request
     * @function axios
     * @property {object} data
     * @property {string} data.title
     */
    axios({
      method: "post",
      url: "http://localhost:3001/api/post",
      data: {
        title: values.title,
        content: values.content,
        author: values.author,
        era: values.era,
        link: values.link,
        image: values.image,
      },
    });
    props.updateList();
  };

  /**
   * Fetch eras with axios
   * @function fetch eras
   */
  useEffect(() => {
    axios({
      url: "http://localhost:3001/api/eras",
      method: "get",
      headers: { "Content-type": "application/json" },
    }).then((response) => {
      setEras(response.data);
    });
  }, []);
  /**
   * A function to grab data from text fields
   * @function handleChange
   * @param {object} e Target event for gathering values
   */
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <form className="text-light bg-primary" style={{ padding: "20px" }}>
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Title:
        </label>
        <input
          className="form-input"
          name="title"
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="author">
          Author:
        </label>
        <input
          className="form-input"
          name="author"
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="content">
          Content:
        </label>
        <textarea
          className="form-input"
          name="content"
          onChange={handleChange}
          row="2"
        ></textarea>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="era">
          Era:
        </label>
        <select
          className="form-select"
          id="era"
          onChange={handleChange}
          name="era"
        >
          {" "}
          {eras.map((era) => (
            <option value={era.title}>{era.title}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="link">
          Link:
        </label>
        <input
          className="form-input"
          name="link"
          type="link"
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="image">
          Link:
        </label>
        <input
          className="form-input"
          name="image"
          onChange={handleChange}
        ></input>
      </div>
      <button className="btn bg-success text-light" onClick={insertOne}>
        Add new
      </button>
    </form>
  );
};

export default AddPost;
