/** @type {import("../../directive.model").Directive} */
export const openDialogDirective = {
    selector: "[openDialog]",
    setup: (element) => {
        const dialogId = element.getAttribute("openDialog");

        if (dialogId === null || dialogId === '') {
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

/** @type {import("../../directive.model").Directive} */
export const closeDialogDirective = {
    selector: "[closeDialog]",
    setup: (element) => {
        const dialogId = element.getAttribute("closeDialog");

        /** @type {HTMLDialogElement} */
        let dialog;

        if (dialogId === null || dialogId === '') {
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


/** @type {import("../../directive.model").Directive} */
export const closeDialogClickOutsideDirective = {
    selector: "[closeDialogClickOutside]",
    setup: (element) => {
        if (!(element instanceof HTMLDialogElement)) {
            throw new Error("The closeDialogClickOutside attribute can only be used on a dialog element.")
        }

        /**
         * @param {Event} event 
         */
        const eventListener = ({ target }) => {
            console.log(target)
            // @ts-ignore
            if (element.open || element.contains(target)) return;
            element.close();
        }

        window.addEventListener('click', eventListener);

        return { cleanup: () => window.removeEventListener('click', eventListener) }
    }
}
