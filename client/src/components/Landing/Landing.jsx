import React from "react";
import { Link } from "react-router-dom";
import styles from "../Landing/Landing.module.css";
import PathRoutes from "../helpers";

export default function LandingPage() {
    return (
      <div className={styles.repo}>
        <div className={styles.landingContainer}> 
          <h1 className={styles.tittle} >¡Bienvenido al mundo de los perros!</h1>
          <Link to={PathRoutes.HOME}>
            <button className={styles.button}>Ingresa aquí 🐶</button>
          </Link>
        </div>
      </div>
      )
  }



