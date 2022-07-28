# Notes app

Notes application, written on VueJS connected to [REST api on Laravel](https://github.com/vladimirbalin/laravel-notes)



## Installation and deployment/development

1. Install all dependencies:

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
3. Or run app in development mode:
 ```
npm run serve
 ```


### Features and instruments used

- Login and registration, logout
- Adding new, updating and deleting notes
- Redirecting to login page, if not authenticated

## Tech stack used

- VueJS (Vue router, Vuex)
- HTML, CSS (SCSS)
- Axios
- Vanilla js with things like: async/await, interaction with local storage
