import { isFormInputElement, setCustomValidity } from "./utils";

const SPECIAL_CHARACTERS_REGEXP = /[^A-Za-z0-9]/;

/** @type {import("../../models/directive.model").Directive} */
export const specialCharactersDirective = {
    attributeName: "specialCharacters",
    setup: (element) => {
        if (!isFormInputElement(element)) {
            throw new Error("Element should be an input element, an select element or a textarea element.")
        }

        const message = element.getAttribute("specialCharactersMessage") ?? "Input should include special characters."

        const eventListener = () => {
            if (SPECIAL_CHARACTERS_REGEXP.test(element.value)) {
                delete element.dataset.specialCharactersValidity;
            } else {
                element.dataset.specialCharactersValidity = message;
            }

            setCustomValidity(element)
        }

        element.addEventListener('input', eventListener);

        return {
            cleanup: () => element.removeEventListener('input', eventListener)
        }
    }
}