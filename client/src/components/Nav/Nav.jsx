import {Link} from "react-router-dom";
import styles from "../Nav/Nav.module.css";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation()
      return (
      <div className={styles.navbar}>
        <Link to="/form">
          {(location.pathname !== '/form' ) && <button className={styles.button1}>Create Dogs</button>}
        </Link>
        <Link to="/home">
        {(location.pathname !== '/home' ) && <button className={styles.button2}>Home</button>}
        </Link>
      </div>
    );
  };
  
  export default Nav;