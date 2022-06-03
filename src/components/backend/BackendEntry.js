import React, { useState } from "react";
import axios from "axios";

/**
 * Component for entires in database
 * @function BackendEntry
 * @param {object} props
 * @param {function} props.updateList
 * @param {number} props._id
 * @returns {Object}
 */
const BackendEntry = (props) => {
  /**
   * @typedef {boolean} edit Toogle between edit and reading mode
   * @example Clicking on an edit button will change content from uneditable to editable
   */
  const [edit, setEdit] = useState(false);
  /**
   * Values from props that are used in rendering the component
   * @typedef {object} values
   * @property {string} title From props.title
   * @property {string} content From props.content
   * @property {string} author From props.author
   * @property {string} era From props.era
   * @property {string} link From props.link
   * @property {string} img From props.img
   *
   */
  const [values, setValues] = useState({
    title: props.title,
    content: props.content,
    author: props.author,
    link: props.link,
    era: props.era,
    image: props.image,
  });
  /**
   * Deletes record from database
   * @function handleDelete
   */
  const handleDelete = () => {
    axios({
      method: "delete",
      url: "http://localhost:3001/api/delete/" + props.id,
    });
    props.updateList();
  };
  /**
   * Updating a record. Gathers data from values, sends data to database, updates list
   * @function handleUpdate
   *
   */
  const handleUpdate = () => {
    axios({
      url: "http://localhost:3001/api/update/" + props.id,
      method: "put",
      data: {
        title: values.title,
        content: values.content,
        author: values.author,
        link: values.link,
        image: values.image,
      },
    });
    props.updateList();
    setEdit(!edit);
  };
  /** Bind values from textfields and put them in values variable
   * @function handleChange
   * @param {event} e Target event for targeting valueb and name from textfields
   */
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  /**
   * Function to toggle edit or read mode
   * @function handleEdit
   */
  const handleEdit = () => {
    setEdit(!edit);
  };
  return (
    <div className="card">
      {edit === false ? (
        <>
          <div className="card-header">
            <div className="card-title h5">{props.title}</div>
            <div
              className="card-image bg-secondary p-centered"
              style={{ margin: "auto" }}
            >
              <img
                src={props.image}
                className="img-responsive p-centered"
                alt=""
              ></img>
            </div>
          </div>
          <div className="card-body">
            <span className="card-text">{props.content}</span>
          </div>
          <div className="card-footer">
            <span className="chip">{props.era}</span>
            <span className="chip">{props.author}</span>
            <a href={props.link}>
              <span className="chip">Link</span>
            </a>
          </div>
        </>
      ) : (
        <div className="card-body">
          <form>
            <div className="form-group">
              <input
                className="form-input"
                name={"title"}
                defaultValue={props.title}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group">
              <textarea
                className="form-input"
                row="2"
                name={"content"}
                defaultValue={props.content}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <input
                className="form-input"
                name={"author"}
                defaultValue={props.author}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group">
              <input
                className="form-input"
                name={"link"}
                defaultValue={props.link}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group">
              <input
                className="form-input"
                name={"image"}
                defaultValue={props.image}
                onChange={handleChange}
              ></input>
            </div>
          </form>
        </div>
      )}
      <div className="card-footer">
        <a
          className="card-link"
          onClick={handleDelete}
          style={{ cursor: "pointer" }}
        >
          Delete
        </a>{" "}
        {edit === false ? (
          <a
            className="card-link"
            onClick={handleEdit}
            style={{ cursor: "pointer" }}
          >
            Edit
          </a>
        ) : (
          <>
            <a
              onClick={handleUpdate}
              className="card-link"
              style={{ cursor: "pointer" }}
            >
              Update
            </a>{" "}
            <a
              onClick={handleEdit}
              className="card-link"
              style={{ cursor: "pointer" }}
            >
              Cancel
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default BackendEntry;
