import {
  VolumeInfo,
  SaleInfo,
  AccessInfo,
  SearchInfo,
} from "@/features/search/definitions/book-response";

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

export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}
