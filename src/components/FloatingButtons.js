import React, { useState } from "react";

const FloatingButtons = (props) => {
  const [moreOpts, setMoreOpts] = useState(false);

  return (
    <div className="floatingB">
      {moreOpts && (
        <div className="moreOpts">
          <button
            onClick={() => {
              setMoreOpts(false);
              props.changeView("Home");
            }}
          >
            Home
          </button>

          <button
            onClick={() => {
              setMoreOpts(false);
              props.changeView("Library");
            }}
          >
            Library
          </button>

          <button
            onClick={() => {
              setMoreOpts(false);
              props.changeView("History");
            }}
          >
            History
          </button>
          <button
            onClick={() => {
              setMoreOpts(false);
              props.changeView("Store");
            }}
          >
            Store
          </button>
        </div>
      )}
      <div className="flex">
        <button className="addB">+</button>
        <button
          onClick={() => {
            setMoreOpts((prev) => !prev);
          }}
        >
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
          >
            <circle cx="2.5" cy="10" r="2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="17.5" cy="10" r="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FloatingButtons;
