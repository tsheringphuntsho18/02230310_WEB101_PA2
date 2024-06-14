// src/app/components/Background.js
import React from "react";
import styles from "../styles/components/Background.module.css";

const Background = () => {
  return (
    <div className={styles.background}>
      <img src={`./image/bg4.jpeg`} alt="background" />
    </div>
  );
};

export default Background;
