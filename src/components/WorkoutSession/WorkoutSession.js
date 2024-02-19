import React, { useEffect, useState } from "react";

import styles from "./WorkoutSession.module.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";

const WorkoutSession = (props) => {
  const workout = useSelector((state) => state.workout_library).find(
    (itm) => itm.id == props.workoutId
  );
  const [endModal, setEndModal] = useState(false);
  const [sets, setSets] = useState(1);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId); // <-- cleanup function
  }, [isRunning]);

  const handleStopwatch = () => {
    setIsRunning(false);
  };

  const handleEndWorkout = () => {
    handleStopwatch();
    props.changeView("Home");
    // const day = new Date().getDate();
    // const month = new Date().getMonth() + 1;
    // const year = new Date().getFullYear();

    const data = {
      id: crypto.randomUUID(),
      workoutId: props.workoutId,
      duration: Math.floor((timeElapsed % 3600) / 60),
      sets: sets,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    };

    dispatch({ type: "ADD_WORKOUT_TO_HISTORY", payload: data });

  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <div className={styles.workoutSession}>
      {endModal && (
        <Modal>
          <div className={styles.modal}>
            Are you sure you want to end this workout?
            <div className={styles.flexButtons}>
              <button onClick={handleEndWorkout}>End Workout</button>
              <button
                onClick={() => {
                  setEndModal(false);
                }}
                className={styles.cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className={styles.filler}></div>
      <h1>Workout</h1>
      <h2>{workout.name}</h2>
      <div className={styles.carousel}>
        {workout.activities.map((itm) => (
          <div className={styles.activity} key={itm.id}>
            <p className={styles.number}>{itm.reps}</p>
            <p>{itm.name}</p>
          </div>
        ))}
      </div>
      <div className={styles.status}>
        <p>
          Set <span className={styles.sets}>{sets}</span>
        </p>
        <p>
          <span className={styles.stat}>{formatTime(timeElapsed)}</span>
        </p>
      </div>

      <button
        onClick={() => {
          setEndModal(true);
        }}
      >
        End Workout
      </button>
      <button
        className={styles.next}
        onClick={() => {
          setSets((prev) => prev + 1);
        }}
      >
        Next Set
      </button>
    </div>
  );
};

export default WorkoutSession;
