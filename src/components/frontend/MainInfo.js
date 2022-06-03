import React, { useEffect, useState } from "react";

/**
 * Component to display all books beloning to an chosen era
 * @function MainInfo
 * @param {object} props Data sent from Main component
 * @returns {object} Component with books belonging to the chosen era
 */
const MainInfo = (props) => {
  /**
   * @typedef {Boolean} loading Handles ternary operator for displaying loading screen and books
   */
  const [loading, setLoading] = useState(false);
  /**
   * UseEffect that operates on props change. Toggles loading component
   * @function useEffect
   */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [props]);
  return (
    <div>
      {loading === true ? (
        <div className="loading loading-lg"></div>
      ) : (
        <>
          {props.info.map((book) => (
            <div
              style={{
                padding: "25px",
                flexDirection: "row",
                background: "none",
                border: "none",
              }}
              className="card book"
            >
              <div
                className="card-image bg-secondary p-centered"
                style={{ margin: "auto" }}
              >
                <img
                  src={book.image}
                  className="img-responsive p-centered"
                  alt=""
                ></img>
              </div>
              <div
                style={{
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                  color: "#FFE81F",
                }}
                className="card-body frontend-card-body"
              >
                <div>
                  {" "}
                  <div className="card-title h5">{book.title}</div>
                  <div className="card-subtile h6 text-muted">
                    By {book.author}
                  </div>
                </div>
                <div className="text-large">{book.content}</div>
                <div>
                  <a
                    href={book.link}
                    style={{
                      backgroundColor: "#e80000",
                      borderColor: "#e80000",
                    }}
                    className="btn btn-error"
                  >
                    Buy
                  </a>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MainInfo;
