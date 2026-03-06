import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default tseslint.config(
  // 1. GLOBAL IGNORES
  // This must be the first object. It stops ESLint from hanging on big folders.
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**", "temp/**"],
  },

  // 2. BASE CONFIGS
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // 3. YOUR PROJECT SETTINGS
  {
    // Broad matching to ensure it picks up files in your root and subfolders
    files: ["**/*.{ts,tsx,js,mjs}"],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      react: {
        // Automatically detect React version to fix that warning
        version: "18.3",
      },
    },

    rules: {
      // Clean up "let" vs "const"
      "prefer-const": "error",

      // Handle the 'any' types in your q12.ts
      "@typescript-eslint/no-explicit-any": "warn",

      // Modern React doesn't need React imported in every file
      "react/react-in-jsx-scope": "off",

      // Warn about the 'var' and 'console' you just added for testing
      "no-var": "error",
      "no-console": "off", // Keep off for now so you can see your test logs
    },
  },
);
