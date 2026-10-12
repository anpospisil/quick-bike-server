# Quick Bike server

Express API for Quick Bike: auth, bikes, reservations, and lock and unlock. The front end is the separate `quick-bike-client` repo.

## Stack

- Node, Express 4, Sequelize 6 with Postgres (`pg`)
- JWT auth (`jsonwebtoken`) with `bcrypt` password hashing; middleware in `auth/middleware.js`
- Nodemailer for reservation emails

## Commands

```bash
npm install
npm run dev       # nodemon with an artificial 1s delay (DELAY=1000)
npm start         # production start
npm run migrate   # sequelize-cli db:migrate
npm run seed      # sequelize-cli db:seed:all
npm run initdev   # migrate + seed
npm run resetDB   # undo all migrations, then migrate + seed
```

There are no automated tests yet.

## Routes

- `POST /login`, `POST /signup`, `GET /me`, `PATCH /profile` (`routers/auth.js`)
- `GET /bike`, `PATCH /bike/unlock`, `PATCH /bike/lock` (`routers/bike.js`)
- `POST /reservation`, `PATCH /reservation/end`, `GET /reservation` (`routers/reservation.js`)
- `GET /health` and `HEAD /health` for uptime checks (`routers/health.js`)

Routes that change state use `authMiddleware`.

## Data

- Models: `user`, `bike`, `reservation` in `models/`
- Schema changes go in a new migration in `migrations/`; never edit an existing one.
- Seed data is in `seeders/`.
- `config/config.json` selects the database by `NODE_ENV`. Development and production both read `DATABASE_URL`; production also requires SSL.

## Environment variables

- `DATABASE_URL`: Postgres connection string (development and production)
- `JWT_SECRET`: signing key for tokens
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`: reservation start and end emails. These point to a throwaway test account (quickbike2020@outlook.com) used for the demo; it isn't a monitored inbox, and emails aren't a guaranteed part of the user flow.
- `PORT`: defaults to 4000
- `DELAY`: optional artificial latency in ms, used by `npm run dev`

## Deploy

- Runs as a web service on Render, with a free Render Postgres database.
- **The free database expires every 30 days.** Before it does: dump it with `pg_dump "<external-url>" -Fc -f backup.dump`, delete the old database, create a new free one, restore with `pg_restore --no-owner -d "<new-external-url>" backup.dump`, update `DATABASE_URL` on the web service to the new internal URL, redeploy, then check the live client shows bikes on the map.
- `Procfile` and `post-release.sh` (migrate + seed on release) are from an earlier Heroku setup.

## Conventions

- Default branch is `development`.
- Never commit passwords, API keys, or database URLs. Read them from environment variables.
