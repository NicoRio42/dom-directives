export type Directive = {
  selector: string;
  setup: (element: Element) => {
    update?: (element: Element) => void;
    cleanup?: (element: Element) => void;
  } | void;
};
