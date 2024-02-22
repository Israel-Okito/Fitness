import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./History.module.css";
import Modal, { CloseIcon } from "../UI/Modal";

const History = (props) => {
  const [historySnip, setHistorySnip] = useState([]);
  const history = useSelector((state) => state.workout_history);
  const library = useSelector((state) => state.workout_library);
  const [historyClass, setHistoryClass] = useState("All");
  const [selectedAct, setSelectedAct] = useState("Nothing");
  const dispatch = useDispatch();

  useEffect(() => {
    if (historyClass == "All") {
      setHistorySnip(history);
    } else {
      setHistorySnip(history.filter((itm) => itm.workoutId == historyClass));
    }
  }, [historyClass, history]);

  const deleteHistoryHandler = (id) => {
    dispatch({ type: "DELETE_WORKOUT_FROM_HISTORY", payload: id });
    setSelectedAct("Nothing");
  };

  return (
    <div className={styles.history}>
      {selectedAct !== "Nothing" && (
        <Modal>
          <div className={styles.modal}>
            <div className="header">
              <button
                onClick={() => {
                  setSelectedAct("Nothing");
                }}
                className={styles.closeButton}
              >
                <CloseIcon size="1.5rem" />
              </button>
              <h2>{selectedAct.wName}</h2>
            </div>
            <p>Date: {selectedAct.date}</p>
            <p>Total de series: {selectedAct.sets}</p>
            <p>Durée: {selectedAct.duration}</p>

            <button
              onClick={() => {
                props.changeView("sta" + selectedAct.workoutId);
              }}
            >
              Voir les statistiques d&apos;entrainement
            </button>
            <button
              onClick={() => {
                deleteHistoryHandler(selectedAct.id);
              }}
            >
             supprimer cette activité
            </button>
          </div>
        </Modal>
      )}
      <h1>Historique</h1>

      <select
        value={historyClass}
        onChange={(e) => {
          setHistoryClass(e.target.value);
        }}
      >
        <option value="All">Tout</option>
        {library.map((itm) => {
          return (
            <option key={itm.id} value={itm.id}>
              {itm?.name}
            </option>
          );
        })}
      </select>

      <div className={styles.historyList}>
        {historySnip.map((itm) => {
          const workoutName = library.find((wor) => {
            return wor.id == itm.workoutId;
          })?.name;

          return (
            <button
              onClick={() => {
                setSelectedAct({ ...itm, wName: workoutName });
              }}
              key={itm.id}
            >
              <div className={styles.historyInfo}>
                <p>{workoutName}</p>
                <p className={styles.date}>{itm.date}</p>
              </div>
              <div className={styles.reps}>{itm.sets}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default History;
