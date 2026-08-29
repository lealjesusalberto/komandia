import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import OrderCard from './OrderCard';

const KanbanColumn = ({ id, title, orders, icon: Icon }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col h-full glass rounded-2xl overflow-hidden border border-white/5 bg-surface/40">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-surface/60">
        <div className="flex items-center space-x-2">
          {Icon && <Icon size={20} className="text-primary" />}
          <h2 className="font-bold text-lg text-text">{title}</h2>
        </div>
        <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">
          {orders.length}
        </div>
      </div>
      
      <div 
        ref={setNodeRef}
        className="flex-1 p-4 overflow-y-auto"
      >
        <SortableContext 
          id={id}
          items={orders.map(o => o.id)} 
          strategy={verticalListSortingStrategy}
        >
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
