# Progress-Patron

A modern web application for managing tasks and projects

To visit the website, click on the logo.

<a href="http://marcadrian.cfd">
  <p align="center">
    <img height=80 src="https://raw.githubusercontent.com/marcadrian-it/progress-patron/main/assets/images/logo.png"/>
  </p>
</a>

<p align="center">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/marcadrian-it/progress-patron?style=flat-square">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/marcadrian-it/progress-patron?style=flat-square">
</p>

# Stack

- Typescript
- Next.js
- Prisma
- PostgreSQL
- Vercel (serverless edge runtime)
- Tailwind

## Instructions
``npm install`` - installs all the packages

`npm run dev` - runs the webapp on localhost

`npm run devnstudio` - runs webapp and prisma studio concurrently

`npm run build` - generates Prisma client and builds the Next.js application

`npm run lint` - runs the next lint command

`npx prisma migrate reset` - drops, recreates the database, and reseeds it automatically (be careful)

## Preview

![Preview](https://raw.githubusercontent.com/marcadrian-it/progress-patron/main/public/progress-patron-preview.jpg)
