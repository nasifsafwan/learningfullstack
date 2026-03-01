import React from "react";

const ProductCard = ({plant, addToCart}) => {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <img
                src={plant.image}
                alt={plant.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '0.5rem', borderRadius: '4px' }}
            />
            <h3 style={{ margin: '0.5rem 0' }}>{plant.name}</h3>
            <p style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>${plant.price}</p>
            <button
                onClick={() => addToCart(plant)}
                style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    border: 'none'
                }}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;