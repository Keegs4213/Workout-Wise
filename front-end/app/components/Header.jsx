//Header
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import styles from "./../../app/globals.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>WorkoutWise <FontAwesomeIcon className="fa-icon" icon={faDumbbell} /> </h1>
    </header>
  );
};

export default Header;
