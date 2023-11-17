/**
 * @param {import("../directive.model").Directive[]} directives 
 */
export function init(directives) {
    loopOnElementRecursivelly(document.body, (element) => handleElementSetup(element, directives))

    const observer = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            const { addedNodes, type, target, removedNodes } = mutation;

            if (type === "attributes" && isElement(target)) {
                handleElementUpdate(target);
            }

            if (type === "characterData") {
                if (target.parentElement === null) return;
                handleElementUpdate(target.parentElement)
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

    observer.observe(document.body, { attributes: true, childList: true, subtree: true, characterData: true })
}


/**
 * @param {Element} element 
 * @param {import("../directive.model").Directive[]} directives 
*/
function handleElementSetup(element, directives) {
    for (const { selector, setup } of directives) {
        if (!element.matches(selector)) continue;

        const callbacks = setup(element);
        if (callbacks === undefined) return;

        // @ts-ignore
        if (!element.$$update) element.$$update = [];
        // @ts-ignore
        if (callbacks.update) element.$$update.push(callbacks.update);
        // @ts-ignore
        if (!element.$$cleanup) element.$$cleanup = [];
        // @ts-ignore
        if (callbacks.cleanup) element.$$cleanup.push(callbacks.cleanup);
    }
}

/**
 * @param {Element} element 
 */
function handleElementUpdate(element) {
    // @ts-ignore
    if (!element.$$update) return;
    // @ts-ignore
    for (const updateCallback of element.$$update) {
        updateCallback(element);
    }
}

/**
 * @param {Element} element 
 */
function handleElementCleanup(element) {
    // @ts-ignore
    if (!element.$$cleanup) return;
    // @ts-ignore
    for (const cleanupCallback of element.$$cleanup) {
        cleanupCallback(element);
    }
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