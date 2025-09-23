import React, { createContext, useState } from 'react';

// 1. Create the context with a default value of null
export const ShopContext = createContext(null);

// 2. Create the provider component
const ShopContextProvider = ({ children }) => {
  // State to hold the shop ID
  const [shopId, setShopId] = useState(null);

  // The value object that will be passed to consuming components
  const contextValue = {
    shopId,
    setShopId,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

// 3. Export the provider
export default ShopContextProvider;