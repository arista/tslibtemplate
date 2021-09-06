import typescript from "rollup-plugin-typescript2"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import pkg from "./package.json"

const extensions = [".js", ".jsx", ".ts", ".tsx"]
const input = "src/index.ts"

const plugins = [
  commonjs(),
  typescript({
    typescript: require('typescript'),
    clean: true
  }),
]

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: false,
    },
    plugins,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: false,
    },
    plugins,
  },
  // Browser-loadable file
  {
    input,
    output: [
      {
        file: "dist/Application.js",
        name: "Application",
        format: "iife",
        sourcemap: true,
        globals: {
        },
      },
    ],
    external: [
    ],
    plugins: [
        ...plugins,
      resolve(),
    ],
  },
]
