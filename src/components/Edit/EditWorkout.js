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

      props.changeView("Library");
    }
  };
  
  
  const namedefaultactivity = [
   {
    
    name:"c",
   },
   {
    
    name:"a",
   },
   {
    
    name:"b",
   }
    
  ]

  return (
    <div className={styles.editWork}>
      <h1>{props.workoutId === "New" ? "Nouveau entrainement" : "modifier l'entrainement"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={styles.inputField}>
          <label>Nom de l'entrainement</label>
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
              <label>Activité: </label>{" "}
              {/* <input
                type="Reps"
                value={newActivityData.name}
                onChange={(e) => {
                  setNewActivityData((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              /> */}

            <select
              type="Reps"
              value={newActivityData.name}
              onChange={(e) => {
                setNewActivityData((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
           >
            <option  value="All" >choisir</option>
             {namedefaultactivity.map((itm) => {
                  return (
             <option key={itm.id} value={itm.id}>
                {itm?.name}
              </option>
             );
          })}
           </select>
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
                Annuler
              </button>
              <button type="button" onClick={addActivity}>
                Ajouter
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
            Ajouter une activité
          </button>
        )}
        <button type="submit" className={styles.createButton}>
          {props.workoutId === "New" ? "Confirmer la création d'un entrainement" : "confirmer la modification d'un entrainement"}
        </button>
        <button
          type="reset"
          className={styles.closeButton}
          onClick={() => {
            props.changeView("Home");
          }}
        >
          Annuler
        </button>
      </form>
    </div>
  );
};

export default EditWorkout;
