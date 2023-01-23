# Storefront Backend API Project

This project was done as a requirement for the completion of the Udacity FullStack JavaScript Nanodegree program.

This project aims to give a real-world scenario in which the backend developer's job is to architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly compiles TypeScript in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`POSTGRES_HOST=127.0.0.1`
`POSTGRES_PORT=3000`
`POSTGRES_DB=shopping`
`POSTGRES_TEST_DB=shopping_test`
`POSTGRES_USER=shopping_user`
`POSTGRES_PASSWORD=password123`
`ENV=dev`
`BCRYPT_PASSWORD=faith-hope-charity`
`SALT_ROUNDS=10`
`TOKEN_SECRET=token123!`

## Local Set up

Before the project can be succefully run locally, we need to set up some tools in our local machine

#### Docker

Docker needs to be installed in your local machine. Docker is used to run the container what holds the database environment, whic is postgres.

[Download Docker](https://www.docker.com/)

Once we have docker installed, open it up and start the docker engine.

Open up the project folder in the terminal

```bash
  cd storefrontBackend
```

Run this command to pull the postgres docker image and start the container in silent mode.

```bash
docker compose up -d
```

This should set up postgres based on the `docker-compose.yml` file in the project folder

## Database port

The postgres database will run on the default port of `:5432`

Please make sure no other application or instance of postgres is using this port.

## Database tables

Now we need to setup our databases.
you will need two for this project -

1. shopping

This is the main database

2. shopping_test

This is the database for test

To create these databases, we need to open psql in the running container.

Run

```bash
docker ps
```

to see the container id of the running container

Copy the container iD and run this command

```bash
docker exec -it <container iD>  bash
```

We should now be able to run commands in the container

Enter into psql with the default `postgres` user

```bash
psql -U postgres
```

Create the databases

```bash
CREATE DATABASE shopping
CREATE DATABASE shopping_test
```

## Run Locally

Go to the project directory

```bash
  cd storefrontBackend
```

Install dependencies

```bash
  npm install
```

Migrate database

```bash
db-migrate up
```

Start the server

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
   npm run test
```