import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/20/solid';

const navigation = [{ name: 'Home', href: '/' }];

export const Header = () => (
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
        <button
          type="button"
          className="ml-4 flex items-center justify-center rounded-md px-1 py-1 hover:bg-red-500 hover:text-white text-red-500"
        >
          <HeartIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        </button>
      </div>
    </nav>
  </header>
);
