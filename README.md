# texas flood information viewer

## Setup

Install Node. Version 6 will not work, use version 5.12: `nvm use 5`

Install Packages: `npm install` (had to use `-f` flag to install on Fedora 27)

To retrieve the secrets file, install [ansible](http://www.ansible.com/)

## Developing

1. place a copy `vault-password.txt` into the root of this repo `~/flood`. You might need to change spaces to newlines. cd into the root folder and run `make pull-secrets` to quickly download, decrypt, and properly place the secrets file.
    * Alternatively (without ansible), make a copy of `src/keys/secrets.sample.es`, fill out and save as `src/keys/secrets.es`
1. `npm start` to start a hot-reloading development web server
1. Open browser to `http://localhost:3545`

## Production Build

1. `npm run dist` will produce a production build in the `/dist/` folder

## Favicons, Icons, & Images

https://realfavicongenerator.net/
1. Favicon.ico is converted to PNG format and then uploaded to the realfavicongenerator. Should be a minimum pixel size of 144x144. This generator will offer numerous options for specific shortcut icons and favicons for a multitude of devices.
1. Go through the settings and tweak the various ones as necessary.
1. Be sure to declare the 'path' in the last settings option ("Favicon Generator Options") to be `/icons`. Then click to Generate
1. After generation is complete, download the Favicon Package and use it to replace the images within `/src/images/icons`. Then copy the HTML code and use it to replace the pre-existing image code within `/src/index.swig`
