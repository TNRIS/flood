# texas flood information viewer

## Setup

Install Node. Version 6 will not work, use version 5.12: `nvm use 5`

Install Packages: `npm install`

## Developing

1. Make a copy of `src/keys/secrets.sample.es`, fill out and save as `src/keys/secrets.es`
1. `npm start` to start a hot-reloading development web server
1. Open browser to `http://localhost:3545`

## Production Build

1. `npm run dist` will produce a production build in the `/dist/` folder