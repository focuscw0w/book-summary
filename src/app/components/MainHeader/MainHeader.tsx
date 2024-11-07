import Icon from "../UI/Icon/Icon";
import classes from "./MainHeader.module.css";

export default function MainHeader() {
  return (
    <>
      <header className={classes.header}>
        <h2 className={classes.heading}>Book Summary</h2>
        <nav className={classes.nav}>
          <ul>
            <li>
              <a>
                <Icon iconName="home" />
                Home
              </a>
            </li>
            <li>
              <a>
                <Icon iconName="books" />
                Books
              </a>
            </li>
            <li>
              <a>
                <Icon iconName="profile" />
                My Profile
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
