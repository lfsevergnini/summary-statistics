# Company Summary Statistics API

This API provides endpoints for maintaining employees and listing summary statistics.

## Running the application

### Docker

To bootstrap and run the application with Docker, run the following command:

```bash
docker-compose up
```

If you want the application to run as a daemon, then add `-d` at the end of the command:

```bash
docker-compose up -d
```

### Non-Docker

Create a `.env` file containing a variable `JWT_KEY` with any value assigned to it. For example:

```ini
JWT_KEY=secret
```

Assuming you have NodeJS and npm installed in your machine, run the following commands:

```bash
npm install
npm run start
```

## Testing

To run the application tests, run:

```bash
npm run test
```

## Docs

API documentation can be accessed at `http://localhost:3000/docs`. There you'll find all existing endpoints with payload examples.

### Auth

All endpoints are authenticated, except for the `auth/token` route itself.

Such endpoints can still be tested via the SwaggerUI docs by clicking on the "lock" icon on the top right of the page and providing a bearer token (which can be generated via UI by hitting the `auth/token` endpoint).
