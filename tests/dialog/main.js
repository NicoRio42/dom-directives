
import { init } from "../../src/index.js";
import {
    openDialogDirective,
    closeDialogDirective,
    closeDialogClickOutsideDirective,
} from "../../src/directives/dialog/dialog.js";

init([
    openDialogDirective,
    closeDialogDirective,
    closeDialogClickOutsideDirective,
]);