// build.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ChaiConfig } from './src/config/chai-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist folder
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

let css = `/* Chai Mini Tailwind v1.0.0 - Lightweight Utility-first CSS Framework */
/* Inspired by Tailwind CSS, built from ChaiConfig */
/* GitHub: https://github.com/imohit1o1/chai-mini-tailwind */
/* Generated: ${new Date().toISOString()} */

`;

let totalUtilities = 0;

Object.entries(ChaiConfig).forEach(([category, utilities]) => {
    if (typeof utilities !== 'object' || Object.keys(utilities).length === 0) return;

    css += `\n/* ===== ${category.toUpperCase()} UTILITIES ===== */\n`;

    Object.entries(utilities).forEach(([className, styles]) => {
        const classSuffix = className ? `-${className}` : '';
        const fullClass = `chai-${category}${classSuffix}`;

        css += `.${fullClass} {\n`;

        if (typeof styles === 'object') {
            Object.entries(styles).forEach(([prop, value]) => {
                if (prop !== 'animation') {
                    css += `  ${prop}: ${value};\n`;
                }
            });
        } else {
            css += `  ${category}: ${styles};\n`;
        }

        css += '}\n\n';
        totalUtilities++;
    });
});

// Add animations
css += `\n/* ===== ANIMATIONS ===== */\n`;
css += `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n`;
css += `@keyframes ping {\n  75%, 100% { transform: scale(2); opacity: 0; }\n}\n\n`;
css += `@keyframes pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: .5; }\n}\n\n`;
css += `@keyframes bounce {\n  0%, 100% { transform: translateY(-25%); }\n  50% { transform: translateY(0); }\n}\n\n`;

// Write full CSS
fs.writeFileSync(path.join(distDir, 'chai-mini-tailwind.css'), css);
console.log('✅ Generated dist/chai-mini-tailwind.css');
console.log(`📦 Utilities: ${totalUtilities}`);
console.log(`📄 Size: ${(css.length / 1024).toFixed(2)} KB`);

// Minified version
const minified = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/}\s*/g, '}')
    .trim();

fs.writeFileSync(path.join(distDir, 'chai-mini-tailwind.min.css'), minified);
console.log('✅ Generated dist/chai-mini-tailwind.min.css');
console.log(`📦 Minified: ${(minified.length / 1024).toFixed(2)} KB`);

// Package.json for CDN
const cdnPackage = {
    name: "chai-mini-tailwind",
    version: "1.0.0",
    description: "Lightweight utility-first CSS framework inspired by Tailwind",
    main: "dist/chai-mini-tailwind.css",
    style: "dist/chai-mini-tailwind.css",
    files: ["dist"],
    keywords: ["css", "framework", "utilities", "tailwind", "mini", "lightweight", "chai"],
    author: "Mohit Kumar",
    license: "MIT",
    repository: {
        type: "git",
        url: "https://github.com/imohit1o1/chai-tailwind"
    }
};

fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(cdnPackage, null, 2));
console.log('✅ Generated dist/package.json');