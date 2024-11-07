import ApiProvider from "../providers/ApiProvider";

const apiProvider = new ApiProvider();

export async function fetchBook(query: string) {
    return apiProvider.get<{ items: any[] }>(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
}