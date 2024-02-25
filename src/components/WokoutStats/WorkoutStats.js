import React, { useEffect, useState } from "react";
import styles from "./WorkoutStats.module.css";
import { useSelector } from "react-redux";
import Chart from "./Chart";

const WorkoutStats = (props) => {
  const [data, setData] = useState({});
  const workout = useSelector((state) => state.workout_library).find(
    (itm) => itm.id == props.workoutId
  );
  const workoutHistory = useSelector((state) => state.workout_history).filter(
    (itm) => itm.workoutId == props.workoutId
  );

  useEffect(() => {
      // Calcul de la moyenne de la durée des entraînements
    const durationAvg =
      workoutHistory.length > 0
        ? workoutHistory.reduce((a, b) => a + b.duration, 0) /
          workoutHistory.length
        : 0;

    // Calcul de la moyenne du nombre de séries des entraînements
    const setsAvg =
      workoutHistory.length > 0
        ? workoutHistory.reduce((a, b) => a + b.sets, 0) / workoutHistory.length
        : 0;

      // Calcul de la moyenne des calories brûlées
      const caloriesAvg =
      workoutHistory.length > 0
        ? workoutHistory.reduce((a, b) => a + (b.calories || 0), 0) / workoutHistory.length
        : 0;
  
// Initialisation des valeurs minimales et maximales
    let leastTime = 100000000; // Valeur arbitrairement grande pour initialiser la variable
    let mostSets = 0; // Valeur initiale minimale pour les séries
    let mostCalories = 0;   // Valeur initiale minimale pour les calories
// Parcours de chaque élément de l'historique des entraînements
    workoutHistory.forEach((itm) => {
   // Mise à jour de la durée minimale
      if (itm.duration < leastTime) {
        leastTime = itm.duration;
      }
   // Mise à jour du nombre de séries maximum
      if (itm.sets > mostSets) {
        mostSets = itm.sets;
      }
    // Mise à jour du nombre de calories maximum
    if (itm.calories && itm.calories > mostCalories) {
      mostCalories = itm.calories;
    }
    });
    

   // Mise à jour de l'état avec les résultats des calculs
    setData({
      durationAvg: durationAvg,
      setsAvg: setsAvg,
      leastTime: leastTime,
      mostSets: mostSets,
      mostCalories: mostCalories,
      caloriesAvg: caloriesAvg,
    });
  }, []);

  if (workoutHistory.length < 1) {
    return <div>Pas d'historique trouvé</div>;
  }

  return (
    <div className={styles.workoutStats}>
      <h1>Statistique d'entrainement</h1>
      <h2>{workout?.name}</h2>

      <div className={styles.chart}>
        <Chart data={workoutHistory.reverse()} />
      </div>

      <div className={styles.stats}>
        <p>Nombre total d'historique d'entrainement: {workoutHistory.length}</p>
        <p>nombre de séries maximal : {data.mostSets}</p>
        <p>Activité la plus récente: {workoutHistory[0].date}</p>
        <p>Durée moyenne: {data.durationAvg}</p>
        <p>la moyenne du nombre de séries des entraînements: {data.setsAvg}</p>
        {/* <p>la moyenne de la perte de calories: {data.caloriesAvg}</p> */}
        <p>le maximum de la perte de calories: {data.mostCalories}</p>
      </div>
    </div>
  );
};

export default WorkoutStats;
