export interface BookData {
  id: number;
  title: string;
  download_count: number;
  authors: { name: string }[];
}
