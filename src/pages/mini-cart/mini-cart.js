import React, { useEffect } from 'react';
import { useProductListing } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProductListing';
import CartOverlay from '../../components/CartPage/CartOverlay/cartOverlay';

const MiniCart = props => {
    const { product } = props;

    const {
        activeEditItem,
        setActiveEditItem,
    } = useProductListing();

    useEffect(() => {
        setActiveEditItem(product);
    }, []);

    function setIsCartUpdating() {
        return false;
    }

    return (
        <CartOverlay
            item={activeEditItem}
            setIsCartUpdating={setIsCartUpdating}
            setActiveEditItem={setActiveEditItem}
            addToCart={props.addToCart}
        />
    );
};

export default MiniCart;
