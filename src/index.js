/**
 * @param {import("./models/directive.model").Directive[]} directives 
 */
export function init(directives) {
    loopOnElementRecursivelly(document.body, (element) => handleElementSetup(element, directives))

    const observer = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            const { addedNodes, type, target, removedNodes, attributeName } = mutation;

            if (type === "attributes" && isElement(target) && attributeName !== null) {
                handleElementUpdate(target, attributeName);
            }

            if (type === "childList") {
                for (const node of addedNodes) {
                    if (isElement(node)) handleElementSetup(node, directives)
                }

                for (const node of removedNodes) {
                    if (isElement(node)) handleElementCleanup(node)
                }
            }

        }
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true })
}

/**
 * @param {Element} element 
 * @param {import("./models/directive.model").Directive[]} directives 
*/
function handleElementSetup(element, directives) {
    for (const { attributeName, setup } of directives) {
        const attributeValue = element.getAttribute(attributeName);
        if (attributeValue === null) continue;

        const callbacks = setup(element, attributeValue);
        if (callbacks === undefined) return;

        if (!element.$$update) { element.$$update = new Map() };
        if (callbacks.update) element.$$update.set(attributeName, callbacks.update);
        if (!element.$$cleanup) element.$$cleanup = [];
        if (callbacks.cleanup) element.$$cleanup.push(callbacks.cleanup);
    }
}

/**
 * @param {Element} element 
 * @param {string} attributeName 
 */
function handleElementUpdate(element, attributeName) {
    const updateCallback = element.$$update?.get(attributeName);
    if (updateCallback === undefined) return;
    updateCallback(element);
}

/**
 * @param {Element} element 
 */
function handleElementCleanup(element) {
    if (!element.$$cleanup) return;

    for (const cleanupCallback of element.$$cleanup) {
        cleanupCallback(element);
    }

    delete element.$$update;
    delete element.$$cleanup;
}

/**
 * @param {Element} element 
 * @param {(element: Element) => void} callback 
 */
function loopOnElementRecursivelly(element, callback) {
    callback(element);

    Array.from(element.children).forEach(child => {
        loopOnElementRecursivelly(child, callback);
    });
}

/**
 * @param {Node} node
 * @returns {node is Element} 
 */
function isElement(node) {
    return node.nodeType === 1;
}