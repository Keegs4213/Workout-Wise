//Header
//Header
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import styles from "./../../app/globals.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.animatedBg}></div>  
      <h1 className={styles.headerTitle}>WorkoutWise <FontAwesomeIcon icon={faDumbbell} size="1x" /> </h1>
    </header>
  );
};

export default Header;
