export interface BookData {
  id: number;
  title: string;
  download_count: number;
  subjects: string[];
  bookshelves: string[];
  authors: { name: string }[];
}
