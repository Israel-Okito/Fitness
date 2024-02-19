import React from "react";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";

const WorkoutList = (props) => {
  const library = useSelector((state) => state.workout_library);

  return (
    <>
      <ul className={styles.workoutList}>
        {library.length < 4 && (
          <>
            {library.map((itm) => (
              <button
                onClick={() => {
                  props.changeView("woi" + itm.id);
                }}
                key={itm.id}
              >
                {itm.name}
              </button>
            ))}
          </>
        )}

        {library.length > 3 && (
          <>
            {[0, 1, 2].map((itm) => (
              <button
                onClick={() => {
                  props.changeView("woi" + library[itm].id);
                }}
                key={library[itm].id}
              >
                {library[itm].name}
              </button>
            ))}
          </>
        )}
      </ul>
      <button
        className={styles.allButton}
        onClick={() => {
          props.changeView("Library");
        }}
      >
        All Workouts
      </button>
    </>
  );
};

export default WorkoutList;
