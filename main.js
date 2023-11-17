
import { init } from "./src/index.js";
import { clickToCopyDirective } from "./src/directives/click-to-copy.js";
import { clickOutsideDirective } from "./src/directives/click-outside.js";
import {
    openDialogDirective,
    closeDialogDirective,
    closeDialogClickOutsideDirective,
} from "./src/directives/dialog.js";

init([
    {
        selector: "p",
        setup: (el) => {
            console.log(el.textContent);

            return {
                update: () => console.log("update"),
                cleanup: (element) => console.log("destroy"),
            };
        },
    },
    clickToCopyDirective,
    openDialogDirective,
    closeDialogDirective,
    closeDialogClickOutsideDirective,
    clickOutsideDirective,
]);