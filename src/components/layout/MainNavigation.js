import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Songify Studio v1</div>
      <nav>
        <ul>
          <li>
            <Link to="/new-song">Dodaj utwór</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
