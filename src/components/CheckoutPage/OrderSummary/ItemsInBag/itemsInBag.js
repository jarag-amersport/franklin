import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ChevronDown, ChevronUp } from 'react-feather';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './itemsInBag.module.css';
import ItemsInBagEntry from './itemsInBagEntry';
import { useItemsInBag } from '../../../../talons/InBagItems/useItemsInBag';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

const ItemsInBag = props => {
    const { cartItems: itemsInCart } = props; 
    const [toggle, setToggle] = useState(true)

    const talonProps = useItemsInBag({ itemsInCart });

    const {
        loading: isLoading,
        configurableThumbnailSource,
        handleRemoveItem,
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    const render = (content) => {
        return (<>
            <div className={classes.title}>
                <FormattedMessage
                    id={'checkoutPage.itemSummary'}
                    defaultMessage={'Items in bag ({count})'}
                    values={{ count: itemsInCart?.length || 0}}
                />
                <button
                    onClick={() => setToggle(!toggle)}
                    className={classes.toggleButton}
                >
                    {toggle ? <ChevronUp size="30" strokeWidth="2.5" /> : <ChevronDown size="30" strokeWidth="2.5" />}
                </button>
            </div>
            {content}
        </>);
    }

    if (isLoading) {
        return render(<LoadingIndicator />);
    }

    if (itemsInCart?.length) {
        const productComponents = itemsInCart.map((product) => (
            <li key={product.uid}>
                <ItemsInBagEntry item={product} thumbnailSource={configurableThumbnailSource} handleRemoveItem={handleRemoveItem}/>
            </li>
        ));

        const loadedContent = toggle && (
            <ul className={classes.productContainer}>
                {productComponents}
            </ul>
        );

        return render(loadedContent);
    }

    return null;
};

export default ItemsInBag;
