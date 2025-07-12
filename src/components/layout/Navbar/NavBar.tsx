import { getUser } from "@/features/auth/lib/session-dal";
import classes from "./navbar.module.css";

import LogoutButton from "./logout-button";
import Dropdown from "./drop-down";
import NavLink from "./nav-link";

export default async function Navbar() {
  const user = await getUser();

  return (
    <header className={classes.header}>
      <h2 className={classes.heading}>Book Summary</h2>
      <nav className={classes.nav}>
        <ul className={classes.menu}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/my-books">My Books</NavLink>
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
