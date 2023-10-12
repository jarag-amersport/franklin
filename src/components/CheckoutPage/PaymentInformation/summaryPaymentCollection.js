/**
 * This file is a hardcoded replacement for the TargetableESModuleCollection
 * in @magento/venia-ui.
 *
 * We had to hardcode the extensible payment methods because Venia as set up
 * today doesn't make it possible to remove the built-in Braintree methods
 * while also utilizing other payment methods added via the payment targets.
 */
import adyen_cc from "./adyen/components/adyenCreditcardSummary.js";
import adyen_hpp from "./adyen/components/adyenPaypalSummary.js";

export default { adyen_cc, adyen_hpp };

