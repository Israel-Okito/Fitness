import React from "react";

import styles from "./Home.module.css";
import { useSelector } from "react-redux";

const Library = (props) => {
  const library = useSelector((state) => state.workout_library);
 
  
  if (library.length < 1) {
    return(
     <div className={styles.library}>
       <div className={styles.workoutList}>
         <button
           onClick={() => {
             props.changeView("Create Workout");
           }}
         >
           saisir un entrainement
         </button>
         </div>
         <h1 style={{marginLeft:"250px", marginRight:"250px", marginTop:"150px"}}>Pas d'entrainement trouvé</h1>
     </div>
    )

  }
  return (
    <div className={styles.library}>
      <h1>Liste de tes objectifs</h1>

      <div className={styles.workoutList}>
        <button
          onClick={() => {
            props.changeView("Create Workout");
          }}
        >
          saisir un nouveau entrainement
        </button>

       <p > Cliquer l'un des entrainements ci-dessus pour commencer la séance </p>
        {library.map((itm) => (
          <button
            onClick={() => {
              props.changeView("woi" + itm.id);
            }}
            className={styles.libButton}
            key={itm.id}
          >
            {itm.name} 
           
            <img src= {itm?.activities[0].image} alt="aa" width={120} height={120}/>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Library;
