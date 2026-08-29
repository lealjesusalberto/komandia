import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, MapPin, Phone, CreditCard, ChevronRight, MessageCircle } from 'lucide-react';
import OrderMap from './OrderMap';
import { useOrders } from '../../context/OrderContext';

const OrderCard = ({ order }) => {
  const { updateOrderStatus } = useOrders();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getNextStatus = () => {
    if (order.status === 'new') return 'preparing';
    if (order.status === 'preparing') return 'ready';
    return null;
  };

  const handleNextStatus = (e) => {
    e.stopPropagation(); // Prevent drag when clicking button
    const nextStatus = getNextStatus();
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus);
    }
  };

  const timeSince = (dateString) => {
    const diff = Math.floor((new Date() - new Date(dateString)) / 60000);
    if (diff < 1) return 'Hace menos de 1 min';
    return `Hace ${diff} min`;
  };

  const handleContactClient = (e) => {
    e.stopPropagation();
    if (!order.customer.phone || order.customer.phone === 'N/A') {
      alert('El cliente no proporcionó número de teléfono.');
      return;
    }
    
    let text = `¡Hola ${order.customer.name}! Recibimos tu orden #${order.id} por $${order.total.toLocaleString()}.\n`;
    text += `Estamos procesando tu pedido (${order.type}). ¿Nos confirmas que todo es correcto?`;
    
    const encodedText = encodeURIComponent(text);
    const cleanPhone = order.customer.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodedText}`, '_blank');
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`animate-fade-in glass rounded-xl p-4 mb-4 cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors relative`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-primary font-bold text-lg">#{order.id}</span>
          <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white/10 text-text-muted">
            {order.type}
          </span>
        </div>
        <div className="flex items-center text-xs text-text-muted">
          <Clock size={12} className="mr-1" />
          {timeSince(order.createdAt)}
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-3">
        <div className="font-medium text-lg text-white">{order.customer.name}</div>
        
        {order.customer.phone && order.customer.phone !== 'N/A' && (
          <div className="flex items-center text-sm text-text-muted mt-2 justify-between">
            <div className="flex items-center">
              <Phone size={14} className="mr-2 text-primary" />
              {order.customer.phone}
            </div>
            <button 
              onPointerDown={handleContactClient}
              className="text-xs flex items-center bg-green-500/20 text-green-400 px-2 py-1 rounded hover:bg-green-500/30 transition-colors"
            >
              <MessageCircle size={12} className="mr-1" /> Contactar
            </button>
          </div>
        )}
        
        {order.type === 'Delivery' && (
          <div className="flex items-center text-sm text-text-muted mt-2">
            <MapPin size={14} className="mr-2 text-primary" />
            <span className="line-clamp-2">{order.customer.address}</span>
          </div>
        )}
        
        {order.type === 'Delivery' && (
          <div onPointerDown={(e) => e.stopPropagation()} className="mt-2">
            <OrderMap lat={order.customer.lat} lng={order.customer.lng} />
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="border-t border-white/10 pt-3 mb-3 space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {item.image && (
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-12 h-12 rounded-lg object-cover border border-white/10"
              />
            )}
            <div className="flex-1">
              <div className="text-sm font-medium leading-tight mb-1">
                <span className="font-bold text-primary mr-2">{item.quantity}x</span>
                {item.name}
              </div>
              <div className="text-xs text-text-muted">${item.price.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {order.notes && (
        <div className="bg-warning/20 text-warning text-sm p-2 rounded-md mb-3 border border-warning/30">
          <span className="font-bold">Nota:</span> {order.notes}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-white/10 pt-3 flex justify-between items-center">
        <div>
          <div className="text-sm text-text-muted mb-1 flex items-center">
            <CreditCard size={14} className="mr-1" />
            {order.paymentMethod}
          </div>
          <div className="font-bold text-lg">${order.total.toLocaleString()}</div>
        </div>
        
        {getNextStatus() && (
          <button 
            onPointerDown={handleNextStatus}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-[0_0_15px_rgba(236,72,153,0.3)]"
          >
            {order.status === 'new' ? 'Preparar' : 'Listo'}
            <ChevronRight size={16} className="ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
