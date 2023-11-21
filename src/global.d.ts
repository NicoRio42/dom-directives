import { CleanupCallback, UpdateCallback } from "./models/directive.model.js";

declare global {
  interface Element {
    $$update?: Map<string, UpdateCallback>;
    $$cleanup?: CleanupCallback[];
  }
}

export {};
