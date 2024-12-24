// refactored to use async/await
class httpClient {
  private apiKey: string | undefined;
  url: string;
  headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  constructor() {
    this.url = "https://jsonplaceholder.typicode.com";
  }

  public async get<T>(path: string): Promise<T> {
    try {
      const response = await fetch(`${this.url}/${path}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error: unknown) {
      this.handleError(error);
      throw error;
    }
  }

  public async post<T>(path: string, data: object): Promise<T> {
    try {
      const response = await fetch(`${this.url}/${path}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error: unknown) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: Error) {
    console.error(error);
  }
}

export default httpClient;
