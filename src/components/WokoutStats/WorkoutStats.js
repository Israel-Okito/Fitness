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
    const durationAvg =
      workoutHistory.length > 0
        ? workoutHistory.reduce((a, b) => a + b.duration, 0) /
          workoutHistory.length
        : 0;

    const setsAvg =
      workoutHistory.length > 0
        ? workoutHistory.reduce((a, b) => a + b.sets, 0) / workoutHistory.length
        : 0;

    let leastTime = 100000000;
    let mostSets = 0;

    workoutHistory.forEach((itm) => {
      if (itm.duration < leastTime) {
        leastTime = itm.duration;
      }
      if (itm.sets > mostSets) {
        mostSets = itm.sets;
      }
    });

    setData({
      durationAvg: durationAvg,
      setsAvg: setsAvg,
      leastTime: leastTime,
      mostSets: mostSets,
    });
  }, []);

  if (workoutHistory.length < 1) {
    return <div>No History Found</div>;
  }

  return (
    <div className={styles.workoutStats}>
      <h1>Workout Stats</h1>
      <h2>{workout.name}</h2>

      <div className={styles.chart}>
        <Chart data={workoutHistory.reverse()} />
      </div>

      <div className={styles.stats}>
        <p>Total Number Of Workout History: {workoutHistory.length}</p>
        <p>Most Sets: {data.mostSets}</p>
        <p>Most Recent Activity: {workoutHistory[0].date}</p>
        <p>Average Duration: {data.durationAvg}</p>
        <p>Average Sets: {data.setsAvg}</p>
      </div>
    </div>
  );
};

export default WorkoutStats;
