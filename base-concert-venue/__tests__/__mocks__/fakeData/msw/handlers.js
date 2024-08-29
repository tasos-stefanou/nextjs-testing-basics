import { rest } from 'msw';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import { fakeUserReservations } from '../userReservations';

export const handlers = [
  rest.get('http://localhost:3000/api/shows/:showId', async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    const { showId } = req.params;
    // show with id 0 has seats available
    // show with id 1 has no seats available
    return res(ctx.json({ show: fakeShows[Number(showId)] }));
  }),
  rest.get(
    'http://localhost:3000/api/users/:userId/reservations',
    async (req, res, ctx) => {
      const { userId } = req.params;
      // user with id 0 has reservations
      // user with random id has no reservations
      const fakeReservationsOfUser = fakeUserReservations.filter(
        (reservation) => reservation.userId === Number(userId)
      );
      return res(ctx.json({ userReservations: fakeReservationsOfUser }));
    }
  ),
];
