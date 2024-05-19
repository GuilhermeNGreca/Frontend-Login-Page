# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Architecture

The system consists of 3 layers: `data`, `domain`, and `presentation`. These layers were proposed by [Clean Architecture](https://www.google.de/search?q=clean+architecture).

When compared to the traditional clean architecture diagram, we can explain better how the architecture fits within the original one:

![clean-architecture-diagram](https://user-images.githubusercontent.com/823150/49566359-a3644400-f92a-11e8-9486-e48003bfb7d7.png)

## How to run

Firstly, you must install the project dependencies by running the command:
`yarn` or `npm install`

And to run the project, simply execute:
`yarn start` or `npm run start`

This will make your project run on port [5173](http://localhost:5173).
