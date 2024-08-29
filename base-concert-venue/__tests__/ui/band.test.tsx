import BandPage from '@/pages/bands/[bandId]';
import { render, screen } from '@testing-library/react';
import { Band } from '@/lib/features/bands/types';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';

test('band component displays correct band info', async () => {
  const { fakeBands } = await readFakeData();
  //   take a random band from the fakeBands array
  const band = fakeBands[Math.floor(Math.random() * fakeBands.length)] as Band;
  render(<BandPage band={band} error={null} />);
  const heading = screen.getByRole('heading', {
    name: band.name,
  });
  expect(heading).toBeInTheDocument();
});

test('band component displays error message when band is null', async () => {
  render(<BandPage band={null} error='Band not found' />);
  const errorMessage = screen.getByRole('heading', {
    name: 'Could not retrieve band data: Band not found',
  });
  expect(errorMessage).toBeInTheDocument();
});
