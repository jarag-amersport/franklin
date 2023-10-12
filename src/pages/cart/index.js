import React from 'react';
import { render } from 'react-dom';

import Cart from './cart';
import store from '../../store';
import Adapter from '../../components/Adapter/adapter.js';
import { getGQLEndpoint } from '../../franklin-configs';

import '../../index.css';

const origin = globalThis.location.origin;
const styles = new Set();
const configureLinks = links => [...links.values()];

// Handles mock cart to speed up slow endpoint on QA
const startMock = async () => {
    const { setupApiMock } = await import("../../dev-mocks.js");
    return setupApiMock(
        "https://www.marbec.click/graphql-maidenform-qa",
        async (req, res, ctx) => {
            if (req.url.search.includes("GetCartDetails")) {
                const mockCart = await fetch(
                    "/blocks/commerce-cart/mock-cart.json"
                ).then(res => res.json());

                ctx.status(200);
                return res(ctx.body(JSON.stringify(mockCart)));
            } else if (req.url.search.includes("getProductListing")) {
                const mockListing = await fetch(
                    "/blocks/commerce-cart/mock-product-listing.json"
                ).then(res => res.json());

                ctx.status(200);
                return res(ctx.body(JSON.stringify(mockListing)));
            }
        }
    );
};

Promise.all([getGQLEndpoint(), startMock()]).then(
    ([config]) => {
        render((
            <Adapter
                apiUrl={config}
                configureLinks={configureLinks}
                origin={origin}
                store={store}
                styles={styles}>
                <Cart />
            </Adapter>
        ), document.querySelector('.block.commerce-cart'));
    },
    (reason) => {
        console.log(reason);
    }
)

export { Cart as default };
