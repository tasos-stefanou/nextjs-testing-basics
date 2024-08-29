import { render, screen } from '@testing-library/react';
import { Reservation } from '@/components/reservations/Reservation';

const jestMockFn = jest.fn();

test('reservation page shows the correct number of seats and purchase button', async () => {
  render(<Reservation showId={0} submitPurchase={jestMockFn} />);
  const heading = await screen.findByText(/10 seats left/i);
  expect(heading).toBeInTheDocument();

  const button = await screen.findByRole('button', {
    name: /purchase/i,
  });
  expect(button).toBeInTheDocument();
});

test('reservation page shows "show is sold out" and NO "purchase" button  when there are no seats available', async () => {
  render(<Reservation showId={1} submitPurchase={jestMockFn} />);
  const heading = await screen.findByText(/Show is sold out!/i);
  expect(heading).toBeInTheDocument();

  const button = screen.queryByRole('button', {
    name: /purchase/i,
  });
  expect(button).not.toBeInTheDocument();
});
