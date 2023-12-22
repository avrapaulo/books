import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '.';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('jotai', () => ({
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

describe('Header Component', () => {
  it('renders navigation links', () => {
    (useRouter as unknown as jest.Mock).mockImplementation(() => ({
      pathname: '/',
    }));
    (useAtom as unknown as jest.Mock).mockImplementation(() => [true]);
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('toggles favorites on button click', () => {
    const mockSetShowFavorites = jest.fn();
    (useAtom as unknown as jest.Mock).mockImplementation(() => [
      false,
      mockSetShowFavorites,
    ]);
    (useRouter as unknown as jest.Mock).mockImplementation(() => ({
      pathname: '/',
    }));
    render(<Header />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockSetShowFavorites).toHaveBeenCalledWith(true);
  });

  it('hides favorite button on non-root paths', () => {
    (useRouter as unknown as jest.Mock).mockImplementation(() => ({
      pathname: '/book',
    }));
    render(<Header />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
