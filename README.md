# texas flood information viewer

## Setup

Install Node.
Currently builds with Node v8.9.2 (npm v6.4.1)

Install Packages: `npm install` (had to use `-f` flag to install on Fedora 27 and ubuntu 18 - might be related to using these newer node version than the original v6 the app originated in)

Note: may have to rebuild node-sass after npm installs: `npm rebuild node-sass`

To retrieve the secrets file, install [ansible](http://www.ansible.com/)

## Developing

1. place a copy `vault-password.txt` into the root of this repo `~/flood`. You might need to change spaces to newlines. cd into the root folder and run `make pull-secrets` to quickly download, decrypt, and properly place the secrets file.
    * Alternatively (without ansible), make a copy of `src/keys/secrets.sample.es`, fill out and save as `src/keys/secrets.es`
1. `npm start` to start a hot-reloading development web server. First time starting, may require you create the empty directory `dist` in the project root.
1. Open browser to `http://localhost:3545`

## Test

1. `npm run test` will run the Mocha Test suite

## Production Build

1. `npm run dist` will produce a production build in the `/dist/` folder

## Favicons, Icons, & Images

https://realfavicongenerator.net/
1. Favicon.ico is converted to PNG format and then uploaded to the realfavicongenerator. Should be a minimum pixel size of 144x144. This generator will offer numerous options for specific shortcut icons and favicons for a multitude of devices.
1. Go through the settings and tweak the various ones as necessary.
1. Be sure to declare the 'path' in the last settings option ("Favicon Generator Options") to be `/icons`. Then click to Generate
1. After generation is complete, download the Favicon Package and use it to replace the images within `/src/images/icons`. Then copy the HTML code and use it to replace the pre-existing image code within `/src/index.swig`
