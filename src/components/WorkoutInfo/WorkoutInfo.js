import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./WorkoutInfo.module.css";
import Modal, { CloseIcon } from "../UI/Modal";

const WorkoutInfo = (props) => {
  const [delWorkModal, setDelWorkModal] = useState(false);
  const workout = useSelector((state) => state.workout_library).find(
    (itm) => itm.id == props.workoutId
  );
  const workoutHistory = useSelector((state) => state.workout_history).filter(
    (itm) => itm.workoutId == props.workoutId
  );
  const dispatch = useDispatch();

  const workoutAvg =
    workoutHistory.length > 0
      ? workoutHistory.reduce((a, b) => a + b.duration, 0) /
        workoutHistory.length
      : 0;

  const deleteWorkoutHandler = () => {
    props.changeView("Library");
    dispatch({ type: "DELETE_WORKOUT_FROM_LIBRARY", payload: props.workoutId });
  };

  const recentReps = workoutHistory.length > 0 ? workoutHistory[0].sets : 0;
  return (
    <div className={styles.workoutInfo}>
      {delWorkModal && (
        <Modal>
          <div className={styles.modal}>
          Êtes-vous sûr de supprimer cette séance  d'entrainement?
            <div className={styles.flexBut}>
              <button onClick={deleteWorkoutHandler} className={styles.delete}>
                Supprimer l'entrainement
              </button>
              <button
                onClick={() => {
                  setDelWorkModal(false);
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="header">
        <button
          onClick={() => {
            props.changeView("Library");
          }}
        >
          <CloseIcon size="1.5rem" />
        </button>
        <h1>{workout.name}</h1>
      </div>
      <div className={styles.activities}>
        {workout.activities.map((itm) => (
          <div className={styles.activitiesContainer}  key={itm.id}>
            <div className={styles.activity}>
              <div className={styles.number}>{itm.reps}</div>
              <div className={styles.name}>{itm.name}</div>
            </div>
          
              <img src={itm.image} alt="sport" width={350} height={280}/>
          
          </div>
        ))}
      </div>
      <div className={styles.history}>
        <div>
          <h2>{recentReps}</h2>
          <p>Séries Récentes</p>
        </div>
        <div>
          <h2>{workoutAvg.toFixed(2)}</h2>
          <p>Moyenne Minutes</p>
        </div>
      </div>
      <div className={styles.flex}>
        <button
          onClick={() => {
            props.changeView("sta" + props.workoutId);
          }}
          className={styles.hisButton}
        >
          Historique
        </button>

        <button
          onClick={() => {
            props.changeView("wss" + props.workoutId);
          }}
          className={styles.startButton}
        >
          commencer la séance d'entrainement
        </button>
        <div className={styles.flexer}>
          <button
            className={styles.delButton}
            onClick={() => {
              setDelWorkModal(true);
            }}
          >
            supprimer l'entrainement
          </button>
          <button
            className={styles.editButton}
            onClick={() => {
              props.changeView("ewo" + props.workoutId);
            }}
          >
            modifier l'entrainement
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutInfo;
