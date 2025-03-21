export interface SummarizedBook {
  id: number;
  title: string;
  authors: string;
  publisher?: string | null;
  publishedDate?: string | null;
  description?: string | null;
  previewLink?: string | null;
  summarizedText: string;
  userId: number;
}