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
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // ✅ Loosen TypeScript strict rules
      "@typescript-eslint/no-explicit-any": "off", // allow 'any'
      "@typescript-eslint/ban-ts-comment": "warn", // allow @ts-ignore with warning
      "@typescript-eslint/no-non-null-assertion": "warn", // allow '!'
      "@typescript-eslint/no-unused-vars": ["warn"], // only warn unused vars
      "@typescript-eslint/no-empty-function": "off", // allow empty functions
      "react-hooks/exhaustive-deps": "warn", // just warn for missing deps
      "react/no-unescaped-entities": "off", // allow apostrophes etc.
      "no-unused-vars": "off", // handled by TS rule
    },
  },
];

export default eslintConfig;
