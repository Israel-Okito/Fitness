import { createStore } from "redux";
import img from "../assets/joel5.jpg";

const initial_state = {
  workout_library: [
    // {
    //   id: 1,
    //   name: "Boxing Ex1",
    //   activities: [
    //     { id: 1, name: "Push Ups", reps: 4, image:img },
    //     { id: 2, name: "Pull Ups", reps: 4, image:img },
    //   ],
    // },
    // {
    //   id: 2,
    //   name: "Upper Body",
    //   activities: [
    //     { id: 1, name: "Push Ups", reps: 4, image:img },
    //     { id: 2, name: "Pull Ups", reps: 4, image:img },
    //   ],
    // },
    // {
    //   id: 3,
    //   name: "Weight Training",
    //   activities: [
    //     { id: 1, name: "Push Ups", reps: 4, image:img },
    //     { id: 2, name: "Pull Ups", reps: 4, image:img },
    //   ],
    // },
  ],
  workout_history: [
    // { id: 1, workoutId: 1, duration: 33, sets: 5, date: "1/1/2010" },
    // { id: 2, workoutId: 2, duration: 3, sets: 4, date: "1/1/2010" },
    // { id: 3, workoutId: 3, duration: 133, sets: 10, date: "1/1/2010" },
    // { id: 4, workoutId: 2, duration: 23, sets: 2, date: "1/1/2010" },
    // { id: 5, workoutId: 3, duration: 53, sets: 4, date: "1/1/2010" },
  ],
};

const deleteSession = (id, list) => {
  const newList = list.filter((ses) => ses.id != id);
  return newList;
};

const updateWorkout = (id, workout_info, list) => {
  const library = [...list];
  const workout = library.find((itm) => itm.id === id);
  workout.name = workout_info?.name;
  workout.activities = workout_info.activities;

  return library;
};

const workoutReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "ADD_WORKOUT_TO_LIBRARY":
      return {
        ...state,
        workout_library: [action.payload, ...state.workout_library],
      };

    case "ADD_WORKOUT_TO_HISTORY":
      return {
        ...state,
        workout_history: [action.payload, ...state.workout_history],
      };

    case "DELETE_WORKOUT_FROM_LIBRARY":
      return {
        ...state,
        workout_library: deleteSession(action.payload, state.workout_library),
      };

    case "DELETE_WORKOUT_FROM_HISTORY":
      return {
        ...state,
        workout_history: deleteSession(action.payload, state.workout_history),
      };

    case "UPDATE_LIBRARY":
      return {
        ...state,
        workout_library: action.payload,
      };

    case "UPDATE_HISTORY":
      return {
        ...state,
        workout_history: action.payload,
      };

    case "UPDATE_WORKOUT":
      return {
        ...state,
        workout_library: updateWorkout(
          action.payload.id,
          action.payload.workout_info,
          state.workout_library
        ),
      };

    default:
      return state;
  }
};

const store = createStore(workoutReducer);

export default store;
