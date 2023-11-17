/** @type {import("../models/directive.model").Directive} */
export const clickOutsideDirective = {
    selector: "[onClickOutside]",
    setup: (element) => {
        const callbackContent = element.getAttribute("onClickOutside");

        if (callbackContent === null || callbackContent === '') {
            throw new Error("No callback for clickOutside directive.")
        }

        const callback = new Function('event', callbackContent)

        /**
         * @param {Event} event 
         */
        const eventListener = (event) => {
            // @ts-ignore
            if (element.open || element.contains(event.target)) return;
            callback(event)
        }

        window.addEventListener('click', eventListener);

        return { cleanup: () => window.removeEventListener('click', eventListener) }
    }
}