import { BookData } from '@/types/book';
import { atom } from 'jotai';

export const isLoadingAtom = atom(true);
export const searchQueryAtom = atom('');
export const booksAtom = atom<BookData[]>([]);
export const favoritesAtom = atom<number[]>([]);
