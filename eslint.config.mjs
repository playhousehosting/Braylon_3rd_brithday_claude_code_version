import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Custom rule to prevent mock data usage in production code
      "no-restricted-syntax": [
        "error",
        {
          "selector": "VariableDeclarator[id.name=/mock/i]",
          "message": "Mock data variables are not allowed in production code. Use real database operations instead."
        },
        {
          "selector": "Property[key.name=/mock/i]",
          "message": "Mock data properties are not allowed in production code. Use real database operations instead."
        },
        {
          "selector": "CallExpression[callee.name=/mock/i]",
          "message": "Mock function calls are not allowed in production code. Use real database operations instead."
        }
      ]
    }
  }
];

export default eslintConfig;
