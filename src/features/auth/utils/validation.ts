export function validateUserCredentials(email: string, password: string) {
  if (email.trim().length === 0 || password.trim().length === 0) return false;
  return true;
}
