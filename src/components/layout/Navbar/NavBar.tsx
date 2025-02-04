import classes from "./navbar.module.css";
import { getUser } from "@/features/auth/lib/dal";

import LogoutButton from "./logout-button";

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
          <li>
            <p className={classes.user}>{user?.email}</p>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
