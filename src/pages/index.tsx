import { Pagination } from '@/components/pagination';
import { Search } from '@/components/search';
import { BookList } from '@/components/book-list';
import { booksAtom } from '@/jotai/books';
import { useAtomValue } from 'jotai';

export const Homepage = () => {
  const books = useAtomValue(booksAtom);

  return (
    <>
      <Search />
      <div className="border-t border-white/10 pt-11">
        <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">
          Books
        </h2>
        <BookList />
      </div>
      {books.length > 0 && <Pagination />}
    </>
  );
};

export default Homepage;
