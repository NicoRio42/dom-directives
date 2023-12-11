import { isFormInputElement, setCustomValidity } from "./utils.js";

/** @type {import("../../models/directive.model.js").Directive} */
export const prettyClientValidationDirective = {
    attributeName: "prettyClientValidation",
    setup: (element) => {
        if (!(element instanceof HTMLFormElement)) {
            throw new Error("prettyClientValidation should be used on a form element.")
        }

        element.setAttribute("novalidate", "")

        /**
         * @param {Event} event 
         */
        const inputEventListener = (event) => {
            // @ts-expect-error
            handleInputError(event.target);
        }

        /**
         * @param {SubmitEvent} event 
         */
        const submitEventListener = (event) => {
            event.preventDefault();

            if (!element.dataset.submited) {
                element.addEventListener("input", inputEventListener)
            }

            element.dataset.submited = ""

            Array.from(element.querySelectorAll("input, select, textarea")).forEach(input => {
                if (!isFormInputElement(input)) return;
                handleInputError(input);
                if (!input.validity.valid) input.dataset.hadErrors = ""
            })
        }

        element.addEventListener("submit", submitEventListener)

        return {
            cleanup: () => {
                element.removeEventListener("submit", submitEventListener);
                if (element.dataset.submited) element.removeEventListener("input", inputEventListener);
            }
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

    console.log(input.validity)

    const errorLabel = document.createElement("label");
    errorLabel.setAttribute("for", input.id);
    errorLabel.classList.add("error");
    errorLabel.textContent = input.validationMessage;

    input.insertAdjacentElement("afterend", errorLabel)
}