"use client";
import { AuthProvider, useAuth } from "@/features/auth/provider/AuthProvider";
import { FormEvent, useState, ReactNode } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();

  // TODO: handle errors
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    signUp(email, password);
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Sign Up</h2>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="email">
            Email
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email} // Bind the email state
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="password">
            Password
          </label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password} // Bind the password state
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
        </div>
        <button style={styles.button} type="submit">
          Sign Up
        </button>
        <p style={styles.text}>Already have an account? Login</p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7f9fc",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center" as const, // Explicitly narrowing to the correct type
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#333",
  },
  field: {
    marginBottom: "1rem",
    textAlign: "left" as const,
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#ffffff",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  },
  text: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#555",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

SignUp.getLayout = function getLayout(page: ReactNode) {
  return <AuthProvider>{page}</AuthProvider>;
};
