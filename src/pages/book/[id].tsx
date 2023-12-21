import { BookData } from '@/types/book';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bookDetails, setBookDetails] = useState<BookData | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://gutendex.com/books/${id}`)
        .then((response) => response.json())
        .then((data) => setBookDetails(data));
    }
  }, [id]);

  return (
    bookDetails && (
      <div className="sm:px-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          Details
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          {bookDetails.title}
        </p>

        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-white sm:w-64 sm:flex-none sm:pr-6">
              Title
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-white">{bookDetails.title}</div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-white sm:w-64 sm:flex-none sm:pr-6">
              Id
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-white">{bookDetails.id}</div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-white sm:w-64 sm:flex-none sm:pr-6">
              {`Author${bookDetails.authors.length > 1 ? 's' : ''}`}
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-white">
                {bookDetails.authors.map(({ name }, index) => (
                  <Fragment key={name}>
                    {index >= 1 ? <>,&nbsp;</> : null}
                    <>{name}</>
                  </Fragment>
                ))}
              </div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-white sm:w-64 sm:flex-none sm:pr-6">
              {`Subject${bookDetails.subjects.length > 1 ? 's' : ''}`}
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-white">
                {bookDetails.subjects.map((name) => (
                  <div key={name}>{name}</div>
                ))}
              </div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-white sm:w-64 sm:flex-none sm:pr-6">
              {`Bookshelve${bookDetails.bookshelves.length > 1 ? 's' : ''}`}
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-white">
                {bookDetails.bookshelves.map((name) => (
                  <div key={name}>{name}</div>
                ))}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    )
  );
};

export default BookDetails;
