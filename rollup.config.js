import typescript from "@rollup/plugin-typescript";
import { obfuscator } from "rollup-obfuscator";

import pkg from "./package.json";
// import fs from 'fs';

const plugins = [typescript()];

if (process.env.BUILD === "production") {
  plugins.push(obfuscator());
}

// scss({
//     output: function(styles, styleNodes) {
//         fs.writeFileSync('dist/index.css', styles);
//         fs.writeFileSync('example/src/react-html-layout/index.css', styles);
//     },
// }),

const output = [];
if (process.env.BUILD === "dev") {
  output.push({
    file: "../i2ui-site/src/i2ui/dist/index.js",
    format: "cjs",
    banner: "/* eslint-disable */",
  });
} else {
  output.push({ file: pkg.main, format: "cjs" });
  output.push({ file: pkg.module, format: "esm" });
}

export default [
  {
    input: "src/index.ts",
    dest: "index.js",
    external: Object.keys(pkg.peerDependencies || {}),
    plugins,
    output,
  },
];
