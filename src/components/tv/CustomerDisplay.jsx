import React, { useEffect, useState } from 'react';
import { useOrders } from '../../context/OrderContext';

const CustomerDisplay = () => {
  const { orders } = useOrders();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter orders for display (exclude Delivery since they are not physically waiting at the store)
  const displayOrders = orders.filter(order => order.type !== 'Delivery');
  
  // Group by status
  const preparingOrders = displayOrders.filter(o => o.status === 'new' || o.status === 'preparing');
  const readyOrders = displayOrders.filter(o => o.status === 'ready');

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white overflow-hidden flex flex-col font-sans relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#302b63] to-[#24243e] -z-20"></div>
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />

      {/* Header */}
      <header className="p-8 border-b border-white/10 glass flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.6)] flex items-center justify-center font-bold text-4xl">
            K
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Komandia</h1>
            <p className="text-xl text-primary font-medium mt-1">Estado de Pedidos</p>
          </div>
        </div>
        <div className="text-3xl font-light text-white/80 bg-black/20 px-6 py-3 rounded-2xl border border-white/5 backdrop-blur-md">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-2 p-8 gap-8">
        
        {/* Preparing Column */}
        <div className="glass rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
          <div className="bg-white/5 p-6 border-b border-white/10 text-center">
            <h2 className="text-4xl font-bold text-white/90">En Preparación</h2>
            <p className="text-text-muted mt-2 text-lg">Tu pedido está siendo cocinado con amor 🍳</p>
          </div>
          <div className="p-8 grid grid-cols-2 gap-6 overflow-y-auto content-start">
            {preparingOrders.length === 0 ? (
              <div className="col-span-2 text-center text-white/30 text-2xl py-12">No hay pedidos en preparación</div>
            ) : (
              preparingOrders.map(order => (
                <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center animate-fade-in transition-all">
                  <div className="text-5xl font-black text-white mb-2">#{order.id}</div>
                  <div className="text-xl text-text-muted">{order.customer.name}</div>
                  <div className="mt-3 inline-block bg-white/10 text-white/80 px-4 py-1 rounded-full text-sm font-medium">
                    {order.type}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Ready Column */}
        <div className="glass rounded-3xl border border-primary/30 overflow-hidden flex flex-col shadow-[0_0_50px_rgba(236,72,153,0.15)]">
          <div className="bg-gradient-to-r from-primary to-purple-600 p-6 text-center shadow-lg">
            <h2 className="text-4xl font-bold text-white">¡Listos para Retirar!</h2>
            <p className="text-white/80 mt-2 text-lg">Por favor, acércate a la barra 🎉</p>
          </div>
          <div className="p-8 grid grid-cols-2 gap-6 overflow-y-auto content-start">
            {readyOrders.length === 0 ? (
              <div className="col-span-2 text-center text-white/30 text-2xl py-12">Esperando pedidos listos...</div>
            ) : (
              readyOrders.map(order => (
                <div key={order.id} className="bg-primary/20 border-2 border-primary/50 rounded-2xl p-6 text-center animate-pulse-slow relative overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary to-transparent opacity-50"></div>
                  <div className="text-6xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">#{order.id}</div>
                  <div className="text-2xl text-white font-bold">{order.customer.name}</div>
                  <div className="mt-4 inline-block bg-primary text-white px-5 py-2 rounded-full text-md font-bold shadow-lg">
                    {order.type}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </main>

      {/* Ticker / Footer */}
      <footer className="bg-black/40 border-t border-white/10 p-4 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee text-white/60 text-xl font-medium tracking-wide">
          🍕 ¡Gracias por elegir Komandia! Por favor, mantente atento a esta pantalla para retirar tu pedido. 🍔
        </div>
      </footer>
    </div>
  );
};

export default CustomerDisplay;
