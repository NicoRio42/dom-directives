export type Directive = {
  attributeName: string;
  setup: (
    element: Element,
    attributeValue: string
  ) => {
    update?: UpdateCallback;
    cleanup?: CleanupCallback;
  } | void;
};

export type UpdateCallback = (
  element: Element,
  newAttributeValue?: string
) => void;

export type CleanupCallback = (
  element: Element,
  newAttributeValue?: string
) => void;
