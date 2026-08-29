import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  return useContext(OrderContext);
};

const initialOrders = [
  {
    id: 'FA9604',
    type: 'Delivery',
    createdAt: new Date().toISOString(),
    customer: { name: 'Juan Pérez', phone: '+123456789', address: 'Av. Siempre Viva 742', lat: -34.6037, lng: -58.3816 },
    items: [{ id: 1, name: 'Doble Cheddar', quantity: 1, price: 5900 }],
    notes: 'Sin cebolla',
    total: 5900,
    paymentMethod: 'MercadoPago',
    status: 'new', // new, preparing, ready
  },
  {
    id: 'FA9605',
    type: 'Takeaway',
    createdAt: new Date(Date.now() - 600000).toISOString(), // 10 mins ago
    customer: { name: 'María Gómez', phone: '+987654321', address: 'Local', lat: 0, lng: 0 },
    items: [{ id: 2, name: 'Combo Veggie', quantity: 2, price: 4500 }],
    notes: '',
    total: 9000,
    paymentMethod: 'Efectivo',
    status: 'preparing',
  }
];

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
