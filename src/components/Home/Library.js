import React from "react";

import styles from "./Home.module.css";
import { useSelector } from "react-redux";

const Library = (props) => {
  const library = useSelector((state) => state.workout_library);

  return (
    <div className={styles.library}>
      <h1>Library</h1>

      <div className={styles.workoutList}>
        <button
          onClick={() => {
            props.changeView("Create Workout");
          }}
        >
          Create Workout
        </button>
        {library.map((itm) => (
          <button
            onClick={() => {
              props.changeView("woi" + itm.id);
            }}
            className={styles.libButton}
            key={itm.id}
          >
            {itm.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Library;
