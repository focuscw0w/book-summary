import classes from "./session-button.module.css";
import { getUser } from "@/features/auth/lib/dal";
import { logout } from "@/features/auth/actions/actions";

export default async function SessionButton() {
  const user = await getUser();

  async function handleLogout() {
    await logout();
  }

  return (
    <>
      <button onClick={handleLogout} className={classes.button}>
        Log out
      </button>
      <p>{user?.email}</p>
    </>
  );
}
