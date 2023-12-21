import Link from 'next/link';
import clsx from 'clsx';
import { HeartIcon } from '@heroicons/react/20/solid';
import { useAtom } from 'jotai';
import { showFavoritesAtom } from '@/jotai/books';
import { useRouter } from 'next/router';

const navigation = [{ name: 'Home', href: '/' }];

export const Header = () => {
  const router = useRouter();
  const [showFavorites, setShowFavorites] = useAtom(showFavoritesAtom);

  return (
    <header className="">
      <nav
        className="mx-auto flex max-w-7xl items-center gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-1 justify-center">
          {navigation.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className="text-sm font-semibold leading-6 text-white"
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-end gap-x-6">
          {router.pathname === '/' ? (
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              type="button"
              className={clsx(
                'ml-4 flex items-center justify-center rounded-md px-1 py-1',
                showFavorites
                  ? 'hover:bg-red-500 hover:text-white text-red-500'
                  : 'bg-red-500 text-white hover:text-red-500 hover:bg-white'
              )}
            >
              <HeartIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            </button>
          ) : (
            <div className="ml-4 flex items-center justify-center rounded-md px-1 py-1">
              <div className="h-5 w-5 flex-shrink-0" />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
