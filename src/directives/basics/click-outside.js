/** @type {import("../../models/directive.model").Directive} */
export const clickOutsideDirective = {
    attributeName: "onClickOutside",
    setup: (element, callbackContent) => {
        if (callbackContent === '') {
            throw new Error("No callback for clickOutside directive.")
        }

        const callback = new Function('event', callbackContent)

        /**
         * @param {Event} event 
         */
        const eventListener = (event) => {
            // @ts-ignore
            if (element.contains(event.target)) return;
            callback(event)
        }

        window.addEventListener('click', eventListener);

        return { cleanup: () => window.removeEventListener('click', eventListener) }
    }
}