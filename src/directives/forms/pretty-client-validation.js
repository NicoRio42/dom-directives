import { isFormInputElement, setCustomValidity } from "./utils.js";

/** @type {import("../../models/directive.model.js").Directive} */
export const prettyClientValidationDirective = {
    attributeName: "prettyClientValidation",
    setup: (element) => {
        if (!(element instanceof HTMLFormElement)) {
            throw new Error("prettyClientValidation should be used on a form element.")
        }

        /**
         * @param {SubmitEvent} event 
         */
        const eventListener = (event) => {
            event.preventDefault();

            element.dataset.submited = ""

            Array.from(element.querySelectorAll("input, select, textarea")).forEach(input => {
                if (!isFormInputElement(input)) return;
                handleInputError(input);
            })
        }

        element.addEventListener("submit", eventListener)

        return {
            cleanup: () => element.removeEventListener("submit", eventListener)
        }
    }
}

/**
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} input 
 */
function handleInputError(input) {
    if (input.nextElementSibling !== null && input.nextElementSibling.tagName === "LABEL" && input.nextElementSibling.classList.contains("error")) {
        input.nextElementSibling.remove();
    }

    if (input.validity.valid) return;

    const errorLabel = document.createElement("label");
    errorLabel.setAttribute("for", input.id);
    errorLabel.classList.add("error");
    errorLabel.textContent = input.validationMessage;

    input.insertAdjacentElement("afterend", errorLabel)
}