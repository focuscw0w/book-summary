import classes from "./navbar.module.css";
import { getUser } from "@/features/auth/lib/dal";

import LogoutButton from "./logout-button";
import Dropdown from "./drop-down";

export default async function Navbar() {
  const user = await getUser();

  return (
    <header className={classes.header}>
      <h2 className={classes.heading}>Book Summary</h2>
      <nav className={classes.nav}>
        <ul className={classes.menu}>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>My Books</a>
          </li>
          <li className={classes.session}>
            <p>{user?.email}</p>
          </li>
          <li className={classes.session}>
            <LogoutButton />
          </li>
        </ul>
        <div className={classes.dropdown}>
          <Dropdown>
            <p>{user?.email}</p>
            <LogoutButton />
          </Dropdown>
        </div>
      </nav>
    </header>
  );
}
