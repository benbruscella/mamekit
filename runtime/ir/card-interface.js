/** The card's methods with each one the interface holds identically replaced by its index. */
export function shareCardInterface(methods, cardInterface) {
    const index = new Map(cardInterface.methods.map((method, at) => [JSON.stringify(method), at]));
    let shared = 0;
    return {
        methods: methods.map(method => {
            const at = index.get(JSON.stringify(method));
            if (at === undefined)
                return method;
            shared++;
            return { shared: at };
        }),
        shared,
    };
}
/** The card's methods as compiled, from its own and the interface's. */
export function inheritCardInterface(methods, cardInterface) {
    return methods.map(method => {
        if (method && typeof method === 'object' && 'shared' in method && Object.keys(method).length === 1) {
            const shared = cardInterface.methods[method.shared];
            if (!shared)
                throw new Error(`card refers to ${cardInterface.className} method ${method.shared}, which the slot does not carry`);
            return shared;
        }
        return method;
    });
}
