import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '.';
import { useAtom } from 'jotai';

jest.mock('jotai', () => ({
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

describe('Search Component', () => {
  it('renders input field correctly', () => {
    (useAtom as unknown as jest.Mock).mockImplementation(() => [
      'initial query',
      jest.fn(),
    ]);
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const mockSetSearchQuery = jest.fn();
    (useAtom as unknown as jest.Mock).mockImplementation(() => [
      '',
      mockSetSearchQuery,
    ]);
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'new query' } });
    expect(mockSetSearchQuery).toHaveBeenCalledWith('new query');
  });
});
