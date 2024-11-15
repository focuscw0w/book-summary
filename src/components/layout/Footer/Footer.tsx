import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <h5 className={classes.subtitle}>Book Summary</h5>
      <p>A website that summarizes your favorite books!</p>
    </footer>
  );
};

