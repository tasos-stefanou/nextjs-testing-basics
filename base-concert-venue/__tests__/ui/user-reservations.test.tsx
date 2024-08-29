import { render, screen } from '@testing-library/react';
import { UserReservations } from '@/components/user/UserReservations';

test('User reservations page will show a button to purchase tickets and hide "your tickets" heading if no reservations are found', async () => {
  render(<UserReservations userId={234} />);
  const button = await screen.findByRole('button', {
    name: /Purchase tickets/i,
  });
  expect(button).toBeInTheDocument();

  const heading = screen.queryByRole('heading', {
    name: /Your Tickets/i,
  });

  expect(heading).not.toBeInTheDocument();
});

test('User reservations page will show a button to purchase more tickets if reservations are found', async () => {
  render(<UserReservations userId={1} />);
  const button = await screen.findByRole('button', {
    name: /Purchase more tickets/i,
  });
  expect(button).toBeInTheDocument();
});
