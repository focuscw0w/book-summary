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
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Books</a>
          </li>
          <li className={classes.user}>
            <p>{user?.email}</p>
          </li>
          <li className={classes.user}>
            <LogoutButton />
          </li>
          <li className={classes.dropdown}>
            <Dropdown>
              <li>
                <p>{user?.email}</p>
              </li>
              <li>
                <LogoutButton />
              </li>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </header>
  );
}
