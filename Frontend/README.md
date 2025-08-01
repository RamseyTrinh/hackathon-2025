# React JS Advance-Level Folder Structure

How to run the project
```bash
npm i
```
and
```bash
npm run dev
```

Before using This project install latest versions of following packages

- [Axios](https://www.npmjs.com/package/axios)
- MaterialUI
- [React Icons](https://react-icons.github.io/react-icons/)
- React Router Dom
- Other Required packages

In the project I have just set Up most used folder structure:

```bash
React JS Advanced Folder Structure
.
├── public
|     └── index.html
├── src
    ├── assets
    |     ├── audios
    |     ├── icons
    |     ├── images
    |     └── videos
    ├── components
    ├── constants
    ├── layouts
    ├── pages
    ├── routers
    |     ├── path.js
    |     └── Routers.js
    ├── store
    |     ├── action.js  
    |     ├── reducers.js  
    |     └── store.js
    ├── services
    |     ├── api.js
    |     └── dataUtils.js
    ├── utils
    |     ├── helpers
    |     |     ├── arrays.js
    |     |     └── helpers.js
    |     └── hooks  
    |           └── useIsMobile.js  
    ├── .env
    ├── App.jsx
    ├── index.css
    ├── main.jss
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

### Public

Public mainly contain root file **`index.html`** which help to run react project.

### Layout

This is just a special folder for **placing any layout based components.**

- Header
- Footer
- Breadcrumbs
- Navbar
- Sidebar

### Pages

Pages will have all the pages which we will use in website.

### Routes

Router will have all the Routes in website. Where we are going and where we want to go.


### .env.development

Env files are used to store sensitive credentials such as API keys.

```javascript
REACT_APP_API_URL=http://localhost:8000
REACT_APP_DEBUG_MODE=true
```

### .env.example

Env files are used to store sensitive credentials such as API keys.

```javascript
REACT_APP_API_KEY=
REACT_APP_API_URL=
```

### .eslintrc.cjs

ESLint, which is a popular tool for linting and enforcing coding style and best practices in JavaScript code. The .eslintrc.cjs file is written in CommonJS module format and is used to configure ESLint for your project.

### .gitignore

.gitignore file contain all those files,folders name which user want to skip to push online. If you don't want to push any specific file/folder then you should put their name in .gitignore

### .prettierrc.cjs

`.prettierrc.cjs` file is a configuration file used for Prettier, which is a widely used code formatting tool. Prettier helps ensure consistent and automatic code formatting across your codebase. The `.prettierrc.cjs` file is written in CommonJS module format and is used to configure Prettier's behavior for your project.

- File Format & Naming
- Configuration Setup
- Export Configuration

```javascript
module.exports = {
  printWidth: 80,
  tabWidth: 3,
  singleQuote: true,
  trailingComma: 'es5',
};
```

### jscongig.json

- File Purpose
- Configuration Setup:
- JSON Format

```javascript
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### package.json

package.json file is core to the Nodejs ecosystem and is a fundamental part of understanding and working with Node. js , npm , and even modern JavaScript . This file is used as a manifest, storing information about applications, modules, packages, and more.

### vite.config.js

- File Purpose:
The vite.config.js file allows you to customize various aspects of your Vite project, including configuration options for the development server, build process, and plugin settings.

- Configuration Setup:
Inside the vite.config.js file, you export an object containing the configuration options for your Vite project. This object can include settings related to the development server, build process, plugins, and more.

- JavaScript Format:
The vite.config.js file is written in JavaScript, and it's named vite.config.js. It should be placed in the root directory of your Vite project.