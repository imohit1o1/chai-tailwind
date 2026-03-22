import { ChaiConfig } from "../config/chai-config.js";

//* mapping the parsed property and value with our config file
export function mappingProperty(property, value) {
    const propertyMap = ChaiConfig[property];
    if (!propertyMap) {
        console.warn("Unknown property:", property);
        return;
    }
    const styleObject = propertyMap[value];
    if (!styleObject) {
        console.warn("Unknown value:", value, "for property:", property);
        return;
    }
    return styleObject;
}