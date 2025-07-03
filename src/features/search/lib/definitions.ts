export interface VolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating?: string;
  imageLinks?: ImageLinks;
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

interface IndustryIdentifier {
  type: string;
  identifier: string;
}

interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
}

export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: { isAvailable: boolean };
  pdf: { isAvailable: boolean };
  webReaderLink?: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

export interface SearchInfo {
  textSnippet: string;
}
