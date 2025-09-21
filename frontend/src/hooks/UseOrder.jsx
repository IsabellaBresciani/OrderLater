import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';


// 2. Define the initial state for the order
const initialOrderState = {
  user_id: null,
  commerce_id: null,
  products: [],
};


const mockOrder = {
  user_id: "68cf35355d0307a943206502",
  commerce_id: "68cf3f02a82f68b4e636457e",
  products: [
    {
      _id: "68cf5855dd378731e5b7dd77",
      sku: "PAN001",
      name: "Pan Francés",
      description: "Clásico pan francés crocante por fuera y suave por dentro",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bBe43jKiqH2qGB…",
      price: 250,
      quantity: 2,
      clarification: "",
      discount: 40,
      advance_in_days: 2,
      measure: "unit",
      shop: "68cf3f02a82f68b4e636457e"
    },
    {
      _id: "68cf597ea88c72c0acceefeb",
      sku: "FACT001",
      name: "Factura de Dulce de Leche",
      description: "Deliciosa factura rellena de dulce de leche artesanal",
      image_url: "https://cdn0.recetasgratis.net/es/posts/2/2/9/facturas_de_dulce_de_lec…",
      price: 150,
      quantity: 3,
      clarification: "",
      discount: 0,
      advance_in_days: 0,
      measure: "unit",
      shop: "68cf3f02a82f68b4e636457e"
    },
    {
      _id: "68cf598ba88c72c0acceefee",
      sku: "MED001",
      name: "Medialuna",
      description: "Medialuna de manteca fresca, ideal para acompañar con café",
      image_url: "https://resizer.glanacion.com/resizer/v2/medialunas-faciles-de-M2NJ4M5…",
      price: 120,
      quantity: 5,
      clarification: "",
      discount: 0,
      advance_in_days: 0,
      measure: "unit",
      shop: "68cf3f02a82f68b4e636457e"
    }
  ]
};



/**
 * Provider component that manages the global order state.
 */
export const OrderProvider = ({ children }) => {
  // 3. Initialize state from localStorage or use the initial empty state
  const [order, setOrder] = useState(() => {
    try {
      localStorage.setItem('currentOrder', JSON.stringify(mockOrder));
      const savedOrder = localStorage.getItem('currentOrder');
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        if (parsedOrder && parsedOrder.products) {
          return parsedOrder;
        }
      }
    } catch (error) {
      console.error("Failed to parse order from localStorage:", error);
      localStorage.removeItem('currentOrder'); // Clear corrupted data
    }
    return initialOrderState;
  });

  // 4. Persist order state to localStorage whenever it changes
  useEffect(() => {
    if (order && order.products.length > 0) {
      localStorage.setItem('currentOrder', JSON.stringify(order));
    } else {
      // If the order becomes empty, remove it from storage
      localStorage.removeItem('currentOrder');
    }
  }, [order]);

  /**
   * Adds a product to the order.
   * @param {object} product - The full product object.
   * @param {number} [quantity=1] - The quantity to add.
   * @param {string} [clarification=''] - Notes for the product.
   */
  const addProduct = (product, quantity = 1, clarification = '') => {
    // Prevent ordering from multiple shops
    if (order.products.length > 0 && order.commerce_id !== product.shop) {
      toast.error("You can only order from one shop at a time. Please clear your current order first.");
      return;
    }

    setOrder(currentOrder => {
      const existingProductIndex = currentOrder.products.findIndex(p => p._id === product._id);
      let updatedProducts;

      if (existingProductIndex > -1) {
        // Product exists, update its quantity
        updatedProducts = currentOrder.products.map((p, index) =>
          index === existingProductIndex
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      } else {
        // New product, add it to the array
        const newProductInOrder = {
          ...product,
          id: product._id, // Add 'id' for convenience, matching previous logic
          quantity,
          clarification,
        };
        updatedProducts = [...currentOrder.products, newProductInOrder];
      }

      return {
        ...currentOrder,
        products: updatedProducts,
        user_id: currentOrder.user_id || localStorage.getItem('userId'),
        commerce_id: currentOrder.commerce_id || product.shop,
      };
    });
    toast.success(`${product.name} added to order!`);
  };

  /**
   * Removes a product from the order by its ID.
   * @param {string} productId - The _id of the product to remove.
   */
  const removeProduct = (productId) => {
    setOrder(currentOrder => {
      const updatedProducts = currentOrder.products.filter(p => p._id !== productId);

      // If last product is removed, reset the whole order
      if (updatedProducts.length === 0) {
        return initialOrderState;
      }

      return { ...currentOrder, products: updatedProducts };
    });
    toast.info("Item removed from order.");
  };

  /**
   * Updates the quantity of a specific product.
   * @param {string} productId - The _id of the product to update.
   * @param {number} newQuantity - The new quantity.
   */
  const updateProductQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeProduct(productId);
      return;
    }

    setOrder(currentOrder => ({
      ...currentOrder,
      products: currentOrder.products.map(p =>
        p._id === productId ? { ...p, quantity: newQuantity } : p
      ),
    }));
  };

  /**
   * Clears the entire order.
   */
  const clearOrder = () => {
    setOrder(initialOrderState);
  };

  // 5. Define the context value
  const value = {
    order,
    addProduct,
    removeProduct,
    clearOrder,
    updateProductQuantity,
  };

  // 6. Return the Provider component
  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

/**
 * 7. Custom hook to access the order context.
 * @returns {{
 *   order: object,
 *   addProduct: Function,
 *   removeProduct: Function,
 *   clearOrder: Function,
 *   updateProductQuantity: Function
 * }}
 */
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};