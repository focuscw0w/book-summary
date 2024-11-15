import { Book } from "./Book";

export interface User {
    id: number,
    name: string,
    bookColection: Book[];
}