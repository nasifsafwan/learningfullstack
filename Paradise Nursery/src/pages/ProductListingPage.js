import React from "react";
import ProductCard from "../components/ProductCard";

const ProductListingPage = ({addToCart}) => {
    const plants = [
        { id: 1, name: "Fiddle Leaf", price: 29.99, image: "/images/caleb-george-5sF6NrB1MEg-unsplash.jpg" },
        { id: 2, name: "Snake Plant", price: 19.99, image: "/images/nagy-arnold-X_IvVDuHvDQ-unsplash.jpg" },
        { id: 3, name: "Monstera", price: 24.99, image: "/images/toa-heftiba-W1yjvf5idqA-unsplash.jpg" },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Our Plants</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1.5rem'
                }}
            >
                {plants.map(plant => (
                    <ProductCard key={plant.id} plant={plant} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default ProductListingPage;
