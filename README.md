# Express TypeScript Courses API

A small REST API for managing courses, built with **Express 5** and **TypeScript**. It is a learning project that shows a clean separation into routes, controllers, models and middleware, plus request validation and common middleware (`helmet`, `morgan`, `debug`).

Data is stored **in memory**, so it resets every time the server restarts.

## Tech Stack

- Node.js 18+ and TypeScript 5
- Express 5
- `helmet` (security headers), `morgan` (request logging), `debug` (namespaced debug logs), `dotenv`
- `nodemon` + `ts-node` for development

## Getting Started

```bash
git clone https://github.com/Hamed4002/express-typescript-courses-api.git
cd express-typescript-courses-api
npm install
cp .env.example .env
npm run dev
```

The server starts on `http://localhost:3000` (change `PORT` in `.env`).

### Scripts

| Script              | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Run with auto-reload (`nodemon` + `ts-node`)  |
| `npm run build`     | Compile TypeScript to `dist/`                 |
| `npm start`         | Run the compiled build (`node dist/index.js`) |
| `npm run typecheck` | Type-check without emitting files             |

### Environment variables

| Variable   | Default       | Description                                                                     |
| ---------- | ------------- | ------------------------------------------------------------------------------- |
| `PORT`     | `3000`        | Port the server listens on                                                      |
| `NODE_ENV` | `development` | In `development`, `morgan` request logging is enabled                           |
| `DEBUG`    | _(unset)_     | Enables `debug` output, e.g. `app:*` (namespaces: `app:startup`, `app:request`) |

## API

| Method | Endpoint           | Description                                  | Success |
| ------ | ------------------ | -------------------------------------------- | ------- |
| GET    | `/`                | Home page (plain text)                       | 200     |
| GET    | `/api/courses`     | List the **topics** of all courses           | 200     |
| GET    | `/api/courses/:id` | Get one course                               | 200     |
| POST   | `/api/courses`     | Create a course                              | 201     |
| PUT    | `/api/courses/:id` | Replace a course's topic and instructor      | 200     |
| DELETE | `/api/courses/:id` | Delete a course (returns the deleted course) | 200     |

A course looks like this:

```json
{ "id": 1, "topic": "Math", "instructor": "Isaac Newton" }
```

**Validation:** `topic` and `instructor` are required strings with at least 3 characters (after trimming). Invalid input returns `400` with a message; an unknown or invalid id returns `404`. Ids are never reused after a delete.

### Examples

```bash
# list topics
curl http://localhost:3000/api/courses

# create a course
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"topic":"Chemistry","instructor":"Marie Curie"}'

# update a course
curl -X PUT http://localhost:3000/api/courses/2 \
  -H "Content-Type: application/json" \
  -d '{"topic":"Advanced Physics","instructor":"Richard Feynman"}'

# delete a course
curl -X DELETE http://localhost:3000/api/courses/1
```

## Project Structure

```
src/
├── index.ts                    # App setup, middleware, route mounting, server start
├── routes/
│   ├── home-route.ts
│   └── courses-route.ts
├── controller/
│   ├── home-controller.ts
│   └── courses-controller.ts   # Request handling and validation
├── models/
│   └── courses.model.ts        # Course type and in-memory data access
└── middlewares/
    ├── logger.ts               # Per-request debug log
    └── authentication.ts       # Placeholder (see below)
```

## Limitations

- Data is in memory only; there is no database.
- `authentication` is a placeholder that lets every request through.
- There are no automated tests yet.
