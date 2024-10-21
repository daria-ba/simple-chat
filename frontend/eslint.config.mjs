import globals from "globals";
import pluginReact from "eslint-plugin-react";


export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/prop-types': 'off',
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  pluginReact.configs.flat.recommended,
];
