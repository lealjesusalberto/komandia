import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Inbox, ChefHat, CheckCircle2 } from 'lucide-react';
import KanbanColumn from './KanbanColumn';
import OrderCard from './OrderCard';
import { useOrders } from '../../context/OrderContext';

const KanbanBoard = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns = [
    { id: 'new', title: 'Nuevo', icon: Inbox },
    { id: 'preparing', title: 'En Preparación', icon: ChefHat },
    { id: 'ready', title: 'Listo / Entregado', icon: CheckCircle2 },
  ];

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const activeOrder = orders.find(o => o.id === active.id);
    const overColumnId = over.id; // Could be a column or another card

    // Find the status of the column we are dropping over
    let targetStatus = null;
    if (columns.some(col => col.id === overColumnId)) {
      targetStatus = overColumnId;
    } else {
      const overOrder = orders.find(o => o.id === overColumnId);
      if (overOrder) {
        targetStatus = overOrder.status;
      }
    }

    if (targetStatus && activeOrder.status !== targetStatus) {
      updateOrderStatus(activeOrder.id, targetStatus);
    }
  };

  const activeOrder = activeId ? orders.find(o => o.id === activeId) : null;

  return (
    <div className="h-full w-full p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
          Komandia KDS
        </h1>
        <p className="text-text-muted mt-2">Gestiona las comandas en tiempo real.</p>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              icon={column.icon}
              orders={orders.filter(o => o.status === column.id)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeOrder ? <OrderCard order={activeOrder} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
