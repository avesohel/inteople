// ESLint flat config (v9).
// The site JS is intentionally dependency-free, ES5-style vanilla (IIFE + var +
// "use strict"), authored for direct <script> use — NOT modules. These rules
// catch real bugs (undeclared globals, unused vars, accidental reassignment)
// without fighting that deliberate style. Node tooling scripts are treated as
// ESM separately.
import js from "@eslint/js";
import globals from "globals";

export default [
  // Never lint legacy or vendored code.
  {
    ignores: ["archive/**", "**/vendor/**", "node_modules/**", "dist/**"],
  },

  js.configs.recommended,

  // Browser site scripts: assets/scripts/*.js, vc/vc.js, sites/**/*.js
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        ...globals.browser,
        // Cross-file globals this site sets/reads on window.
        INTEOPLE: "readonly",
        PERSON: "readonly",
        qrcode: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { args: "none" }],
      "no-undef": "error",
      eqeqeq: ["warn", "smart"],
      "no-var": "off", // ES5 style is intentional here.
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  // Node tooling scripts (ESM).
  {
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
