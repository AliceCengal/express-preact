# Express and Preact-cli project

Features:
 - full typescript
 - Prisma ORM with sqlite example database
 - basic registration and login using `cookie-session`
 - Frontend
    - Preact app
    - automatic build optimization via preact-cli
    - `react-query`
    - custom hooks: useForm
    - Bootstrap Reboot
    - Google Material icons: https://fonts.google.com/icons

Top level script is an Express app. `yarn start` or `npm run start` evokes a 
server that listens to the specified port, or on 3000. This server serves the 
`/api` route. 

For development, start the `/frontend` server via `yarn dev` or `npm run dev`.
The Express server redirects all `/` requests to the frontend server at `:8080`.

For production, `yarn build` or `npm run build` in the `/frontend` directory,
which bundles the frontend app to `/frontend/build`. The Express server will
statically serve this build directory.

## Initial template commands

```
npx express-generator --no-view express-preact
cd express-preact
npx preact-cli create typescript frontend
```

## Build commands

```
npx prisma generate
npx prisma db push
npx prisma db seed
```
