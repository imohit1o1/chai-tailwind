//* apply the inline css to the element
export function applyChaiCss(element, chaiClasses, finalStyles) {
    Object.entries(finalStyles).forEach(([prop, val]) => {
        element.style[prop] = val;
    });

    // remove only "chai-" classes
    chaiClasses.forEach((clx) => {
        element.classList.remove(clx);
    });
}
