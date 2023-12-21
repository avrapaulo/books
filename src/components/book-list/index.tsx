import { Fragment, useCallback, useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import clsx from 'clsx';
import { HeartIcon } from '@heroicons/react/20/solid';
import {
  booksAtom,
  favoritesAtom,
  isLoadingAtom,
  searchQueryAtom,
} from '@/jotai/books';
import { MAX_PAGE_SIZE } from '@/constants';
import { currentPageAtom, totalPagesAtom } from '@/jotai/page';
import { debounce } from 'lodash';

export const BookList = () => {
  const currentPage = useAtomValue(currentPageAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const setTotalPages = useSetAtom(totalPagesAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const setBooks = useSetAtom(booksAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const books = useAtomValue(booksAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const fetchBooksDebounced = useCallback(
    debounce(async (page: number, query: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://gutendex.com/books/?search=${query}&page=${page}`
        );
        const data = await response.json();
        setBooks(data.results);
        const totalResults = data.count;
        setTotalPages(Math.ceil(totalResults / MAX_PAGE_SIZE));
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    fetchBooksDebounced(currentPage, searchQuery);
  }, [currentPage, searchQuery, fetchBooksDebounced]);

  const toggleFavorite = (id: number) => {
    if (typeof window === 'undefined') return;
    let updatedFavorites: number[];
    if (favorites.find((idSaved: number) => idSaved === id)) {
      updatedFavorites = favorites.filter((idSaved: number) => idSaved !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, []);

  return !isLoading ? (
    <ul role="list" className="divide-y divide-white/25">
      {books.map(({ id, title, authors, download_count }) => (
        <li
          key={id}
          className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
        >
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                {title}
              </h2>
            </div>
            <div className="mt-1 flex text-xs leading-5 text-gray-400 flex-col gap-y-1">
              {authors.map(({ name }, index) => (
                <Fragment key={name}>
                  {index >= 1 ? <>,&nbsp;</> : null}
                  <>{name}</>
                </Fragment>
              ))}
              <div className="flex gap-x-1">
                <p className="text-gray-300">
                  Download{download_count > 1 ? 's' : ''}:
                </p>
                <p>{download_count}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(id)}
            type="button"
            className={clsx(
              'ml-4 flex items-center justify-center rounded-md px-1 py-1 text-gray-400 hover:bg-gray-400 hover:text-white',
              favorites.find((idSaved: number) => idSaved === id)
                ? 'text-red-500'
                : ''
            )}
          >
            <HeartIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Add to favorites</span>
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <ul role="list" className="divide-y divide-white/25">
      {Array.from(Array(MAX_PAGE_SIZE).keys()).map((index) => (
        <li
          key={index}
          className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8 cursor-wait"
        >
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-white w-20 h-5 bg-slate-600 rounded animate-pulse"></h2>
            </div>
            <div className="mt-1 flex text-xs leading-5 text-gray-400 flex-col gap-y-1">
              <div className="w-20 h-5 bg-slate-600 rounded animate-pulse" />

              <div className="flex gap-x-1">
                <p className="text-gray-300">Download:</p>
                <p className="w-20 bg-slate-600 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="ml-4 flex items-center justify-center rounded-md px-1 py-1 text-gray-400 cursor-not-allowed"
          >
            <HeartIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Add to favorites</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
