
// eslint.config.js
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    files: ["**/*.{js,ts,svelte}"],
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
