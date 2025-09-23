// context/ShopContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// 1. Crear contexto
export const ShopContext = createContext(null);

// 2. Provider
const ShopContextProvider = ({ children }) => {
  const { shopId } = useParams(); 
  const [currentShopId, setCurrentShopId] = useState(null);

  useEffect(() => {
    if (shopId) {
      setCurrentShopId(shopId);
    }
  }, [shopId]);

  return (
    <ShopContext.Provider value={{ shopId: currentShopId, setShopId: setCurrentShopId }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
