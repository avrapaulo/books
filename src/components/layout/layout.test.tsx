import { render, screen } from '@testing-library/react';
import { Layout } from '.';

jest.mock('@/components/header', () => ({
  Header: () => <header>Mock Header</header>,
}));

jest.mock('jotai', () => ({
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

describe('Layout Component', () => {
  it('renders the header and children', () => {
    const childText = 'Test Child';
    render(
      <Layout>
        <div>{childText}</div>
      </Layout>
    );

    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
