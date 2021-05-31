# deloitte-spa

> Deloitte Rewards - SPA App

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


#ckeditor build for deloitte spa 

to update ckeditor5 in this project 

1. make a custom build using the ckeditor online.
https://ckeditor.com/ckeditor-5/online-builder/
the generated config here is added to the repo location made for this project in
https://github.com/zero-8/ckeditor5



2. copy the build setting in the ckeditor5 repository from 1 

clone this repo below 
https://github.com/zero-8/ckeditor5

the current build is in this package 

location is

packages/ckeditor-build-classic/ckeditor.js

add new configurations here 

use commands npm run build 

then publish it to your own npm public repo 

like commands

npm login
: login username 
: login password
: login email 

these are require to login in new project npm

notice you need to change the package version  in the package.json
  "version": "3.0.10",
to publish the build in npm use 

npm publish --access=public


once this is done you have a ckeditor5 custom build 

to use it for nuxt packages. go to step 3 below

3.  once you done step 1 and step 2

clone the package for ckeditor 5 to a different package

https://github.com/zero-8/ckeditor-nuxt


now add the package name build from step 2. 

for instance @packagename/ckeditor5-build-custom-simpleuploader


add this to the /ckeditor-nuxt

then bundle is using

npm run build-bundle

to check it use command

npm run serve


it will then create a browser view to check the ckeditor5 build

use npm login again

npm login 

: login username 
: login password
: login email 

npm publish --access=public

notice you need to change the package version  in the package.json
  "version": "3.0.10",

step4 once publish you  can add the new package now in the deloitte spa project.

this is how to update the ckeditor for deloitte.


refer for the ckeditor build here for nuxt 
https://blowstack.com/blog/frameworks/create-ckeditor-5-custom-build

# frontend-d-project
# frontend-d-project
