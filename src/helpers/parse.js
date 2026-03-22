//* Parse the extracted classed, remove the prefix and keep only utility and value
export function parseClaass(clx, prefix) {
    // console.log("CLX in parse method:", clx)
    const withoutPrefix = clx.slice(prefix.length);

    const parts = withoutPrefix.split("-");
    // console.log("parts", parts)

    const property = parts[0];
    const value = parts.slice(1).join("-")
    return { property, value };
}
