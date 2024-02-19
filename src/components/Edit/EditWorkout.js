import React, { useState } from "react";

import styles from "./EditWorkout.module.css";
import { useDispatch, useSelector } from "react-redux";

const EditWorkout = (props) => {
  const workout = useSelector((state) => state.workout_library).find(
    (itm) => itm.id == props.workoutId
  );
  const dispatch = useDispatch();
  const [data, setData] = useState(
    props.workoutId === "New"
      ? {
          name: "",
          activities: [],
        }
      : {
          ...workout,
        }
  );

  const removeActivity = (id) => {
    setData((prev) => {
      const newobj = { ...prev };
      const acts = newobj.activities;
      const newActs = acts.filter((itm) => itm.id != id);
      return { ...newobj, activities: newActs };
    });
  };

  const addActivity = () => {
    if (
      newActivityData.name.trim() !== "" &&
      newActivityData.reps.trim() !== ""
    ) {
      setData((prev) => {
        return {
          ...prev,
          activities: [
            ...prev.activities,
            {
              id: crypto.randomUUID(),
              name: newActivityData.name,
              reps: newActivityData.reps,
            },
          ],
        };
      });
      setNewActivityData({ name: "", reps: "1" });
    }
  };

  const [newActivityField, setNewActivityField] = useState(false);
  const [newActivityData, setNewActivityData] = useState({
    name: "",
    reps: "1",
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (data.name.trim() !== "" && data.activities.length !== 0) {
      if (props.workoutId === "New") {
        dispatch({
          type: "ADD_WORKOUT_TO_LIBRARY",
          payload: {
            id: crypto.randomUUID(),
            ...data,
          },
        });
      } else {
        dispatch({
          type: "UPDATE_WORKOUT",
          payload: {
            id: props.workoutId,
            workoutInfo: {
              name: data.name,
              activities: data.activities,
            },
          },
        });
      }

      props.changeView("Home");
    }
  };

  return (
    <div className={styles.editWork}>
      <h1>{props.workoutId === "New" ? "New Workout" : "Edit Workout"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={styles.inputField}>
          <label>Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => {
              setData((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
        </div>
        {data.activities.map((itm) => (
          <div key={itm.id} className={styles.activity}>
            <button
              onClick={() => {
                removeActivity(itm.id);
              }}
            >
              -
            </button>
            <div>
              <h2>{itm.name}</h2>
              <p>{itm.reps}</p>
            </div>
          </div>
        ))}

        {newActivityField && (
          <div className={styles.newActField}>
            <div className={styles.inputField}>
              <label>Activity: </label>{" "}
              <input
                type="Reps"
                value={newActivityData.name}
                onChange={(e) => {
                  setNewActivityData((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
            </div>
            <div className={styles.inputField}>
              <label>Reps: </label>{" "}
              <input
                type="number"
                value={newActivityData.reps}
                onChange={(e) => {
                  setNewActivityData((prev) => {
                    return { ...prev, reps: e.target.value };
                  });
                }}
              />
            </div>
            <div className={styles.flexButtons}>
              <button
                onClick={() => {
                  setNewActivityField(false);
                }}
              >
                Cancel
              </button>
              <button type="button" onClick={addActivity}>
                Add
              </button>
            </div>
          </div>
        )}

        {!newActivityField && (
          <button
            onClick={() => {
              setNewActivityField(true);
            }}
            className={styles.activityButton}
          >
            Add Activity
          </button>
        )}
        <button type="submit" className={styles.createButton}>
          {props.workoutId === "New" ? "Create Workout" : "Edit Workout"}
        </button>
        <button
          type="reset"
          className={styles.closeButton}
          onClick={() => {
            props.changeView("Home");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditWorkout;
