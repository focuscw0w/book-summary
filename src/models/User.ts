import { Book } from "./Book";

export interface User {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  bookCollection?: Book[];
}
