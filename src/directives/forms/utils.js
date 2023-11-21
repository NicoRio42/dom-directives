/**
 * 
 * @param {Element} element 
 * @returns {element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement}
 */
export function isFormInputElement(element) {
    return element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement
}

/**
 * Set input custom validity after all validations occured, to prevent overiding issues
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} input 
 */
export function setCustomValidity(input) {
    setTimeout(() => {
        const validityEntry = Object.entries(input.dataset).find(([key]) => key.toLowerCase().endsWith("validity"));

        if (validityEntry === undefined) {
            input.setCustomValidity("");
            return;
        }

        input.setCustomValidity(validityEntry[1] ?? "");
    })

}