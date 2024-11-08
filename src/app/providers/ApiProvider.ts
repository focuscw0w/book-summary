type RequestOptions = {
  method?: "GET" | "POST";
  headers?: HeadersInit;
  body?: BodyInit | null;
};

class ApiProvider {
  private apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  }

  // Private method to make an HTTP request
  private async request<T>(url: string, options: RequestOptions): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  /*
  Public method to make a GET request, taking an endpoint URL
   and returning a Promise of type T
   */
  public async get<T>(endpoint: string): Promise<T> {
    const url = `${endpoint}&key=${this.apiKey}`;
    return this.request<T>(url, { method: "GET" });
  }

  /*
    Public method to make a POST request, taking an endpoint URL and a body object,
    returning a Promise of type T
     */
  public async post<T>(endpoint: string, body: object): Promise<T> {
    const url = `${endpoint}&key=${this.apiKey}`;
    return this.request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
}

export default ApiProvider;
