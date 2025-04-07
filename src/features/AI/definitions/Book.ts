export interface SummarizedBook {
  id: number;
  title: string;
  authors: string;
  image: string | null;
  publisher?: string | null;
  publishedDate?: string | null;
  description?: string | null;
  previewLink?: string | null;
  summarizedText: string;
  userId: number;
}