import React, { useState } from "react";

import styles from "./EditWorkout.module.css";
import { useDispatch, useSelector } from "react-redux";
import exercisesData from "../ExerciseData";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { List } from "@mui/material";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 1400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,

  
};


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
      newActivityData.image.trim() !== "" &&
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
              image: newActivityData.image,
              reps: newActivityData.reps,
            },
          ],
        };
      });
      setNewActivityData({ name: "",image:"", reps: "1" });
    }
  };

  const [newActivityField, setNewActivityField] = useState(false);
  const [newActivityData, setNewActivityData] = useState({
    name: "",
    image:"",
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
  
 //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //image select
  const [selectedImage, setSelectedImage] = useState('');
  const handleImageSelection = (imagePath) => {
    setSelectedImage(imagePath);
    setNewActivityData((prev) => ({
      ...prev,
      image: imagePath,
    }));
    handleClose(false);
  };
  return (
    <div className={styles.editWork}>
      <h1>{props.workoutId === "New" ? "Nouveau entrainement" : "modifier l'entrainement"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={styles.buttonContainer}>
               
            <button type="submit" className={styles.createButton}>
               {props.workoutId === "New" ? "Créer l'entrainement" : "confirmer la modification"}
             </button>
             <button
               type="reset"
               className={styles.closeButton}
               onClick={() => {
                 props.changeView("Library");
               }}
             >
               Annuler
             </button>
        </div>

        <div className={styles.inputField}>
          <label>Saisir le nom de l'entrainement</label>
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
              <img src= {itm.image} alt="" width={10} height={10}/>
              <p>{itm.reps}</p>
            </div>
          </div>
        ))}


        {newActivityField && (
          <div className={styles.newActField}>
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

            <div className={styles.inputField}>
              <label>selectionner un nom d'Activité: </label>{" "}         
                <select
                  type="Reps"
                  value={newActivityData.name}
                  onChange={(e) => {
                    setNewActivityData((prev) => {
                      return { ...prev, name : e.target.value};
                    });
                  }}
               >
                  <option  value="All" >choisir</option>
                  {exercisesData.map((itm) => (
                    <option key={itm.name} value={itm.name}>
                      {itm.name}
                    </option>
                  ))}
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
            
            <div>

            <div style={{display:"flex", alignContent:"center", gap:"30px"}}>
              <Button onClick={handleOpen}>choisir une image d'exercice </Button>  
               {selectedImage && <img src={selectedImage} alt="Selected" width={100} height={100} />}
            </div>
               <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      <List 
                          style={{maxHeight: '80vh', overflowY: 'auto'}}>
                       {exercisesData.map((itm, id) => (
                         <Button
                         key={id} 
                         onClick={() => handleImageSelection(itm.image)}
                         style={{ border:"1px solid grey"}}
                         >
                          
                            <img src= {itm.image} alt="ss" width={350} height={350}/>
                       
                         </Button>
                        ))}
                      </List>
                    </Typography>
                   
                  </Box>
                </Modal>
    

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
      
      </form>
    </div>
  );
};

export default EditWorkout;
