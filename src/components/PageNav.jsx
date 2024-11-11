import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
