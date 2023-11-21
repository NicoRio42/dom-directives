import { init } from "../../src/index.js";
import { inputMatchDirective } from "../../src/directives/forms/confirm.js";
import { specialCharactersDirective } from "../../src/directives/forms/special-characters.js";
import { prettyClientValidationDirective } from "../../src/directives/forms/pretty-client-validation.js";

init([
    inputMatchDirective,
    specialCharactersDirective,
    prettyClientValidationDirective
])