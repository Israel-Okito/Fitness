import React from 'react'
import styles from "./Home.module.css"
import WorkoutList from './WorkoutList'

const Home = (props) => {
  return (
    <div className={styles.home}>
      <h1>Welcome Back,</h1>
      <p>Here's what you have for the day</p>
      <p>Home.js</p>

      <WorkoutList changeView={props.changeView}/>
    </div>
  )
}

export default Home