// /server/src/types/express/openLibrary.interface.ts
export interface OpenLibraryBook {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
  }
  
  export interface OpenLibraryApiResponse {
    docs: OpenLibraryBook[];
  }
  
  export interface OpenLibraryBookDetails {
    title: string;
    authors: { name: string }[];
    publish_date: string;
    number_of_pages: number;
  }