# Notes app

Notes application, written on Vuejs connected to [REST api on Laravel](https://github.com/vladimirbalin/laravel-notes)



## Installation and deployment

1. Install all dependencies and build to 'dist' folder:

```
npm i
```
Make sure you created .env
```
cp .env.example .env
```
with property set with link to your REST api
```
VUE_APP_API_DOMAIN=
```
2. Now build project to 'dist' folder
```
npm run build
```
3. Or to run app in development mode:
 ```
npm run serve
 ```


### Features and instruments used

- Login and registration, logout
- Adding new, updating and deleting notes


## Tech stack used

- VueJS (Vue router, Vuex)
- HTML, CSS (SCSS), Axios
- Vanilla js with things like: async/await, interaction with localstorage
