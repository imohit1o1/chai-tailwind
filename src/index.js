import { extractChaiClasses } from "./helpers/extract.js"
import { mappingProperty } from "./helpers/mapping.js";
import { parseClaass } from "./helpers/parse.js"
import { applyChaiCss } from "./helpers/apply.js";

const PREFIX = "chai-";

function main() {
    //* select only element having class attribute
    // const all = document.querySelectorAll("*");
    const ElementsWithClassAttribute = document.querySelectorAll("[class]");
    // console.log("ElementsWithClassAttribute", ElementsWithClassAttribute)
    // console.log(typeof ElementsWithClassAttribute)

    //* filtering the correct classes starts with "chai-" and parse them as "utilty-value"
    ElementsWithClassAttribute.forEach((element) => {

        const chaiClasses = extractChaiClasses(element, PREFIX);

        if (chaiClasses.length === 0) return;
        let finalStyles = {};
        chaiClasses.forEach((clx) => {
            //* Parsing the css
            const { property, value } = parseClaass(clx, PREFIX);
            //* Mapping the css with config
            const style = mappingProperty(property, value);
            // merge styles
            Object.assign(finalStyles, style);
        })
        //* Apply styles to element
        applyChaiCss(element, chaiClasses, finalStyles);
    })
    console.log("Chai CDN Loaded");
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});