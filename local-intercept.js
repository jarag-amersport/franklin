/* eslint-disable */
const { Targetables } = require('@magento/pwa-buildpack');
/** @typedef {import('@magento/pwa-buildpack/lib/WebpackTools/targetables/TargetableModule')} TargetableModule */
/** @typedef {import('@magento/pwa-buildpack/lib/WebpackTools/targetables/TargetableESModule')} TargetableESModule */
/** @typedef {import('@magento/pwa-buildpack/lib/WebpackTools/targetables/TargetableReactComponent')} TargetableReactComponent */

function replaceTextIn(source, original, replacement) {
    source.insertBeforeSource(original, replacement, {
        remove: original.length
    });
}

function patchPortal(targetables) {
    /** @type TargetableESModule */
    const portal = targetables.esModule(
        '@magento/venia-ui/lib/components/Portal/portal'
    );
    replaceTextIn(
        portal,
        "document.getElementById('root')",
        "document.getElementById('pwa-dialog-root')"
    );
}
function patchUseSignIn(targetables) {
    /** @type TargetableESModule */
    const hook = targetables.esModule(
        '@magento/peregrine/lib/talons/SignInPage/useSignInPage'
    );
    replaceTextIn(
        hook,
        'fromRedirectUrl = historyState.from || null',
        "fromRedirectUrl = historyState.from || (new URL(window.location).searchParams.get('login_redirect')) || null"
    );
    function replaceHistoryPush(value) {
        replaceTextIn(
            hook,
            `history.push(${value}, historyState);`,
            `window.location = ${value};`
        );
    }
    replaceHistoryPush('createAccountPageUrl');
    replaceHistoryPush('forgotPasswordPageUrl');
}

function patchUseGuestForm(targetables) {
    const talon = targetables.esModule(
        '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/AddressForm/useGuestForm.js'
    );
    replaceTextIn(
        talon,
        'setShowSignInToast(!data.isEmailAvailable.is_email_available)',
        'setShowSignInToast(!(data.isEmailAvailable && data.isEmailAvailable.is_email_available))'
    );
}

function patchUseCart(_, targets) {
  const peregrine = targets.of('@magento/peregrine');
  peregrine.talons.tap(modules =>
    modules.CartPage.useCartPage.wrapWith(
      '/src/talons/CartPage/wrapUseCartPage.js'
    )
  );
}

function patchUseCreateAccount(targetables) {
    const talon = targetables.esModule(
        '@magento/peregrine/lib/talons/CreateAccount/useCreateAccount.js'
    );
    replaceTextIn(
        talon,
        'is_subscribed: !!formValues.subscribe',
        'dateofbirth: formValues.customer.dateofbirth'
    );
    replaceTextIn(
        talon,
        'isSubscribed: !!formValues.subscribe',
        'dateOfBirth: formValues.customer.dateofbirth'
    );
}

function patchUsePaymentMethods(targetables) {
    const talon = targetables.esModule(
        '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/usePaymentMethods.js'
    );
    replaceTextIn(
        talon,
        `
                        braintree: {
                            payment_method_nonce: value,
                            is_active_payment_token_enabler: false
                        }`,
        ''
    );
}

function patchProductListingFragments(targetables) {
    replaceTextIn(
        targetables.module(
            '@magento/peregrine/lib/talons/CartPage/ProductListing/productListingFragments.gql.js'
        ),
        `
            errors {
                code
                message
            }`,
        ''
    );

    replaceTextIn(
        targetables.module(
            '@magento/peregrine/lib/talons/CartPage/ProductListing/productListingFragments.gql.js'
        ),
        `
            prices {`,
        `
            prices {
                discounts {
                    amount {
                    value
                    currency
                }
                label
            }
    `
    );
}

function localIntercept(targets) {
    const targetables = Targetables.using(targets);
    patchPortal(targetables, targets);
    patchUseSignIn(targetables, targets);
    patchUseGuestForm(targetables, targets);
    patchUseCreateAccount(targetables, targets);
    patchProductListingFragments(targetables, targets);
    patchUseCart(targetables, targets);
    patchUsePaymentMethods(targetables, targets);
}

module.exports = localIntercept;
