import React from 'react';
import { render } from 'react-dom';
import Account from './Account';
import { getGQLEndpoint } from '../../franklin-configs';
import { setupApiMock } from "../../dev-mocks";

console.log('Account Loaded');

const pageTypeScript = document.querySelector('script[id="account-page-type"]');
const pageTypeObject = JSON.parse(pageTypeScript.innerHTML) || ({"pageType": "myaccount"});
const pageType = pageTypeObject.pageType;

const startMock = async () => {
    return setupApiMock(
        "https://www.marbec.click/graphql-maidenform-qa",
        async (req, res, ctx) => {
            console.log(req.url);

            if (!req.url.search.includes("getCustomerWishlist")) {
                return;
            }

            const mockWishlists = await (await fetch(
                "/blocks/commerce-account/mock-wishlists.json"
            )).json();

            ctx.status(200);
            return res(ctx.body(JSON.stringify(mockWishlists)));
        }
    );
};

Promise.all([getGQLEndpoint(), startMock()]).then(
    ([config]) => {
        render(<Account apiUrl={config} pageType={pageType} />, document.querySelector('.block.commerce-account'));
    },
    (reason) => {
        console.log(reason);
    });
