# Progress-Patron

A modern web application for managing tasks and projects

To visit the website, click on the logo.

<a href="http://progresspatron.eu">
  <p align="center">
    <img height=80 src="https://raw.githubusercontent.com/marcadrian-it/progress-patron/main/assets/images/logo.png"/>
  </p>
</a>

<p align="center">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/marcadrian-it/progress-patron?style=flat-square">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/marcadrian-it/progress-patron?style=flat-square">
</p>

# Stack

-   [TypeScript](https://www.typescriptlang.org/)
-   [NextJS](https://nextjs.org/)
-   [Prisma](https://www.prisma.io/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Vercel (serverless edge runtime)](https://vercel.com/)
-   [Tailwind](https://tailwindcss.com/)
-   [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) / [Clerk.dev](https://clerk.com/)
-   [ESLint](https://eslint.org/)

## Instructions

`npm install` - Installs all the packages

`npm run dev` - Runs the webapp on localhost

`npm run devnstudio` - Runs webapp and Prisma Studio concurrently

`npm run build` - Generates Prisma client and builds the Next.js application

`npm run start` - Starts the Next.js production server

`npm run test` - Runs Vitest for unit and integration tests

`npm run test:playwright` - Runs Playwright for end-to-end tests

`npm run lint` - Runs ESLint to fix linting issues in all JavaScript and TypeScript files

`npm run lint:check` - Runs ESLint to check for linting issues without fixing them

`npm run format` - Runs Prettier to format all JavaScript and TypeScript files

`npm run prettier:check` - Checks if all JavaScript and TypeScript files are formatted correctly

`npx prisma migrate reset` - Drops, recreates the database, and reseeds it automatically (use with caution)


## Preview

![Preview](https://raw.githubusercontent.com/marcadrian-it/progress-patron/main/public/progress-patron-preview.jpg)
