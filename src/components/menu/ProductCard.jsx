import React from 'react';
import { Edit2, Eye, EyeOff, Trash2 } from 'lucide-react';

const ProductCard = ({ product, onToggleVisibility, onEdit, onDelete }) => {
  return (
    <div className={`glass rounded-2xl overflow-hidden flex flex-col transition-all ${!product.visible ? 'opacity-50 grayscale-[50%]' : 'hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(236,72,153,0.1)]'}`}>
      {/* Image */}
      <div className="h-48 w-full bg-surface/60 relative overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            Sin imagen
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold flex items-center ${product.visible ? 'bg-success/20 text-success border border-success/30' : 'bg-warning/20 text-warning border border-warning/30'}`}>
          {product.visible ? 'Visible' : 'Oculto'}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-text leading-tight">{product.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap ml-2">
            ${product.price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-sm text-text-muted line-clamp-2 flex-1 mb-4">
          {product.description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
          <button 
            onClick={() => onToggleVisibility(product.id)}
            className={`p-2 rounded-lg transition-colors flex items-center ${product.visible ? 'text-text-muted hover:text-warning hover:bg-warning/10' : 'text-text-muted hover:text-success hover:bg-success/10'}`}
            title={product.visible ? 'Ocultar producto' : 'Mostrar producto'}
          >
            {product.visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(product)}
              className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Edit2 size={18} />
            </button>
            <button 
              onClick={() => onDelete(product.id)}
              className="p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
