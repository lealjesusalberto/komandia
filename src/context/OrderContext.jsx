import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  return useContext(OrderContext);
};

const initialOrders = [];

export const OrderProvider = ({ children }) => {
  // Initialize from localStorage or fallback to initialOrders
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('kds_orders');
    if (savedOrders) {
      try {
        return JSON.parse(savedOrders);
      } catch (e) {
        return initialOrders;
      }
    }
    return initialOrders;
  });

  // Sync state to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('kds_orders', JSON.stringify(orders));
  }, [orders]);

  // Listen for changes from other tabs
  React.useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'kds_orders' && e.newValue) {
        setOrders(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => 
      prev.map((order) => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const addOrder = (order) => {
    setOrders((prev) => [...prev, { ...order, status: 'new' }]);
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
