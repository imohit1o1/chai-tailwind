# chai-mini-tailwind

A minimal Tailwind-inspired utility CSS runtime for browser DOM elements. 

This project is a small CSS helpers engine that parses `chai-` prefixed classes from HTML, maps them to style objects defined in a configuration, and applies inline styles to DOM elements automatically.

## 🌟 What we built

- A DOM runtime that scans elements with `class` attributes.
- Extracts classes that start with `chai-`.
- Parses classes into `property` + `value` (e.g. `chai-bg-blue-500` becomes `{ property: 'bg', value: 'blue-500' }`).
- Looks up mapped style definitions from `src/config/chai-config.js`.
- Applies computed CSS as inline styles.
- Removes all `chai-` utility classes from the element after applying styles.

## 🧩 Project structure

- `index.html` - your app shell and demo usage of the `chai-` classes (if present in your repo).
- `src/index.js` - main runtime that handles scanning, parsing, mapping, and applying.
- `src/config/chai-config.js` - style map from utility tokens to CSS object literal (background, text colors, spacing, typography, etc.).
- `src/helpers/extract.js` - finds only `chai-` classes on an element.
- `src/helpers/parse.js` - splits class names into property and value by removing the prefix.
- `src/helpers/mapping.js` - checks `ChaiConfig` and returns resolved CSS style object.
- `src/helpers/apply.js` - applies computed styles to the element and removes the source utility classes.

## 🛠️ Implementation approach

1. Start with a simple prefix-based selector (`chai-`) and separate utility style concern from HTML structure.
2. Keep runtime lightweight and synchronous: one `DOMContentLoaded` pass.
3. Use a `ChaiConfig` object for all CSS matches to support easy extension.
4. Keep helper functions small and testable:
   - extraction (`extractChaiClasses`)
   - parsing (`parseClaass`)
   - mapping (`mappingProperty`)
   - applying (`applyChaiCss`)
5. Avoid direct CSS injection with `.style` and support both single and combined utilities seamlessly via `Object.assign`.

## 🚀 How to run

1. Clone repo:
   ```bash
   git clone <your-repo-url>
   cd chai-tailwind
   ```
2. Ensure `src/index.js` is loaded at end of `<body>` in `index.html`:
   ```html
   <!-- ...your markup... -->
   <script type="module" src="src/index.js"></script>
   </body>
   </html>
   ```
3. Open `index.html` directly in browser (no local server required).
4. Ensure the browser loads `src/index.js` via `<script type="module" src="src/index.js"></script>` at the end of the body.

## ✅ Example usage

```html
<div class="chai-bg-blue-500 chai-text-white chai-p-4">Hello Chai Tailwind</div>
```

At runtime, this becomes inline styles:
- `background-color: #3b82f6`
- `color: #ffffff`
- `padding: 1rem` (mapped value in config)

## 🔧 Extending the utility set

- Add property groups in `src/config/chai-config.js`, e.g. `m`, `w`, `border`, etc.
- Add new values for each property.
- No logic change needed in runtime unless you want to support advanced aliasing or responsive breakpoints.

---

Made by Mohit Kumar (ChaiCode Cohort 2026) — a mini Tailwind runtime engine focusing on clarity, learning, and an incremental mapping architecture.