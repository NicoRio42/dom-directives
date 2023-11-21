/** @type {import("../../models/directive.model").Directive} */
export const openDialogDirective = {
    attributeName: "openDialog",
    setup: (element, dialogId) => {
        if (dialogId === '') {
            throw new Error("The openDialog directive needs a dialog id parameter.")
        }

        const dialog = document.getElementById(dialogId);

        if (dialog === null || !(dialog instanceof HTMLDialogElement)) {
            throw new Error("The given dialog id doesn't match any dialog element.")
        }

        const eventListener = () => {
            dialog.showModal();
        }

        element.addEventListener('click', eventListener);

        return { cleanup: () => element.removeEventListener('click', eventListener) }
    }
}

/** @type {import("../../models/directive.model").Directive} */
export const closeDialogDirective = {
    attributeName: "closeDialog",
    setup: (element, dialogId) => {
        /** @type {HTMLDialogElement} */
        let dialog;

        if (dialogId === '') {
            const foundDialog = element.closest('dialog')

            if (foundDialog === null) {
                throw new Error("No dialog id parameter was provided and the element isn't inside a dialog.")
            }

            dialog = foundDialog
        } else {
            const foundDialog = document.getElementById(dialogId);

            if (foundDialog === null || !(foundDialog instanceof HTMLDialogElement)) {
                throw new Error("The given dialog id doesn't match any dialog element.")
            }

            dialog = foundDialog;
        }

        const eventListener = () => {
            dialog.close();
        }

        element.addEventListener('click', eventListener);

        return { cleanup: () => element.removeEventListener('click', eventListener) }
    }
}


/** @type {import("../../models/directive.model").Directive} */
export const closeDialogClickOutsideDirective = {
    attributeName: "closeDialogClickOutside",
    setup: (element) => {
        if (!(element instanceof HTMLDialogElement)) {
            throw new Error("The closeDialogClickOutside attribute can only be used on a dialog element.")
        }

        /**
         * @param {Event} event 
         */
        const eventListener = ({ target }) => {
            // @ts-ignore
            if (element.open || element.contains(target)) return;
            element.close();
        }

        window.addEventListener('click', eventListener);

        return { cleanup: () => window.removeEventListener('click', eventListener) }
    }
}
