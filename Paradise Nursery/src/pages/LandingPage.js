import React from 'react';

const LandingPage = ({ goToProducts }) => {
    return(
        <div
            style={{
                backgroundImage: 'url(/images/landing.jpg)',
                height: '100vh',
                backgroundSize: 'cover',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 1rem'
            }}
        >
            <h1 style={{ fontSize: '4rem', fontFamily: 'Georgia, serif', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Paradise Nursery
            </h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                Your favorite plants and gardening supplies!
            </p>
            <button
                onClick={goToProducts}
                style={{
                    fontSize: '1.25rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                Shop Now
            </button>
        </div>
    );
};

export default LandingPage;