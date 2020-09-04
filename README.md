# texas flood information viewer

## Setup

Install Node.
Currently builds with Node v12.13.0 (npm v6.12.0)

Install Packages: `npm -f install` 

Note: may have to rebuild node-sass after npm installs: `npm rebuild node-sass`

#### setup app secrets
* setup aws cli with proper permissions
* pull secrets by running `. sterling.sh pullSecrets` from the command line
* when updated, push secrets by running `. sterling.sh pushSecrets` from the command line
* Alternatively (without aws), make a copy of `src/keys/secrets.sample.es`, fill out and save as `src/keys/secrets.es`

## Developing

1. `npm start` to start a hot-reloading development web server. First time starting, may require you create the empty directory `dist` in the project root. Open browser to `http://localhost:3545`

## Test

1. `npm run test` will run the Mocha Test suite

## Production Build

1. `npm run dist` will produce a production build in the `/dist/` folder

Prod Note: if you receive a permission error (`./node_modules/webpack/bin/webpack.js: Permission denied`) when running the production dist command, run `npm rebuild` and try again

## Favicons, Icons, & Images

https://realfavicongenerator.net/
1. Favicon.ico is converted to PNG format and then uploaded to the realfavicongenerator. Should be a minimum pixel size of 144x144. This generator will offer numerous options for specific shortcut icons and favicons for a multitude of devices.
2. Go through the settings and tweak the various ones as necessary.
3. Be sure to declare the 'path' in the last settings option ("Favicon Generator Options") to be `/icons`. Then click to Generate
4. After generation is complete, download the Favicon Package and use it to replace the images within `/src/images/icons`. Then copy the HTML code and use it to replace the pre-existing image code within `/src/index.njk`
