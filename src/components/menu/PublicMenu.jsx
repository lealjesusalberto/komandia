import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, X, Phone, MapPin, Store, Navigation, Utensils } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import CategoryFilter from './CategoryFilter';
import { useOrders } from '../../context/OrderContext';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const mockCategories = [
  { id: 'all', name: 'Todo el Menú' },
  { id: 'burgers', name: 'Hamburguesas' },
  { id: 'drinks', name: 'Bebidas' },
];

const mockProducts = [
  { id: 1, categoryId: 'burgers', name: 'Doble Cheddar', description: 'Doble carne, doble cheddar, bacon', price: 5900, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500' },
  { id: 2, categoryId: 'burgers', name: 'Combo Veggie', description: 'NotMeat, lechuga, tomate', price: 4500, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=500' },
  { id: 3, categoryId: 'drinks', name: 'Gaseosa 500ml', description: 'Coca-Cola regular', price: 1200, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500' },
];

// Component to handle map clicks
const LocationPickerMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
};

// Component to auto recenter map when location changes via geolocation
const MapRecenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], map.getZoom(), {
        animate: true
      });
    }
  }, [position, map]);
  return null;
};

const PublicMenu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState('Delivery'); // 'Delivery', 'Takeaway', 'Dine-in'
  
  const [customerInfo, setCustomerInfo] = useState({ 
    name: '', 
    phone: '', 
    address: '',
    tableNumber: ''
  });
  
  // Default coordinates (e.g. Buenos Aires center)
  const [mapPosition, setMapPosition] = useState({ lat: -34.6037, lng: -58.3816 });

  const { addOrder } = useOrders();

  const filteredProducts = activeCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(p => p.categoryId === activeCategory);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + change;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (!customerInfo.name) {
      alert("Por favor ingresa tu nombre");
      return;
    }

    if (orderType === 'Delivery') {
      if (!customerInfo.phone || !customerInfo.address) {
        alert("Para Delivery, por favor completa tu teléfono y dirección");
        return;
      }
    }
    
    if (orderType === 'Dine-in') {
      if (!customerInfo.tableNumber) {
        alert("Por favor ingresa tu número de mesa");
        return;
      }
    }

    const newOrderId = Math.floor(1000 + Math.random() * 9000).toString();
    
    let typeLabel = orderType;
    if (orderType === 'Takeaway') typeLabel = 'Retiro en Local';
    if (orderType === 'Dine-in') typeLabel = `Mesa ${customerInfo.tableNumber}`;

    const newOrder = {
      id: newOrderId,
      type: typeLabel,
      createdAt: new Date().toISOString(),
      customer: { 
        name: customerInfo.name, 
        phone: orderType === 'Delivery' ? customerInfo.phone : 'N/A', 
        address: orderType === 'Delivery' ? customerInfo.address : (orderType === 'Dine-in' ? `Mesa ${customerInfo.tableNumber}` : 'Retiro en el Local'), 
        lat: orderType === 'Delivery' ? mapPosition.lat : 0, 
        lng: orderType === 'Delivery' ? mapPosition.lng : 0 
      },
      items: cart,
      notes: '',
      total: cartTotal,
      paymentMethod: 'Efectivo/Transferencia',
      status: 'new'
    };
    
    addOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);
    
    alert(`¡Pedido #${newOrderId} enviado a cocina exitosamente!\n\nPronto nos contactaremos contigo por WhatsApp para confirmar tu pedido.`);
  };

  const handleGetLocation = () => {
    const fallbackLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.latitude && data.longitude) {
          setMapPosition({
            lat: data.latitude,
            lng: data.longitude
          });
        } else {
          throw new Error('No coordinates in IP response');
        }
      } catch (err) {
        console.error("Fallback de IP también falló:", err);
        alert("No pudimos acceder a tu ubicación. Por favor marca manualmente en el mapa.");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocalización bloqueada o sin GPS, usando fallback por IP:", error);
          fallbackLocation();
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      fallbackLocation();
    }
  };

  // Prevenir que el mapa bloquee el scroll del drawer
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

  return (
    <div className="min-h-screen bg-background text-text flex flex-col max-w-md mx-auto relative shadow-2xl border-x border-white/5">
      {/* Header */}
      <header className="p-6 bg-surface/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            Komandia
          </h1>
          <p className="text-sm text-text-muted">Menú digital</p>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
        >
          <ShoppingBag size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
      </header>

      {/* Main Menu */}
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        <CategoryFilter 
          categories={mockCategories} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />

        <div className="space-y-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="glass rounded-2xl p-4 flex gap-4">
              <img src={product.image} alt={product.name} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-text-muted line-clamp-2">{product.description}</p>
                <div className="mt-auto flex justify-between items-center pt-2">
                  <span className="font-bold text-primary">${product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="px-4 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary font-bold rounded-lg transition-colors text-sm"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Modal / Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex flex-col max-w-md mx-auto">
          <div className="p-4 flex justify-between items-center border-b border-white/10 bg-surface/50 shrink-0">
            <h2 className="text-xl font-bold">Tu Pedido</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 bg-white/5 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-32">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-text-muted">
                <ShoppingBag size={64} className="mb-4 opacity-50" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center glass p-3 rounded-xl">
                      <div className="flex-1">
                        <h4 className="font-bold">{item.name}</h4>
                        <div className="text-primary font-medium">${(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-3 bg-surface/50 rounded-lg p-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center">-</button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center">+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass p-4 rounded-xl space-y-4">
                  <h3 className="font-bold border-b border-white/10 pb-2">Tipo de Orden</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setOrderType('Delivery')}
                      className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border ${orderType === 'Delivery' ? 'bg-primary/20 border-primary text-primary' : 'bg-surface/50 border-white/5 text-text-muted hover:bg-surface/80'}`}
                    >
                      <MapPin size={24} className="mb-2" />
                      <span className="text-xs font-bold text-center leading-tight">Delivery</span>
                    </button>
                    <button 
                      onClick={() => setOrderType('Takeaway')}
                      className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border ${orderType === 'Takeaway' ? 'bg-primary/20 border-primary text-primary' : 'bg-surface/50 border-white/5 text-text-muted hover:bg-surface/80'}`}
                    >
                      <Store size={24} className="mb-2" />
                      <span className="text-xs font-bold text-center leading-tight">Retiro en local</span>
                    </button>
                    <button 
                      onClick={() => setOrderType('Dine-in')}
                      className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border ${orderType === 'Dine-in' ? 'bg-primary/20 border-primary text-primary' : 'bg-surface/50 border-white/5 text-text-muted hover:bg-surface/80'}`}
                    >
                      <Utensils size={24} className="mb-2" />
                      <span className="text-xs font-bold text-center leading-tight">Comer aquí</span>
                    </button>
                  </div>

                  <h3 className="font-bold border-b border-white/10 pb-2 mt-4">Tus Datos</h3>
                  <input 
                    type="text" placeholder="Nombre completo" 
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                    value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                  />
                  
                  {orderType === 'Dine-in' && (
                    <input 
                      type="text" placeholder="Número de mesa (Ej. Mesa 4)" 
                      className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                      value={customerInfo.tableNumber} onChange={e => setCustomerInfo({...customerInfo, tableNumber: e.target.value})}
                    />
                  )}
                  
                  {orderType === 'Delivery' && (
                    <>
                      <input 
                        type="tel" placeholder="Teléfono" 
                        className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                        value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      />
                      <input 
                        type="text" placeholder="Dirección de envío (Ej. Calle 123)" 
                        className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                        value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                      />
                      
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs text-text-muted">Toca en el mapa para marcar tu ubicación exacta:</label>
                          <button 
                            onClick={handleGetLocation}
                            className="flex items-center gap-1 text-xs bg-primary/20 hover:bg-primary/30 text-primary px-2 py-1 rounded-md transition-colors"
                          >
                            <Navigation size={12} />
                            Capturar mi ubicación
                          </button>
                        </div>
                        <div className="h-48 w-full rounded-xl overflow-hidden border border-white/10 relative z-0">
                          <MapContainer 
                            center={mapPosition} 
                            zoom={13} 
                            scrollWheelZoom={false} 
                            className="h-full w-full"
                          >
                            <TileLayer
                              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            />
                            <LocationPickerMarker position={mapPosition} setPosition={setMapPosition} />
                            <MapRecenter position={mapPosition} />
                          </MapContainer>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-md border-t border-white/10 shrink-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-text-muted font-medium">Total a pagar:</span>
                <span className="text-2xl font-bold text-primary">${cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all"
              >
                Confirmar por WhatsApp <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PublicMenu;
