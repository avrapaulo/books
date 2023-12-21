import clsx from 'clsx';
import { useAtom, useAtomValue } from 'jotai';
import { currentPageAtom, totalPagesAtom } from '@/jotai/page';
import { isLoadingAtom } from '@/jotai/books';

export const Pagination = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const totalPages = useAtomValue(totalPagesAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        {!isLoading ? (
          <p className="text-sm text-gray-400">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        ) : null}
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <div
          className={clsx(
            currentPage <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <div
            className={clsx(
              'relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black focus-visible:outline-offset-0',
              currentPage <= 1 ? 'pointer-events-none' : ''
            )}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </div>
        </div>
        <div
          className={clsx(
            currentPage >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <div
            className={clsx(
              'relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black focus-visible:outline-offset-0',
              currentPage >= totalPages ? 'pointer-events-none' : ''
            )}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </div>
        </div>
      </div>
    </nav>
  );
};
