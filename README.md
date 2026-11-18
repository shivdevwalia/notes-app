# Notes API and React Client

A learning project combining an Express/MongoDB notes API with React registration, login, and note-list screens.

The backend supports note creation, listing, update, and deletion. The current frontend provides authentication screens and note listing; it does not expose the full backend CRUD workflow.

## Code map

- [API composition](backend/index.js)
- [User routes](backend/routes/user.routes.js)
- [Notes routes](backend/routes/note.route.js)
- [Token middleware](backend/middlewares/authenticate.middleware.js)
- [React interface](frontend/src/App.jsx)

## Development prerequisites

Install dependencies with `npm --prefix backend ci` and `npm --prefix frontend ci`. Review `backend/db.js` and use a disposable MongoDB database. Start the backend with `npm --prefix backend run server` and the frontend with `npm --prefix frontend run dev`. The frontend targets the API at `http://localhost:8080`.

## Current limits

The signing secret is hardcoded, token expiry is absent, and record update/delete routes do not constrain mutations by the authenticated owner. Note creation also needs server-side owner binding. The frontend logs authentication tokens. These need separate code fixes before use with real accounts or private notes. The backend test command is a placeholder.
