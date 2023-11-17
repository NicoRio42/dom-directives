/** @type {import("../models/directive.model").Directive} */
export const clickToCopyDirective = {
    selector: "[clickToCopy]",
    setup: (element) => {
        const eventListener = () => {
            const { textContent } = element;
            if (textContent === null) return;
            navigator.clipboard.writeText(textContent.trim());
            alert("Content copied to clipboard!")
        }

        element.addEventListener('click', eventListener);

        return { cleanup: () => element.removeEventListener('click', eventListener) }
    }
}