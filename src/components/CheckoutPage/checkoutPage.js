import React, { Fragment, useEffect, useRef, useState } from 'react';
import { shape, string } from "prop-types";
import { FormattedMessage, useIntl } from "react-intl";
import { AlertCircle as AlertCircleIcon } from "react-feather";
import { Link } from "react-router-dom";

import { useWindowSize, useToasts } from "@magento/peregrine";
import {
    CHECKOUT_STEP,
    useCheckoutPage
} from "./useCheckoutPage";

import { useStyle } from "@magento/venia-ui/lib/classify";
import Button from "../Button/button.js";
import { StoreTitle } from "@magento/venia-ui/lib/components/Head";
import Icon from "@magento/venia-ui/lib/components/Icon";
import fullPageLoadingIndicator from '../LoadingIndicator/static';
import StockStatusMessage from "@magento/venia-ui/lib/components/StockStatusMessage";
import FormError from "@magento/venia-ui/lib/components/FormError";
import AddressBook from "./AddressBook";
import GuestSignIn from "./GuestSignIn";
import OrderSummary from "./OrderSummary";
import PaymentInformation from "./PaymentInformation";
import payments from "./PaymentInformation/paymentMethodCollection";
import ShippingMethod from "./ShippingMethod";
import ShippingInformation from "./ShippingInformation";
import OrderConfirmationPage from "../../pages/checkout/confirmation/orderConfirmationPage";
import ItemsReview from "./ItemsReview";
import GoogleReCaptcha from "@magento/venia-ui/lib/components/GoogleReCaptcha";
import HandleAction from "./PaymentInformation/adyen/components/handleAction";

import defaultClasses from "./checkoutPage.module.css";
import ScrollAnchor from "@magento/venia-ui/lib/components/ScrollAnchor/scrollAnchor";
import wrapUseCheckout from "./useCheckout";
import useAdyenPaypalButton from './PaymentInformation/adyen/components/useAdyenPaypalButton';

const errorIcon = <Icon src={AlertCircleIcon} size={20} />;

const CheckoutPage = props => {
    const { classes: propClasses } = props;
    const { formatMessage } = useIntl();
    const talonProps = wrapUseCheckout(useCheckoutPage)();
    const { paypalButtonRef } = useAdyenPaypalButton({
        handlePlaceOrder: talonProps.handlePlaceOrder,
        handlePaypalAdditionalData: talonProps.handlePaypalAdditionalData,
        orderNumber: talonProps.orderNumber
    });

    const {
        /**
         * Enum, one of:
         * SHIPPING_ADDRESS, SHIPPING_METHOD, PAYMENT, REVIEW
         */
        activeContent,
        adyenCheckoutAction,
        availablePaymentMethods,
        cartItems,
        checkoutStep,
        customer,
        error,
        guestSignInUsername,
        handlePlaceOrder,
        handlePlaceOrderEnterKeyPress,
        hasError,
        isCartEmpty,
        isGuestCheckout,
        isLoading,
        isUpdating,
        orderDetailsData,
        orderDetailsLoading,
        orderNumber,
        placeOrderLoading,
        placeOrderButtonClicked,
        setCheckoutStep,
        setGuestSignInUsername,
        setIsUpdating,
        setShippingInformationDone,
        scrollShippingInformationIntoView,
        setShippingMethodDone,
        scrollShippingMethodIntoView,
        setPaymentInformationDone,
        shippingInformationRef,
        shippingMethodRef,
        resetReviewOrderButtonClicked,
        handleReviewOrder,
        handleReviewOrderEnterKeyPress,
        reviewOrderButtonClicked,
        recaptchaWidgetProps,
        toggleAddressBookContent,
        toggleSignInContent,
        paymentMethod
    } = talonProps;

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (hasError) {
            const message =
                error && error.message
                    ? error.message
                    : formatMessage({
                          id: "checkoutPage.errorSubmit",
                          defaultMessage:
                              "Oops! An error occurred while submitting. Please try again."
                      });
            addToast({
                type: "error",
                icon: errorIcon,
                message,
                dismissable: true,
                timeout: 7000
            });

            if (process.env.NODE_ENV !== "production") {
                console.error(error);
            }
        }
    }, [addToast, error, formatMessage, hasError]);

    const classes = useStyle(defaultClasses, propClasses);

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 960;

    let checkoutContent;

    const heading = isGuestCheckout
        ? formatMessage({
              id: "checkoutPage.guestCheckout",
              defaultMessage: "Guest Checkout"
          })
        : formatMessage({
              id: "checkoutPage.checkout",
              defaultMessage: "Checkout"
          });

    if (orderNumber && orderDetailsData && adyenCheckoutAction && adyenCheckoutAction !== 'paypal') {
        return (
            <HandleAction
                orderDetailsData={orderDetailsData}
                orderNumber={orderNumber}
                adyenPaymentStatus={talonProps.adyenCheckoutAction}
                clearCart={talonProps.clearCart}
            />
        );
    } else if (orderNumber && orderDetailsData && !adyenCheckoutAction) {
        return (
            <OrderConfirmationPage
                data={orderDetailsData}
                orderNumber={orderNumber}
            />
        );
    } else if (isLoading) {
        return fullPageLoadingIndicator;
    } else if (isCartEmpty) {
        checkoutContent = (
            <div className={classes.empty_cart_container}>
                <div className={classes.heading_container}>
                    <h1
                        aria-live="polite"
                        className={classes.heading}
                        data-cy="ChekoutPage-heading"
                    >
                        {heading}
                    </h1>
                </div>
                <h3>
                    <FormattedMessage
                        id={"checkoutPage.emptyMessage"}
                        defaultMessage={"There are no items in your cart."}
                    />
                </h3>
            </div>
        );
    } else {
        // MAIDENFORM: disable sign in container. minification should remove this
        const signInContainerVisible = false;
        // const signInContainerVisible =
        //     isGuestCheckout && checkoutStep !== CHECKOUT_STEP.REVIEW;
        const signInContainerElement = signInContainerVisible ? (
            <div className={classes.signInContainer}>
                <span className={classes.signInLabel}>
                    <FormattedMessage
                        id={"checkoutPage.signInLabel"}
                        defaultMessage={"Sign in for Express Checkout"}
                    />
                </span>
                <Button
                    className={classes.signInButton}
                    data-cy="CheckoutPage-signInButton"
                    onClick={toggleSignInContent}
                    priority="normal"
                >
                    <FormattedMessage
                        id={"checkoutPage.signInButton"}
                        defaultMessage={"Sign In"}
                    />
                </Button>
            </div>
        ) : null;

        const shippingMethodSection =
            checkoutStep >= CHECKOUT_STEP.SHIPPING_METHOD ? (
                <ShippingMethod
                    pageIsUpdating={isUpdating}
                    onSave={setShippingMethodDone}
                    onSuccess={scrollShippingMethodIntoView}
                    setPageIsUpdating={setIsUpdating}
                />
            ) : (
                <h3 className={classes.shipping_method_heading}>
                    <FormattedMessage
                        id={"checkoutPage.shippingMethodStep"}
                        defaultMessage={"2. Shipping Method"}
                    />
                </h3>
            );

        const formErrors = [];
        const paymentMethods = Object.keys(payments);

        // If we have an implementation, or if this is a "zero" checkout,
        // we can allow checkout to proceed.
        const isPaymentAvailable = !!availablePaymentMethods.find(
            ({ code }) => code === "free" || paymentMethods.includes(code)
        );

        if (!isPaymentAvailable) {
            formErrors.push(
                new Error(
                    formatMessage({
                        id: "checkoutPage.noPaymentAvailable",
                        defaultMessage: "Payment is currently unavailable."
                    })
                )
            );
        }

        const shippingInformationSection =
          checkoutStep >= CHECKOUT_STEP.SHIPPING_ADDRESS ? (
            <ShippingInformation
                shippingMethodElem={shippingMethodSection}
                // First step is always "Shipping Information"
                stepState={checkoutStep <= CHECKOUT_STEP.SHIPPING_METHOD}
                onSave={setShippingInformationDone}
                onSuccess={scrollShippingInformationIntoView}
                toggleActiveContent={toggleAddressBookContent}
                toggleSignInContent={toggleSignInContent}
                setGuestSignInUsername={setGuestSignInUsername}
              />
          ) : (
            <h3 className={classes.shipping_information_heading}>
              <FormattedMessage
                id={"checkoutPage.shippingInformationStep"}
                defaultMessage={"1. Shipping Information"}
              />
            </h3>
          );

        const paymentInformationSection =
            checkoutStep >= CHECKOUT_STEP.PAYMENT ? (
                <PaymentInformation
                    stepState={checkoutStep===CHECKOUT_STEP.PAYMENT}
                    onSave={setPaymentInformationDone}
                    checkoutError={error}
                    resetShouldSubmit={resetReviewOrderButtonClicked}
                    setCheckoutStep={setCheckoutStep}
                    checkoutStep={checkoutStep}
                    shouldSubmit={reviewOrderButtonClicked}
                />
            ) : (
                <h3 className={classes.editTitleDisabled}>
                    STEP 2: Payment Information
                </h3>
            );

        const reviewOrderButton =
          (checkoutStep === CHECKOUT_STEP.PAYMENT) ? (
                <Button
                    onClick={handleReviewOrder}
                    onKeyDown={handleReviewOrderEnterKeyPress}
                    priority="high"
                    className={classes.review_order_button}
                    data-cy="CheckoutPage-reviewOrderButton"
                    disabled={
                        reviewOrderButtonClicked ||
                        isUpdating ||
                        !isPaymentAvailable
                    }
                >
                    <FormattedMessage
                        id={"checkoutPage.reviewOrder"}
                        defaultMessage={"Review Order"}
                    />
                </Button>
            ) : null;

        const itemsReview =
            checkoutStep === CHECKOUT_STEP.REVIEW ? (
                <div className={classes.items_review_container}>
                    <ItemsReview />
                </div>
            ) : null;

        const paypalButton = <div ref={paypalButtonRef}></div>

        const placeOrderButton = (
        <Button
            onClick={handlePlaceOrder}
            onKeyDown={handlePlaceOrderEnterKeyPress}
            priority="high"
            className={classes.place_order_button}
            data-cy="CheckoutPage-placeOrderButton"
            disabled={
                isUpdating ||
                placeOrderLoading ||
                orderDetailsLoading ||
                placeOrderButtonClicked
            }
        >
            <FormattedMessage
                id={"checkoutPage.placeOrder"}
                defaultMessage={"Place Order"}
            />
        </Button>
        );
        const placeOrderSection = checkoutStep === CHECKOUT_STEP.REVIEW ? (
              <div className={classes.placeOrderSection}>
                {paymentMethod && paymentMethod.method === 'paypal' ? paypalButton : placeOrderButton}
                <span>
                  <FormattedMessage
                    id={"checkoutPage.reviewOrderConditionsText"}
                    defaultMessage={`By clicking the ${paymentMethod && paymentMethod.method === 'paypal' ? 'PayPal' : 'Place Order'} Button, you confirm`+
                      "that you have read and understood, and accept our"}
                  /> <a href={"https://www.maidenform.com/terms-of-use"}><FormattedMessage
                    id={"checkoutPage.tocLinkText"}
                    defaultMessage={"Terms and Conditions"}
                  /></a>, <a href={"https://www.maidenform.com/returns"}><FormattedMessage
                    id={"checkoutPage.rmaLinkText"}
                    defaultMessage={"Return Policy"}
                  /></a> <FormattedMessage
                  id={"checkoutPage.andText"}
                  defaultMessage={"and"}
                /> <a href={"https://www.maidenform.com/privacy-policy"}><FormattedMessage
                    id={"checkoutPage.privacyLinkText"}
                    defaultMessage={"Privacy Policy"}
                  /></a>
                </span>
              </div>
            ) : null;

        // If we're on mobile we should only render price summary in/after review.
        const shouldRenderPriceSummary = !(
            isMobile && checkoutStep < CHECKOUT_STEP.REVIEW
        );

        const sideModulesColumnSection = shouldRenderPriceSummary ? (
            <div
                className={
                    classes.summaryContainer +
                    (signInContainerVisible
                        ? " " + classes.signInContainerVisible
                        : "") +
                    (recaptchaWidgetProps.shouldRender
                        ? " " + classes.reCaptchaMargin
                        : "")
                }
            >
              <OrderSummary isUpdating={isUpdating} cartItems={cartItems} />
            </div>
        ) : (
          <div
            className={
              classes.summaryContainer +
              (signInContainerVisible
                ? " " + classes.signInContainerVisible
                : "") +
              (recaptchaWidgetProps.shouldRender
                ? " " + classes.reCaptchaMargin
                : "")
            }
          >
            {itemsReview}
          </div>
        );

        let headerText;

        if (isGuestCheckout) {
            headerText = formatMessage({
                id: "checkoutPage.guestCheckout",
                defaultMessage: "Checkout"
            });
        } else if (customer.default_shipping) {
            headerText = formatMessage({
                id: "checkoutPage.reviewAndPlaceOrder",
                defaultMessage: "Review and Place Order"
            });
        } else {
            headerText = formatMessage(
                {
                    id: "checkoutPage.greeting",
                    defaultMessage: "Welcome {firstname}!"
                },
                { firstname: customer.firstname }
            );
        }

        const checkoutContentClass =
            activeContent === "checkout"
                ? classes.checkoutContent
                : classes.checkoutContent_hidden;

        const stockStatusMessageElement = (
            <Fragment>
                <FormattedMessage
                    id={"checkoutPage.stockStatusMessage"}
                    defaultMessage={
                        "An item in your cart is currently out-of-stock and must be removed in order to Checkout. Please return to your cart to remove the item."
                    }
                />
                <Link className={classes.cartLink} to={"/cart"}>
                    <FormattedMessage
                        id={"checkoutPage.returnToCart"}
                        defaultMessage={"Return to Cart"}
                    />
                </Link>
            </Fragment>
        );
        checkoutContent = (
            <div className={checkoutContentClass}>
                <div className={classes.heading_container}>
                    <FormError
                        classes={{
                            root: classes.formErrors
                        }}
                        errors={formErrors}
                        allowErrorMessages={true}
                    />
                    <StockStatusMessage
                        cartItems={cartItems}
                        message={stockStatusMessageElement}
                    />
                    {headerText && (
                        <h1
                            className={classes.heading}
                            data-cy="ChekoutPage-headerText"
                        >
                            {headerText}
                        </h1>
                    )}
                </div>
                {signInContainerElement}
                <div className={classes.shipping_information_container}>
                  <ScrollAnchor ref={shippingInformationRef}>
                      {shippingInformationSection}
                  </ScrollAnchor>
                </div>
                <div className={classes.payment_information_container}>
                    {paymentInformationSection}
                </div>
                {reviewOrderButton}
                {placeOrderSection}
                {sideModulesColumnSection}
                <GoogleReCaptcha {...recaptchaWidgetProps} />
            </div>
        );
    }

    const addressBookElement = !isGuestCheckout ? (
        <AddressBook
            activeContent={activeContent}
            toggleActiveContent={toggleAddressBookContent}
            onSuccess={scrollShippingInformationIntoView}
        />
    ) : null;

    const signInElement = isGuestCheckout ? (
        <GuestSignIn
            key={guestSignInUsername}
            isActive={activeContent === "signIn"}
            toggleActiveContent={toggleSignInContent}
            initialValues={{ email: guestSignInUsername }}
        />
    ) : null;

    return (
        <div className={classes.root} data-cy="CheckoutPage-root">
            <StoreTitle>
                {formatMessage({
                    id: "checkoutPage.titleCheckout",
                    defaultMessage: "Checkout"
                })}
            </StoreTitle>
            {checkoutContent}
            {addressBookElement}
            {signInElement}
        </div>
    );
};

export default CheckoutPage;

CheckoutPage.propTypes = {
    classes: shape({
        root: string,
        checkoutContent: string,
        checkoutContent_hidden: string,
        heading_container: string,
        heading: string,
        cartLink: string,
        stepper_heading: string,
        paypalButton: string,
        paypalButtonHidden: string,
        shipping_method_heading: string,
        payment_information_heading: string,
        signInContainer: string,
        signInLabel: string,
        signInButton: string,
        empty_cart_container: string,
        shipping_information_container: string,
        shipping_method_container: string,
        shipping_information_heading: string,
        payment_information_container: string,
        price_adjustments_container: string,
        items_review_container: string,
        summaryContainer: string,
        steps_container: string,
        formErrors: string,
        review_order_button: string,
        place_order_button: string,
        signInContainerVisible: string,
        reCaptchaMargin: string
    })
};
