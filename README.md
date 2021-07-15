# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Node version : v14.16.1
## Install modules
### `npm install` in client folder
### `npm install` in api folder
## Available Scripts

To run the project with both api and client :
### `cd api`
### `npm run dev`

Or run client and api separately :
### `npm start` in api folder
### `npm start` in client folder

Runs the app in the development mode.\
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

## Linter
Config for linter is in client -> package.json.

Linter config for api is in api -> eslintconfig.json.
### `npm run lint` to see issues in api or client folder
### `npm run lintfix` to fix issues in api or client folder


## Main features

### CRUD on ingredient :
Add a new ingredient with a name, quantity, and/or emoji. \
Update the name. \
Update the quantity by passing a number -> calculate the new quantity. \
Delete an ingredient. \

Searchbar allows to filter ingredients by name and display the ingredients matching this name.