//* Extract the correct classes (only starts with "chai-")
export function extractChaiClasses(element,prefix) {
    // console.log("ELEMENT:", element)
    const result = []
    element.classList.forEach((clx) => {
        if (!clx.startsWith(prefix)) return;
        result.push(clx);
    })
    return result;
}