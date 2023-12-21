import { Pagination } from '@/components/pagination';
import { Search } from '@/components/search';
import { BookList } from '@/components/book-list';

export const Homepage = () => (
  <>
    <Search />
    <div className="border-t border-white/10 pt-11">
      <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">
        Books
      </h2>
      <BookList />
    </div>
    <Pagination />
  </>
);

export default Homepage;
