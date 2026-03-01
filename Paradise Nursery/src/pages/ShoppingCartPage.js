import React from "react";

const ShoppingCartPage = ({ cart, setCart, goToProducts }) => {
    const handleIncrease = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id ? {...item, quantity: item.quantity + 1} : item
        );
        setCart(updatedCart);
    };

    const handleDecrease = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id ? {...item, quantity: item.quantity - 1} : item
        );
        setCart(updatedCart);
    };

    const handleRemove = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
    };

    const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Your cart is empty.</p>
                    <button
                        onClick={goToProducts}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Continue shopping
                    </button>
                </div>
            ) : (
                <>
                    {cart.map(item => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1px solid #ddd',
                                padding: '0.75rem 1rem',
                                borderRadius: '6px',
                                marginBottom: '0.75rem'
                            }}
                        >
                            <span style={{ flex: '1' }}>{item.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button onClick={() => handleDecrease(item.id)} style={{ marginRight: '0.5rem' }}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrease(item.id)} style={{ marginLeft: '0.5rem' }}>+</button>
                            </div>
                            <span style={{ width: '80px', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</span>
                            <button onClick={() => handleRemove(item.id)} style={{ marginLeft: '1rem', color: '#c00', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                        </div>
                    ))}
                    <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                        <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
                        <button
                            style={{
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                backgroundColor: '#4caf50',
                                color: '#fff',
                                border: 'none'
                            }}
                        >
                            Proceed to Checkout
                        </button>
                        <div style={{ marginTop: '1rem' }}>
                            <button onClick={goToProducts} style={{ textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
                                Continue shopping
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShoppingCartPage;