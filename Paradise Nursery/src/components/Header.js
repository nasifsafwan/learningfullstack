import React from 'react';

const Header = ({
    goToProducts, goToCart, cartCount
}) => {
    return (
        <header>
            <h1>Paradise Nursery</h1>
            <nav>
                <button onClick={goToProducts}>Products</button>
                <button onClick={goToCart}>Cart ({cartCount})</button>
            </nav>
        </header>
        );
};

export default Header;