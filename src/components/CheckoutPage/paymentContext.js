/** See for more information:
 * - https://kentcdodds.com/blog/how-to-optimize-your-context-value
 * - https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * */
import * as React from 'react';

const reduceCheckoutState = (
    state,
    action
) => {
    const { type, ...newState } = action;

    if (action.type === 'unsetMethod') {
        return {};
    }

    if (type === 'setMethod') {
        if (JSON.stringify(state) === JSON.stringify(newState)) {
            return state;
        }
        return {
            ...state,
            ...newState
        };
    }
    return state;
};

const CheckoutStateContext = React.createContext(undefined);
const CheckoutDispatchContext = React.createContext(undefined);

export const useCheckoutState = () => {
    const context = React.useContext(CheckoutStateContext);
    // TODO: ask lars about this
    if (context === undefined) {
        throw new Error('');
    }
    return context;
};

export const useCheckoutDispatch = () => {
    const context = React.useContext(CheckoutDispatchContext);
    // TODO: ask lars about this
    if (context === undefined) {
        throw new Error('');
    }
    return context;
};

export const CheckoutProvider = ({
    children
}) => {
    const [state, dispatch] = React.useReducer(reduceCheckoutState, {});
    return (
        <CheckoutDispatchContext.Provider value={dispatch}>
            <CheckoutStateContext.Provider value={state}>
                {children}
            </CheckoutStateContext.Provider>
        </CheckoutDispatchContext.Provider>
    );
};
