import { isFormInputElement, setCustomValidity } from "./utils.js";

/** @type {import("../../models/directive.model").Directive} */
export const inputMatchDirective = {
    attributeName: "match",
    setup: (element, inputToMatchName) => {
        if (!isFormInputElement(element)) {
            throw new Error("Element should be an input element, an select element or a textarea element.")
        }

        const inputToMatch = element.form?.querySelector(`[name=${inputToMatchName}]`);

        if (!inputToMatch || !isFormInputElement(inputToMatch)) {
            throw new Error(`Could not find element to confirm with name ${inputToMatchName}`)
        }

        const message = element.getAttribute("matchMessage") ?? `Input value should match ${getInputLabel(inputToMatch)}'s value.`

        const eventListener = () => {
            if (element.value === inputToMatch.value) {
                delete element.dataset.matchValidity;
            } else {
                element.dataset.matchValidity = message;
            }

            setCustomValidity(element)
        }

        element.addEventListener('input', eventListener);
        inputToMatch.addEventListener('input', eventListener);

        return {
            cleanup: () => {
                element.removeEventListener('input', eventListener)
                inputToMatch.removeEventListener('input', eventListener)
            }
        }
    }
}

/**
 * 
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} input 
 */
function getInputLabel(input) {
    if (input.labels === null) return input.name;
    const firstLabel = input.labels[0];
    if (firstLabel === undefined) return input.name;
    if (firstLabel.textContent === null) return input.name
    return firstLabel.textContent.trim();
}