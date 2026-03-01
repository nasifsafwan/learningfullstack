import React, { useState } from "react";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import ProductListingPage from "./pages/ProductListingPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [cart, setCart] = useState([]);

  const handleAddToCart = (plant) => {
    const item = { ...plant, quantity: 1 };
    setCart([...cart, item]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage goToProducts={() => setCurrentPage("products")} />;
      case "products":
        return <ProductListingPage addToCart={handleAddToCart} />;
      case "cart":
        return <ShoppingCartPage cart={cart} setCart={setCart} goToProducts={() => setCurrentPage("products")} />;
      default:
        return <LandingPage goToProducts={() => setCurrentPage("products")} />;
    }
  };

  return (
    <div>
      <Header
        goToProducts={() => setCurrentPage("products")}
        goToCart={() => setCurrentPage("cart")}
        cartCount={cart.length}
      />
      {renderPage()}
    </div>
  );
}

export default App;